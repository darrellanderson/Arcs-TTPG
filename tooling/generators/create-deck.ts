#!env ts-node

/**
 * Create a deck from individual card images and corresponding metadata.
 *
 * ARGS:
 * -f : config file (e.g. "prebuild/card/.../{deck}.config.json")
 * -x : overwrite output files (otherwise fail if they already exist)
 *
 * CONFIG FILE:
 * - inputDir : path relative to prebuild.
 * - inputCards : [{face, back?, name, metadata}, ...].
 * - cardWidth : card width, in game units.
 * - cardHeight : card height, in game units.
 * - preshrink : if positive, shrink cards to max dimension before assembly.
 * - output : create cardsheet and deck template.
 *
 * INPUT METADATA FILE:
 * - name : string.
 * - nsid : unique template metadata string.
 * - description : (placeholder, not supported yet).
 *
 * INPUT:
 * - prebuild/card/{deck}/{card1}.jpg, & .json
 * - ...
 * - prebuild/card/{deck}/{cardN}.jpg, & .json
 * - prebuild/card/{deck}.back.jpg
 *
 * OUTPUT:
 * - assets/Templates/card/{deck}.json
 * - assets/Textures/card/{deck}.face.jpg
 * - assets/Textures/card/{deck}.back.jpg
 *
 * NOTES:
 *
 * Extract individual cards from an existing (e.g. TTS) cardsheet:
 * % convert -crop 744x1040 actioncards.jpg out.jpg
 */

import * as sharp from "sharp";
import * as fs from "fs-extra";
import * as yargs from "yargs";
import * as path from "path";
import * as crypto from "crypto";

const args = yargs
    .options({
        f: {
            alias: "config",
            descript: "input configuration file (JSON)",
            type: "string",
            demand: true,
        },
        x: {
            alias: "clobber",
            descript: "overwrite existing output files",
            type: "boolean",
            default: false,
            demand: false,
        },
    })
    .parseSync(); // creates typed result

const DIR_INPUT_PREBUILD: string = path.normalize("prebuild");
const DIR_OUTPUT_TEMPLATE: string = path.normalize("assets/Templates");
const DIR_OUTPUT_TEXTURE: string = path.normalize("assets/Textures");

const CHUNK_SIZE = 4096;

async function main() {
    // ------------------------------------
    console.log("\n----- READ CONFIG -----\n");

    const configFile = path.normalize(args.f);
    if (!fs.existsSync(configFile)) {
        throw new Error(`Missing config file "${configFile}"`);
    }
    const configData = fs.readFileSync(configFile).toString();
    const config = JSON.parse(configData);

    // Validate expected fields.
    if (
        typeof config.inputDir !== "string" ||
        !Array.isArray(config.inputCards) ||
        typeof config.cardWidth !== "number" ||
        typeof config.cardHeight !== "number" ||
        typeof config.preshrink !== "number" ||
        typeof config.output !== "string"
    ) {
        throw new Error(`config error`);
    }

    for (const inputCard of config.inputCards) {
        if (
            typeof inputCard.face !== "string" ||
            typeof inputCard.name !== "string" ||
            typeof inputCard.metadata !== "string"
        ) {
            throw new Error("config inputCard error");
        }
    }

    const origInputCards = config.inputCards;
    config.inputCards = "[ ... ]";
    console.log("CONFIG: " + JSON.stringify(config, null, 4));
    config.inputCards = origInputCards;

    // ------------------------------------
    console.log("\n----- VERIFY AND PRESHRINK INPUT CARDS -----\n");

    const origPixels = { w: -1, h: -1 }; // seed with first card loaded
    const cardPixels = { w: -1, h: -1 }; // seed with first card loaded APPLY PRESHINK
    for (const inputCard of config.inputCards) {
        for (const key of ["face", "back"]) {
            const localFilename = inputCard[key];
            if (!localFilename) {
                continue;
            }
            if (typeof localFilename !== "string") {
                throw new Error("inputCards filename not a string");
            }

            // Compute input file name, store with card data.
            const file = path.join(
                DIR_INPUT_PREBUILD,
                config.inputDir,
                path.normalize(localFilename)
            );

            // File exists.
            if (!fs.existsSync(file)) {
                throw new Error(`Missing inputCard "${file}"`);
            }

            // Load file, store with card data.
            const img = sharp(file);

            // All cards same size.
            const stats = await img.metadata();
            if (!stats.width || !stats.height) {
                throw new Error(
                    `sharp metadata missing width or height for "${file}"`
                );
            }
            if (origPixels.w === -1) {
                origPixels.w = stats.width;
                origPixels.h = stats.height;
            } else if (
                origPixels.w !== stats.width ||
                origPixels.h !== stats.height
            ) {
                throw new Error(
                    `card size mismatch (expect ${origPixels.w}x${origPixels.h}, got ${stats.width}x${stats.height}) for ${file}`
                );
            }

            // Compute preshrink dimensions.
            if (cardPixels.w === -1) {
                const scaleW = Math.min(config.preshrink / stats.width, 1);
                const scaleH = Math.min(config.preshrink / stats.height, 1);
                const scale =
                    config.preshrink > 0 ? Math.min(scaleW, scaleH) : 1;
                const w = Math.floor(stats.width * scale);
                const h = Math.floor(stats.height * scale);
                cardPixels.w = w;
                cardPixels.h = h;
            }

            // ALWAYS resize card, always deal with the same img type later.
            console.log(`processing ${file} (${cardPixels.w}x${cardPixels.h})`);
            inputCard[key] = await img
                .resize(cardPixels.w, cardPixels.h, {
                    fit: "fill",
                })
                .toBuffer();
        }
    }
    if (cardPixels.w < 0) {
        throw new Error("no cards?");
    }

    // ------------------------------------
    console.log("\n----- CALCULATING OPTIMAL LAYOUT -----\n");

    const totalCardPixels =
        config.inputCards.length * cardPixels.w * cardPixels.h;

    const layout = {
        cols: -1,
        rows: -1,
        efficiency: -1,
    };
    const maxCols = Math.floor(CHUNK_SIZE / cardPixels.w);
    const maxRows = Math.floor(CHUNK_SIZE / cardPixels.h);
    const maxCards = maxCols * maxRows;
    if (config.inputCards.length > maxCards) {
        throw new Error(
            `too many cards (${config.inputCards.length}), max ${maxCards}`
        );
    }
    for (let numCols = 1; numCols <= maxCols; numCols += 1) {
        const numRows = Math.ceil(config.inputCards.length / numCols);
        if (numRows > maxRows) {
            continue; // too big, skip
        }
        if (numCols > config.inputCards.length) {
            continue; // too few cards, skip
        }
        const w = numCols * cardPixels.w;
        const h = numRows * cardPixels.h;
        const pow2w = Math.pow(2, Math.ceil(Math.log2(w)));
        const pow2h = Math.pow(2, Math.ceil(Math.log2(h)));
        const totalLayoutPixels = pow2w * pow2h;
        const efficiency = (totalCardPixels * 100) / totalLayoutPixels;
        if (efficiency > layout.efficiency) {
            layout.cols = numCols;
            layout.rows = numRows;
            layout.efficiency = efficiency;
        }
        console.log(
            `candidate ${numCols}x${numRows} => ${pow2w}x${pow2h}px (${efficiency.toFixed(
                1
            )}%)`
        );
    }
    console.log(
        `layout ${layout.cols}x${layout.rows} (${layout.efficiency.toFixed(
            1
        )}%)`
    );

    // ------------------------------------
    console.log("\n----- CREATING CARDSHEET -----\n");

    let dstFile = path.join(
        DIR_OUTPUT_TEXTURE,
        path.normalize(config.output) + ".jpg"
    );
    if (fs.existsSync(dstFile) && !args.x) {
        throw new Error(`Output cardsheet file "${dstFile}" already exists`);
    }

    const composite: object[] = [];
    for (let index = 0; index < config.inputCards.length; index++) {
        const inputCard = config.inputCards[index];
        const col = index % layout.cols;
        const row = Math.floor(index / layout.cols);
        composite.push({
            input: inputCard.face,
            top: row * cardPixels.h,
            left: col * cardPixels.w,
        });
    }

    console.log(`writing "${dstFile}"`);
    const dir = path.dirname(dstFile);
    fs.mkdirsSync(dir);
    await sharp({
        create: {
            width: layout.cols * cardPixels.w,
            height: layout.rows * cardPixels.h,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 1 },
        },
    })
        .composite(composite)
        .toFile(dstFile);

    // ------------------------------------
    console.log("\n----- CREATING DECK TEMPLATE -----\n");

    dstFile = path.join(
        DIR_OUTPUT_TEMPLATE,
        path.normalize(config.output) + ".jpg"
    );
    if (fs.existsSync(dstFile) && !args.x) {
        throw new Error(`Output template file "${dstFile}" already exists`);
    }

    // TODO XXX
}

main();

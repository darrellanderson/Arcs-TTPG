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
 *
 * Create input array JSON:
 * % ls -1 *\*.jpg |sed -e "s/.jpg$//" | awk -F\/ '{print "{ @face@: @" $1"/"$2".jpg@,@name@: @"toupper(substr($1, 1, 1)) substr($1, 2)" "$2"@,@metadata@: @card.action."$1":base/"$2"@}," }' | tr '@' '"'
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
    })
    .parseSync(); // creates typed result

const DIR_INPUT_PREBUILD: string = path.normalize("prebuild");
const DIR_OUTPUT_TEMPLATE: string = path.normalize("assets/Templates");
const DIR_OUTPUT_TEXTURE: string = path.normalize("assets/Textures");

const CHUNK_SIZE = 4096;

const DATA_DECK_TEMPLATE: { [key: string]: any } = {
    Type: "Card",
    GUID: "$GUID",
    Name: "$NAME",
    Metadata: "",
    CollisionType: "Regular",
    Friction: 0.7,
    Restitution: 0,
    Density: 0.5,
    SurfaceType: "Cardboard",
    Roughness: 1,
    Metallic: 0,
    PrimaryColor: {
        R: 255,
        G: 255,
        B: 255,
    },
    SecondaryColor: {
        R: 0,
        G: 0,
        B: 0,
    },
    Flippable: true,
    AutoStraighten: false,
    ShouldSnap: true,
    ScriptName: "",
    Blueprint: "",
    Models: [],
    Collision: [],
    SnapPointsGlobal: false,
    SnapPoints: [],
    ZoomViewDirection: {
        X: 0,
        Y: 0,
        Z: 0,
    },
    FrontTexture: "$CARDSHEET_FACE_FILENAME",
    BackTexture: "$CARDSHEET_BACK_FILENAME",
    HiddenTexture: "",
    BackIndex: "$BACK_INDEX",
    HiddenIndex: -3, // 0 = use front, -1 = blur, -2 = separate file, -3 = use back
    NumHorizontal: 0, //"$NUM_COLS",
    NumVertical: 0, //"$NUM_ROWS",
    Width: 0, //"$CARD_WIDTH",
    Height: 0, //"$CARD_HEIGHT",
    Thickness: 0.05,
    HiddenInHand: true,
    UsedWithCardHolders: true,
    CanStack: true,
    UsePrimaryColorForSide: false,
    FrontTextureOverrideExposed: false,
    AllowFlippedInStack: false,
    MirrorBack: true,
    Model: "Rounded",
    Indices: [], //"$CARD_INDICES",
    CardNames: {}, //"$CARD_NAMES",
    CardMetadata: {}, //"$CARD_METADATA",
    CardTags: {},
    GroundAccessibility: "ZoomAndContext",
};

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
        let efficiency = (totalCardPixels * 100) / totalLayoutPixels;

        // Favor square layouts when breaking ties.
        const tiebreaker = Math.abs(w - h) / 100000;
        efficiency -= tiebreaker;

        if (efficiency > layout.efficiency) {
            layout.cols = numCols;
            layout.rows = numRows;
            layout.efficiency = efficiency;
        }
        console.log(
            `candidate ${numCols}x${numRows} [${w}x${h}] => [${pow2w}x${pow2h}px] (${efficiency.toFixed(
                5
            )}%)`
        );
    }
    console.log(
        `layout ${layout.cols}x${layout.rows} (${layout.efficiency.toFixed(
            1
        )}%)`
    );

    // ------------------------------------
    console.log("\n----- CREATING FACE CARDSHEET -----\n");

    const cardsheetFaceRelativeToAssetsTextures =
        path.normalize(config.output) + ".face.jpg";
    let dstFile = path.join(
        DIR_OUTPUT_TEXTURE,
        cardsheetFaceRelativeToAssetsTextures
    );

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
    let dir = path.dirname(dstFile);
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
    console.log("\n----- CREATING BACK CARDSHEET -----\n");

    const srcFile = path.join(DIR_INPUT_PREBUILD, config.sharedBack);
    if (!fs.existsSync(srcFile)) {
        throw new Error(`missing sharedBack "${srcFile}"`);
    }
    const cardsheetBackRelativeToAssetsTextures =
        path.normalize(config.output) + ".back.jpg";
    dstFile = path.join(
        DIR_OUTPUT_TEXTURE,
        cardsheetBackRelativeToAssetsTextures
    );

    console.log(`writing "${dstFile}"`);
    dir = path.dirname(dstFile);
    fs.mkdirsSync(dir);
    fs.copyFileSync(srcFile, dstFile);

    // ------------------------------------
    console.log("\n----- CREATING DECK TEMPLATE -----\n");

    dstFile = path.join(
        DIR_OUTPUT_TEMPLATE,
        path.normalize(config.output) + ".json"
    );

    const template = DATA_DECK_TEMPLATE;
    template.Name = path.basename(config.output);
    template.GUID = crypto
        .createHash("sha256")
        .update(config.output)
        .digest("hex")
        .substring(0, 32)
        .toUpperCase();
    template.FrontTexture = cardsheetFaceRelativeToAssetsTextures;
    template.BackTexture = cardsheetBackRelativeToAssetsTextures;
    template.NumHorizontal = layout.cols;
    template.NumVertical = layout.rows;
    template.Width = config.cardWidth;
    template.Height = config.cardHeight;

    for (let index = 0; index < config.inputCards.length; index++) {
        const inputCard = config.inputCards[index];
        template.Indices.push(index);
        template.CardNames[index] = inputCard.name;
        template.CardMetadata[index] = inputCard.metadata;
    }

    // If using tags, apply to deck AND each card
    if (config.cardTags) {
        template.Tags = config.cardTags;
        for (let index = 0; index < config.inputCards.length; index++) {
            template.CardTags[index] = config.cardTags;
        }
    }

    console.log(`writing "${dstFile}"`);
    dir = path.dirname(dstFile);
    fs.mkdirsSync(dir);
    const data: string = JSON.stringify(template, null, 8);
    fs.writeFileSync(dstFile, data);
}

main();

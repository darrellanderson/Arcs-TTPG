#!env ts-node

/**
 * Create a mat object with snap points and card-back images to indicate deck
 * (or discard) locations.
 *
 * ARGS:
 * -f : config file (e.g. "prebuild/.../{mat}.config.json")
 *
 * CONFIG FILE:
 * - width : final obj width, in game units.
 * - height : final obj height, in game units.
 * - depth : final obj depth, in game units.
 * - preshrink : if positive, shrink card images to this max dimension.
 * - cardWidth : card width, in game units.
 * - cardHeight : card height, in game units.
 * - font : path to label font.
 * - gap : padding and distnace between cards, in game units.
 * - layout : row-major 2d array, entries:
 * - - image : slot image (typically card back).
 * - - gray : boolean, convert image to grayscale?
 * - - label : text label.

 * INPUT:
 * - prebuild/card/.../{back1}.jpg
 * - ...
 * - prebuild/card/.../{backN}.jpg
 *
 * OUTPUT:
 * - assets/Models/mat/{mat}.obj
 * - assets/Templates/mat/{mat}.json
 * - assets/Textures/mat/{mat}.jpg
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
const DIR_OUTPUT_MODEL: string = path.normalize("assets/Models/mat");
const DIR_OUTPUT_TEMPLATE: string = path.normalize("assets/Templates/mat");
const DIR_OUTPUT_TEXTURE: string = path.normalize("assets/Textures/mat");

const MAT_TEMPLATE = {};

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
        typeof config.width !== "number" ||
        typeof config.height !== "number" ||
        typeof config.depth !== "number" ||
        typeof config.preshrink !== "number" ||
        typeof config.input !== "string" ||
        typeof config.output !== "string" ||
        typeof config.nsid !== "string"
    ) {
        throw new Error(`config error`);
    }

    console.log("CONFIG: " + JSON.stringify(config, null, 4));

    // ------------------------------------
}

main();

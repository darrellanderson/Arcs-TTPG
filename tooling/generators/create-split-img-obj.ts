/**
 * Create a board object from a board image.  If the image is large, split it
 * into chunks and join those as a series of objects in the final template.
 *
 * INPUT:
 * - prebuild/.../board.jpg
 *
 * OUTPUT:
 * - assets/Models/utility/unit-cube-top-uvs.obj (if missing)
 * - assets/Templates/.../board.json
 * - assets/Textures/.../board-?x?.jpg
 */

import * as sharp from "sharp";
import * as fs from "fs-extra";
import * as yargs from "yargs";
import * as path from "path";
import * as crypto from "crypto";

const DIR_INPUT_PREBUILD: string = path.normalize("prebuild");
const DIR_OUTPUT_TEMPLATE: string = path.normalize("assets/Templates");
const DIR_OUTPUT_TEXTURE: string = path.normalize("assets/Textures");
const PATH_UNIT_CUBE_MODEL: string = path.normalize(
    "assets/Models/utility/unit-cube-top-uvs.obj"
);

const CHUNK_SIZE = 4096;

const DATA_UNIT_CUBE = `v 0.5 0.5 0.5
v 0.5 0.5 -0.5
v -0.5 0.5 -0.5
v -0.5 0.5 0.5
v 0.5 -0.5 0.5
v 0.5 -0.5 -0.5
v -0.5 -0.5 -0.5
v -0.5 -0.5 0.5

vt 0 0
vt 1 0
vt 1 1
vt 0 1

vn 0 1 0
vn 1 0 0
vn 0 0 1
vn -1 0 0
vn 0 0 -1
vn 0 -1 0

# Top (only top has UVs)
f 1/1/1 2/2/1 3/3/1
f 1/1/1 3/3/1 4/4/1

# Bottom
f 5//6 7//6 6//6
f 5//6 8//6 7//6 

# Sides
f 1//2 5//2 2//2
f 5//2 6//2 2//2

f 2//3 6//3 3//3
f 6//3 7//3 3//3

f 3//4 7//4 4//4
f 7//4 8//4 4//4

f 4//5 8//5 5//5
f 1//5 4//5 5//5
`;

const DATA_MERGED_CUBES_TEMPLATE = {
    Type: "Generic",
    GUID: "$GUID HERE",
    Name: "$NAME HERE",
    Metadata: "",
    CollisionType: "Regular",
    Friction: 0.7,
    Restitution: 0.3,
    Density: 1,
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
    Flippable: false,
    AutoStraighten: false,
    ShouldSnap: false,
    ScriptName: "",
    Blueprint: "",
    Models: ["$REPLACE THIS"],
    Collision: [],
    Lights: [],
    SnapPointsGlobal: false,
    SnapPoints: [],
    ZoomViewDirection: {
        X: 0,
        Y: 0,
        Z: 1,
    },
    GroundAccessibility: "Zoom",
    Tags: [],
};

const DATA_CUBE_MODEL_TEMPLATE = {
    Model: "utility/unit-cube-top-uvs.obj",
    Offset: {
        X: -1,
        Y: 0,
        Z: 0,
    },
    Scale: {
        X: 1,
        Y: 1,
        Z: 0.1,
    },
    Rotation: {
        X: 0,
        Y: 0,
        Z: 0,
    },
    Texture: "$TEXTURE HERE",
    NormalMap: "",
    ExtraMap: "",
    ExtraMap2: "",
    IsTransparent: false,
    CastShadow: true,
    IsTwoSided: false,
    UseOverrides: true,
    SurfaceType: "Cardboard",
};

interface Chunk {
    left: number;
    top: number;
    width: number;
    height: number;
    fileLocal: string;
}

async function main() {
    // ------------------------------------
    console.log("\n----- PARSE ARGS -----\n");

    const args = yargs
        .options({
            w: {
                alias: "width",
                describe: "final obj width (Y in TTPG space)",
                type: "number",
                //demand: true,
                default: 187.12,
            },
            h: {
                alias: "height",
                describe: "final obj width (X in TTPG space)",
                type: "number",
                //demand: true,
                default: 100,
            },
            d: {
                alias: "depth",
                describe: "final obj width (Z in TTPG space)",
                type: "number",
                //demand: true,
                default: 1,
            },
            p: {
                alias: "preshrink",
                describe:
                    "resize input to be at most P pixels in either dimension",
                type: "number",
                //demand: true,
                default: Number.MAX_SAFE_INTEGER,
            },
            i: {
                alias: "input",
                describe:
                    "relative to prebuild/, split this image (does not modify original image)",
                type: "string",
                demand: true,
            },
            o: {
                alias: "output",
                describe:
                    "relative to assets/{Textures|Templates}, base name for output files",
                type: "string",
                demand: true,
            },
        })
        .parseSync(); // creates typed result

    console.log(
        [
            "OPTIONS:",
            `width: ${args.width}`,
            `width: ${args.width}`,
            `height: ${args.height}`,
            `depth: ${args.depth}`,
            `preshrink: ${args.preshrink}`,
            `input: ${args.input}`,
            `output: ${args.output}`,
        ].join("\n")
    );

    // ------------------------------------
    console.log("\n----- LOAD INPUT -----\n");

    const inputTexture: string = path.join(DIR_INPUT_PREBUILD, args.i);
    if (!fs.existsSync(inputTexture)) {
        throw new Error(`Missing input file "${inputTexture}"`);
    }

    let src = sharp(inputTexture);
    const stats = await src.metadata();
    if (!stats.width || !stats.height) {
        throw new Error("sharp metadata missing width or height");
    }
    console.log(`loaded "${inputTexture}": ${stats.width}x${stats.height} px`);

    // ------------------------------------
    console.log("\n----- PRESHRINK INPUT -----\n");

    const preshrink: number = args.p;
    const scaleW: number = preshrink / stats.width;
    const scaleH: number = preshrink / stats.height;
    const scale: number = Math.min(scaleW, scaleH, 1);
    const w: number = Math.floor(stats.width * scale);
    const h: number = Math.floor(stats.height * scale);
    console.log(`preshrink x${scale.toFixed(3)}: ${w}x${h} px`);
    src = src.resize(w, h, { fit: "fill" }); // always resize even if scale 1 for extract to work

    // ------------------------------------
    console.log("\n----- CREATE OUTPUT TEXTURES -----\n");

    const numCols: number = Math.ceil(w / CHUNK_SIZE);
    const numRows: number = Math.ceil(h / CHUNK_SIZE);
    console.log(`chunking output ${numCols}x${numRows}`);

    const chunks: Chunk[] = [];
    for (let col: number = 0; col < numCols; col++) {
        for (let row: number = 0; row < numRows; row++) {
            const left: number = col * CHUNK_SIZE;
            const right: number = Math.min(left + CHUNK_SIZE, w);
            const width: number = right - left;
            const top: number = row * CHUNK_SIZE;
            const bottom: number = Math.min(top + CHUNK_SIZE, h);
            const height: number = bottom - top;

            const dstFileLocal: string = `${args.o}-${col}x${row}.jpg`;
            const dstFile: string = path.join(DIR_OUTPUT_TEXTURE, dstFileLocal);
            if (fs.existsSync(dstFile)) {
                throw new Error(
                    `Output texture file "${dstFile}" already exists`
                );
            }

            const area = {
                left,
                top,
                width,
                height,
            };
            console.log(`writing dst "${dstFile}" (${JSON.stringify(area)})`);
            await src.extract(area).toFile(dstFile);

            // Convert to model space.
            const chunk = {
                left: (left / w - 0.5) * args.w,
                top: (top / h - 0.5) * args.h,
                width: (width / w) * args.w,
                height: (height / h) * args.h,
                fileLocal: dstFileLocal,
            };
            chunks.push(chunk);
        }
    }

    // ------------------------------------
    console.log("\n----- CREATE CUBE MODEL (IF MISSING) -----\n");
    if (!fs.existsSync(PATH_UNIT_CUBE_MODEL)) {
        console.log(`creating "${PATH_UNIT_CUBE_MODEL}"`);
        fs.writeFileSync(PATH_UNIT_CUBE_MODEL, DATA_UNIT_CUBE);
    } else {
        console.log(
            `already have "${PATH_UNIT_CUBE_MODEL}", skipping this step`
        );
    }

    // ------------------------------------
    console.log("\n----- CREATE OUTPUT TEMPLATE -----\n");

    const dstFile: string = path.join(DIR_OUTPUT_TEMPLATE, `${args.o}.json`);
    if (fs.existsSync(dstFile)) {
        throw new Error(`Output template file "${dstFile}" already exists`);
    }
    const template = DATA_MERGED_CUBES_TEMPLATE;

    // Fill in the top-level.
    template.Name = path.basename(args.o);
    template.GUID = crypto
        .createHash("sha256")
        .update(args.o)
        .digest("hex")
        .substring(0, 32)
        .toUpperCase();

    // Add cubes.
    const _round3Decimals = (x: number): number => {
        return Math.round(x * 1000) / 1000;
    };
    template.Models = [];
    for (const chunk of chunks) {
        const cubeTemplate = JSON.parse(
            JSON.stringify(DATA_CUBE_MODEL_TEMPLATE)
        ); // copy

        cubeTemplate.Offset = {
            X: -_round3Decimals(chunk.top + chunk.height / 2), // TTPG flips X/Y
            Y: _round3Decimals(chunk.left + chunk.width / 2),
            Z: 0,
        };

        cubeTemplate.Scale = {
            X: _round3Decimals(chunk.height), // TTPG flips X/Y
            Y: _round3Decimals(chunk.width),
            Z: _round3Decimals(args.d),
        };

        cubeTemplate.Texture = chunk.fileLocal;

        template.Models.push(cubeTemplate);
    }

    console.log(`creating "${dstFile}"`);
    const data: string = JSON.stringify(template, null, 8);
    fs.writeFileSync(dstFile, data);

    // ------------------------------------
    console.log("\n----- DONE -----\n");
}

main();

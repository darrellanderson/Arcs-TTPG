import * as fs from "fs-extra";
import * as path from "path";
import * as sharp from "sharp";

export type SplitImageChunk = {
    filenameRelativeToAssetsTextures: string;
    img: sharp.Sharp;

    // Positions and sizes in [0:1] relative to src img size values.
    uLeft: number;
    uTop: number;
    uWidth: number;
    uHeight: number;

    // Positions and sizes in dst obj size values.
    oLeft: number;
    oTop: number;
    oWidth: number;
    oHeight: number;
};

export class SplitImage {
    // Input.
    private _srcFileRelativeToPrebuild: string | undefined;

    // Output.
    private _dstDirRelativeToAssetsTextures: string | undefined;
    private _dstObjectWidth: number | undefined;
    private _dstObjectHeight: number | undefined;

    // Other config.
    private _chunkSize: number = 4096;
    private _postShrink: number = -1;
    private _preshrink: number = -1;
    private _verbose: boolean = true;

    // ----------------------------------------------------

    constructor() {}

    setSrcFileRelativeToPrebuild(value: string): SplitImage {
        this._srcFileRelativeToPrebuild = value;
        return this;
    }

    // ----------------------------------------------------

    setDstDirRelativeToAssetsTextures(value: string): SplitImage {
        this._dstDirRelativeToAssetsTextures = value;
        return this;
    }

    setDstObjectSize(width: number, height: number): SplitImage {
        if (width <= 0 || height <= 0) {
            throw new Error(`value "${width}x${height}" out of range`);
        }
        this._dstObjectWidth = width;
        this._dstObjectHeight = height;
        return this;
    }

    // ----------------------------------------------------

    setChunkSize(value: number): SplitImage {
        if (value < 0 || value > 4096) {
            throw new Error(`value "${value}" out of range`);
        }
        this._chunkSize = value;
        return this;
    }

    setPostShrink(value: number): SplitImage {
        if (value < 0) {
            throw new Error(`value "${value}" out of range`);
        }
        this._postShrink = value;
        return this;
    }

    setPreShrink(value: number): SplitImage {
        if (value < 0) {
            throw new Error(`value "${value}" out of range`);
        }
        this._preshrink = value;
        return this;
    }

    setVerbose(value: boolean): SplitImage {
        this._verbose = value;
        return this;
    }

    // ----------------------------------------------------

    async split(): Promise<SplitImageChunk[]> {
        if (
            !this._srcFileRelativeToPrebuild ||
            !this._dstDirRelativeToAssetsTextures ||
            !this._dstObjectWidth ||
            !this._dstObjectHeight
        ) {
            throw new Error("split: not fully initialized");
        }

        // Load image.
        const srcFile = path.join("prebuild", this._srcFileRelativeToPrebuild);
        if (!fs.existsSync(srcFile) || !fs.lstatSync(srcFile).isFile()) {
            throw new Error(`split: srcFile "${srcFile}" is not a file`);
        }
        let srcImg = sharp(srcFile);
        let stats = await srcImg.metadata();
        if (!stats.width || !stats.height) {
            throw new Error("split: missing metadata");
        }
        if (this._verbose) {
            console.log(`split: loaded "${srcFile}"`);
        }

        // Apply preshink (even if not shrinking, need format for extract).
        const scaleW = Math.min(this._preshrink / stats.width, 1);
        const scaleH = Math.min(this._preshrink / stats.height, 1);
        const scale = this._preshrink > 0 ? Math.min(scaleW, scaleH) : 1;
        const w = Math.floor(stats.width * scale);
        const h = Math.floor(stats.height * scale);
        srcImg = srcImg.resize(w, h, { fit: "fill" });
        if (this._verbose) {
            console.log(
                `split: preshrink [${stats.width}x${stats.height}] => [${w}x${h}]`
            );
        }

        // Carve into chunks.
        const cols = Math.ceil(w / this._chunkSize);
        const rows = Math.ceil(h / this._chunkSize);
        if (this._verbose) {
            console.log(
                `split: chunking ${cols}x${rows} [chunk size ${this._chunkSize}]`
            );
        }

        const basename = path.basename(srcFile);
        const filenameParsed = path.parse(basename);

        const result: SplitImageChunk[] = [];
        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                // Extract chunk.
                const chunkLeft = col * this._chunkSize;
                const chunkRight = Math.min(chunkLeft + this._chunkSize, w);
                const chunkWidth = chunkRight - chunkLeft;
                const chunkTop = row * this._chunkSize;
                const chunkBottom = Math.min(chunkTop + this._chunkSize, h);
                const chunkHeight = chunkBottom - chunkTop;
                let chunkImg: sharp.Sharp = srcImg.extract({
                    left: chunkLeft,
                    top: chunkTop,
                    width: chunkWidth,
                    height: chunkHeight,
                });

                // Optionally shrink final chunk image (based on chunk size for consistency).
                if (
                    this._postShrink > 0 &&
                    this._postShrink < this._chunkSize
                ) {
                    const scale = this._postShrink / this._chunkSize;
                    const postW = Math.floor(chunkWidth * scale);
                    const postH = Math.floor(chunkHeight * scale);
                    console.log(`postShrink: ${postW}x${postH}`);
                    chunkImg = sharp(await chunkImg.toBuffer()).resize(
                        postW,
                        postH,
                        {
                            fit: "fill",
                        }
                    );
                }

                // Save file.
                const chunkFilename = `${filenameParsed.name}-${col}x${row}${filenameParsed.ext}`;
                const chunkFilenameRelativeToAssetsTextures = path.join(
                    path.normalize(this._dstDirRelativeToAssetsTextures),
                    chunkFilename
                );
                const dstFile = path.join(
                    path.normalize("assets/Textures"),
                    path.normalize(chunkFilenameRelativeToAssetsTextures)
                );
                if (this._verbose) {
                    console.log(
                        `split: chunk "${dstFile}" [${chunkWidth}x${chunkHeight}]`
                    );
                }
                const dstDir = path.dirname(dstFile);
                fs.mkdirSync(dstDir, { recursive: true });
                await chunkImg.toFile(dstFile);

                // Return chunk metadata.
                const uLeft = chunkLeft / w;
                const uTop = chunkTop / h;
                const uWidth = chunkWidth / w;
                const uHeight = chunkHeight / h;

                const oLeft = (uLeft - 0.5) * this._dstObjectWidth;
                const oTop = (uTop - 0.5) * this._dstObjectHeight;
                const oWidth = uWidth * this._dstObjectWidth;
                const oHeight = uHeight * this._dstObjectHeight;

                const resultEntry: SplitImageChunk = {
                    filenameRelativeToAssetsTextures:
                        chunkFilenameRelativeToAssetsTextures,
                    img: chunkImg,

                    // Relative to src image [0:1].
                    uLeft,
                    uTop,
                    uWidth,
                    uHeight,

                    // Relative to dst object size (TTPG model space).
                    oLeft,
                    oTop,
                    oWidth,
                    oHeight,
                };
                result.push(resultEntry);
            }
        }

        return result;
    }
}

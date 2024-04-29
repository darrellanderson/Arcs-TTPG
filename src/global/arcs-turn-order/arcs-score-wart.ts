import {
    Canvas,
    Color,
    GameObject,
    HorizontalAlignment,
    LayoutBox,
    SnapPoint,
    Text,
    TextJustification,
    Vector,
    VerticalAlignment,
} from "@tabletop-playground/api";
import {
    TurnEntryWart,
    TurnEntryWidget,
    TurnEntryWartGenerator,
    TurnOrderWidgetParams,
    Find,
} from "ttpg-darrell";

export const ArcsScoreWartGenerator: TurnEntryWartGenerator = (
    widget: TurnEntryWidget,
    params: TurnOrderWidgetParams
): TurnEntryWart => new ArcsScoreWart(widget, params);

export class ArcsScoreWart extends TurnEntryWart {
    private static __find: Find = new Find();
    private static __snapPoint0: SnapPoint | undefined;
    private static __snapPoint50: SnapPoint | undefined;
    private readonly _score: Text;

    static __get0and50(): [a: Vector | undefined, b: Vector | undefined] {
        // Re-find if cache invalid.
        if (
            !ArcsScoreWart.__snapPoint0 ||
            !ArcsScoreWart.__snapPoint50 ||
            !ArcsScoreWart.__snapPoint0.getParentObject()?.isValid() ||
            !ArcsScoreWart.__snapPoint50.getParentObject()?.isValid()
        ) {
            ArcsScoreWart.__snapPoint0 = undefined;
            ArcsScoreWart.__snapPoint50 = undefined;

            const map: GameObject | undefined =
                ArcsScoreWart.__find.findGameObject("board:base/map");
            if (map) {
                const snapPoints: SnapPoint[] = map
                    .getAllSnapPoints()
                    .filter((p) => p.getTags().includes("power-marker"));
                if (snapPoints.length !== 51) {
                    throw new Error(
                        `Expected 51 snap points, got ${snapPoints.length}`
                    );
                }
                ArcsScoreWart.__snapPoint0 = snapPoints[0];
                ArcsScoreWart.__snapPoint50 = snapPoints[50];
            }
        }

        return [
            ArcsScoreWart.__snapPoint0?.getGlobalPosition(),
            ArcsScoreWart.__snapPoint50?.getGlobalPosition(),
        ];
    }

    static __getScoreFromPos(pos: Vector): number {
        const [p0, p50]: [Vector | undefined, Vector | undefined] =
            ArcsScoreWart.__get0and50();
        if (!p0 || !p50) {
            return -1;
        }

        const linePos: Vector = pos.findClosestPointOnSegment(p0, p50);
        const dLine: number = linePos.distance(pos);
        if (dLine > 10) {
            //console.log(`too far from line: ${dLine}`);
            return -1;
        }
        const d: number = linePos.distance(p0);
        const d50: number = p50.distance(p0);

        const score: number = Math.round((d / d50) * 50);
        return score;
    }

    static __getScoreFromPlayerSlot(playerSlot: number): number {
        const nsid: string = "unit:base/power-marker";
        const skipContained: boolean = true;
        const obj: GameObject | undefined = ArcsScoreWart.__find.findGameObject(
            nsid,
            playerSlot,
            skipContained
        );
        if (!obj) {
            return -1;
        }
        const pos: Vector = obj.getPosition();
        const score: number = ArcsScoreWart.__getScoreFromPos(pos);
        return score;
    }

    constructor(widget: TurnEntryWidget, params: TurnOrderWidgetParams) {
        super();

        const entryW: number = params.entryWidth ?? 1;
        const entryH: number = params.entryHeight ?? 1;
        const fontSize: number = TurnEntryWidget.computeFontSize(entryH);
        this._score = new Text()
            .setBold(true)
            .setFontSize(fontSize)
            .setJustification(TextJustification.Center)
            .setText("0");

        const box = new LayoutBox()
            .setOverrideHeight(entryH)
            .setOverrideWidth(entryH)
            .setHorizontalAlignment(HorizontalAlignment.Center)
            .setVerticalAlignment(VerticalAlignment.Center)
            .setChild(this._score);

        const canvas: Canvas = widget.getCanvas();
        const left: number = entryW - entryH - 10;
        const top: number = Math.floor(entryH * -0.01); // tweak to center text vertically
        canvas.addChild(box, left, top, entryH, entryH);
    }

    destroy(): void {
        // nop
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update(playerSlot: number, fgColor: Color, bgColor: Color): void {
        const score: number =
            ArcsScoreWart.__getScoreFromPlayerSlot(playerSlot);
        this._score.setTextColor(fgColor);
        this._score.setText(score >= 0 ? score.toString() : "-");
    }
}

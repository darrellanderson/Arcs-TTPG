import { GameObject, SnapPoint, Vector } from "@tabletop-playground/api";
import { MockGameObject, MockSnapPoint, mockWorld } from "ttpg-mock";
import { ArcsScoreWart } from "./arcs-score-wart";

it("static __get0and50", () => {
    const mapSnapPoints: SnapPoint[] = new Array(51).fill(null).map((_, i) => {
        return new MockSnapPoint({
            tags: ["power-marker"],
            globalPosition: [0, i, 0],
        });
    });
    const map: GameObject = new MockGameObject({
        templateMetadata: "board:base/map",
        snapPoints: mapSnapPoints,
    });
    mockWorld._reset({ gameObjects: [map] });

    const [p0, p50]: [p0: Vector | undefined, p50: Vector | undefined] =
        ArcsScoreWart.__get0and50();
    expect(p0).toBeDefined();
    expect(p50).toBeDefined();
    expect(p0?.toString()).toEqual("(X=0,Y=0,Z=0)");
    expect(p50?.toString()).toEqual("(X=0,Y=50,Z=0)");
});

it("static __getScoreFromPos", () => {
    const mapSnapPoints: SnapPoint[] = new Array(51).fill(null).map((_, i) => {
        return new MockSnapPoint({
            tags: ["power-marker"],
            globalPosition: [0, i, 0],
        });
    });
    const map: GameObject = new MockGameObject({
        templateMetadata: "board:base/map",
        snapPoints: mapSnapPoints,
    });
    mockWorld._reset({ gameObjects: [map] });

    expect(ArcsScoreWart.__getScoreFromPos(new Vector(3, -1, 0))).toEqual(0);
    expect(ArcsScoreWart.__getScoreFromPos(new Vector(3, 0, 0))).toEqual(0);
    expect(ArcsScoreWart.__getScoreFromPos(new Vector(3, 1, 0))).toEqual(1);
    expect(ArcsScoreWart.__getScoreFromPos(new Vector(3, 49, 0))).toEqual(49);
    expect(ArcsScoreWart.__getScoreFromPos(new Vector(3, 50, 0))).toEqual(50);
    expect(ArcsScoreWart.__getScoreFromPos(new Vector(3, 51, 0))).toEqual(50);
});

it("static __getScoreFromPlayerSlot", () => {
    const mapSnapPoints: SnapPoint[] = new Array(51).fill(null).map((_, i) => {
        return new MockSnapPoint({
            tags: ["power-marker"],
            globalPosition: [0, i, 0],
        });
    });
    const map: GameObject = new MockGameObject({
        templateMetadata: "board:base/map",
        snapPoints: mapSnapPoints,
    });
    const powerMarker: GameObject = new MockGameObject({
        templateMetadata: "unit:base/power-marker",
        owningPlayerSlot: 1,
        position: new Vector(10, 10, 0),
    });
    mockWorld._reset({ gameObjects: [map, powerMarker] });

    expect(ArcsScoreWart.__getScoreFromPlayerSlot(1)).toEqual(10);
    expect(ArcsScoreWart.__getScoreFromPlayerSlot(2)).toEqual(-1);
});

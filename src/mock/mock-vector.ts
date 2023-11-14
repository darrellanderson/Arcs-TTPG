import { Color, Rotator, Vector } from "@tabletop-playground/api";

export class MockVector implements Vector {
    x: number = 0;
    y: number = 0;
    z: number = 0;
    [0]: number = 0;
    [1]: number = 0;
    [2]: number = 0;

    clone(): Vector {
        throw new Error("Method not implemented.");
    }
    toString(): string {
        throw new Error("Method not implemented.");
    }
    add(b: Vector | [x: number, y: number, z: number]): Vector {
        throw new Error("Method not implemented.");
    }
    clampVectorMagnitude(min: number, max: number): Vector {
        throw new Error("Method not implemented.");
    }
    toColor(): Color {
        throw new Error("Method not implemented.");
    }
    toRotator(): Rotator {
        throw new Error("Method not implemented.");
    }
    divide(b: number): Vector {
        throw new Error("Method not implemented.");
    }
    dot(b: Vector | [x: number, y: number, z: number]): number {
        throw new Error("Method not implemented.");
    }
    equals(
        b: Vector | [x: number, y: number, z: number],
        errorTolerance: number
    ): boolean {
        throw new Error("Method not implemented.");
    }
    findClosestPointOnLine(
        lineOrigin: Vector | [x: number, y: number, z: number],
        lineDirection: Vector | [x: number, y: number, z: number]
    ): Vector {
        throw new Error("Method not implemented.");
    }
    findClosestPointOnSegment(
        segmentStart: Vector | [x: number, y: number, z: number],
        segmentEnd: Vector | [x: number, y: number, z: number]
    ): Vector {
        throw new Error("Method not implemented.");
    }
    findLookAtRotation(
        target: Vector | [x: number, y: number, z: number]
    ): Rotator {
        throw new Error("Method not implemented.");
    }
    getMaxElement(): number {
        throw new Error("Method not implemented.");
    }
    getMinElement(): number {
        throw new Error("Method not implemented.");
    }
    getDistanceToLine(
        lineOrigin: Vector | [x: number, y: number, z: number],
        lineDirection: Vector | [x: number, y: number, z: number]
    ): number {
        throw new Error("Method not implemented.");
    }
    getDistanceToSegment(
        segmentStart: Vector | [x: number, y: number, z: number],
        segmentEnd: Vector | [x: number, y: number, z: number]
    ): number {
        throw new Error("Method not implemented.");
    }
    getReflectionVector(
        surfaceNormal: Vector | [x: number, y: number, z: number]
    ): Vector {
        throw new Error("Method not implemented.");
    }
    isInBox(
        boxOrigin: Vector | [x: number, y: number, z: number],
        boxExtent: Vector | [x: number, y: number, z: number]
    ): boolean {
        throw new Error("Method not implemented.");
    }
    multiply(f: number): Vector {
        throw new Error("Method not implemented.");
    }
    negate(): Vector {
        throw new Error("Method not implemented.");
    }
    unit(): Vector {
        throw new Error("Method not implemented.");
    }
    rotateAngleAxis(
        angleDeg: number,
        axis: Vector | [x: number, y: number, z: number]
    ): Vector {
        throw new Error("Method not implemented.");
    }
    subtract(b: Vector | [x: number, y: number, z: number]): Vector {
        throw new Error("Method not implemented.");
    }
    magnitude(): number {
        throw new Error("Method not implemented.");
    }
    magnitudeSquared(): number {
        throw new Error("Method not implemented.");
    }
    distance(b: Vector | [x: number, y: number, z: number]): number {
        throw new Error("Method not implemented.");
    }
    [Symbol.iterator](): Iterator<number, any, undefined> {
        throw new Error("Method not implemented.");
    }
}

export { MockVector as Vector };

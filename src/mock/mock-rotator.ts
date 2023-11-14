import { Rotator, Vector } from "@tabletop-playground/api";

export class MockRotator implements Rotator {
    pitch: number = 0;
    yaw: number = 0;
    roll: number = 0;
    [0]: number = 0;
    [1]: number = 0;
    [2]: number = 0;

    clone(): Rotator {
        throw new Error("Method not implemented.");
    }
    toString(): string {
        throw new Error("Method not implemented.");
    }
    compose(b: Rotator | [pitch: number, yaw: number, roll: number]): Rotator {
        throw new Error("Method not implemented.");
    }
    toVector(): Vector {
        throw new Error("Method not implemented.");
    }
    equals(
        b: Rotator | [pitch: number, yaw: number, roll: number],
        errorTolerance: number
    ): boolean {
        throw new Error("Method not implemented.");
    }
    getForwardVector(): Vector {
        throw new Error("Method not implemented.");
    }
    getRightVector(): Vector {
        throw new Error("Method not implemented.");
    }
    getUpVector(): Vector {
        throw new Error("Method not implemented.");
    }
    multiply(b: number): Rotator {
        throw new Error("Method not implemented.");
    }
    negate(): Rotator {
        throw new Error("Method not implemented.");
    }
    rotateVector(v: Vector | [x: number, y: number, z: number]): Vector {
        throw new Error("Method not implemented.");
    }
    unrotateVector(v: Vector | [x: number, y: number, z: number]): Vector {
        throw new Error("Method not implemented.");
    }
    getInverse(): Rotator {
        throw new Error("Method not implemented.");
    }
    [Symbol.iterator](): Iterator<number, any, undefined> {
        throw new Error("Method not implemented.");
    }
}

export { MockRotator as Rotator };

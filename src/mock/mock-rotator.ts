import { Rotator, Vector } from "@tabletop-playground/api";
import { MockVector } from "./mock-vector";

export class MockRotator implements Rotator {
    static _from(
        b: Rotator | [pitch: number, yaw: number, roll: number]
    ): Rotator {
        if (b instanceof MockRotator) {
            return b.clone();
        }
        return new MockRotator(b[0], b[1], b[2]);
    }

    pitch: number;
    yaw: number;
    roll: number;

    get [0](): number {
        return this.pitch;
    }
    get [1](): number {
        return this.yaw;
    }
    get [2](): number {
        return this.roll;
    }
    set [0](value: number) {
        this.pitch = value;
    }
    set [1](value: number) {
        this.yaw = value;
    }
    set [2](value: number) {
        this.roll = value;
    }

    [Symbol.iterator](): Iterator<number, any, undefined> {
        let index = 0;
        return {
            next: (): IteratorResult<number | any> => {
                const done = index >= 3;
                const value = [this.pitch, this.yaw, this.roll][index];
                index += 1;
                return { done, value };
            },
        };
    }

    constructor(pitch: number, yaw: number, roll: number) {
        this.pitch = pitch;
        this.yaw = yaw;
        this.roll = roll;
    }

    clone(): Rotator {
        return new MockRotator(this.pitch, this.yaw, this.roll);
    }

    equals(
        b: Rotator | [pitch: number, yaw: number, roll: number],
        errorTolerance: number
    ): boolean {
        b = MockRotator._from(b);
        const dpitch = Math.abs(this.pitch - b.pitch);
        const dyaw = Math.abs(this.yaw - b.yaw);
        const droll = Math.abs(this.roll - b.roll);
        return (
            dpitch <= errorTolerance &&
            dyaw <= errorTolerance &&
            droll <= errorTolerance
        );
    }

    multiply(b: number): Rotator {
        return new MockRotator(this.pitch * b, this.yaw * b, this.roll * b);
    }

    negate(): Rotator {
        return new MockRotator(-this.pitch, -this.yaw, -this.roll);
    }

    toString(): string {
        return `(P=${this.pitch},Y=${this.yaw},R=${this.roll})`;
    }

    toVector(): Vector {
        return new MockVector(this.pitch, this.yaw, this.roll);
    }

    static interpolateTo(
        current: Rotator | [pitch: number, yaw: number, roll: number],
        target: Rotator | [pitch: number, yaw: number, roll: number],
        deltaTime: number,
        interpSpeed: number
    ): Rotator {
        current = MockRotator._from(current);
        target = MockRotator._from(target);
        // Interpolate in vector space, then back.
        const a = current.toVector();
        const b = target.toVector();
        const r = MockVector.interpolateTo(a, b, deltaTime, interpSpeed);
        return r.toRotator();
    }

    static interpolateToConstant(
        current: Rotator | [pitch: number, yaw: number, roll: number],
        target: Rotator | [pitch: number, yaw: number, roll: number],
        deltaTime: number,
        interpSpeed: number
    ): Rotator {
        // How is this different?
        return MockRotator.interpolateTo(
            current,
            target,
            deltaTime,
            interpSpeed
        );
    }

    static lerp(
        a: Rotator | [pitch: number, yaw: number, roll: number],
        b: Rotator | [pitch: number, yaw: number, roll: number],
        alpha: number,
        bShortestPath: boolean
    ): Rotator {
        a = MockRotator._from(a);
        b = MockRotator._from(b);
        const d = {
            pitch: b.pitch - a.pitch,
            yaw: b.yaw - a.yaw,
            roll: b.roll - a.roll,
        };
        return new MockRotator(
            a.pitch + d.pitch * alpha,
            a.yaw + d.yaw * alpha,
            a.roll + d.roll * alpha
        );
    }

    // --------------------------------

    compose(b: Rotator | [pitch: number, yaw: number, roll: number]): Rotator {
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
    rotateVector(v: Vector | [x: number, y: number, z: number]): Vector {
        throw new Error("Method not implemented.");
    }
    unrotateVector(v: Vector | [x: number, y: number, z: number]): Vector {
        throw new Error("Method not implemented.");
    }
    getInverse(): Rotator {
        throw new Error("Method not implemented.");
    }

    static fromAxisAngle(
        axis: Vector | [x: number, y: number, z: number],
        angle: number
    ): Rotator {
        throw new Error("Method not implemented.");
    }
}

export { MockRotator as Rotator };

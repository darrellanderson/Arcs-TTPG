import {
    GameObject,
    SnapPoint,
    StaticObject,
    Vector,
} from "@tabletop-playground/api";

export class MockSnapPoint implements SnapPoint {
    snapsRotation(): boolean {
        throw new Error("Method not implemented.");
    }
    isValid(): boolean {
        throw new Error("Method not implemented.");
    }
    getTags(): string[] {
        throw new Error("Method not implemented.");
    }
    getSnapRotationType(): number {
        throw new Error("Method not implemented.");
    }
    getSnapRotation(): number {
        throw new Error("Method not implemented.");
    }
    getSnappedObject(
        sphereRadius?: number | undefined,
        restrictTags?: boolean | undefined
    ): GameObject | undefined {
        throw new Error("Method not implemented.");
    }
    getShape(): number {
        throw new Error("Method not implemented.");
    }
    getRange(): number {
        throw new Error("Method not implemented.");
    }
    getParentObject(): StaticObject | undefined {
        throw new Error("Method not implemented.");
    }
    getLocalPosition(): Vector {
        throw new Error("Method not implemented.");
    }
    getIndex(): number {
        throw new Error("Method not implemented.");
    }
    getGlobalPosition(): Vector {
        throw new Error("Method not implemented.");
    }
    getFlipValidity(): number {
        throw new Error("Method not implemented.");
    }
}

export { MockSnapPoint as SnapPoint };

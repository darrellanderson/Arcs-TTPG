import { GameObject, ObjectType } from "@tabletop-playground/api";
import { AbstractSetup, LayoutObjects, Spawn } from "ttpg-darrell";

export class SetupRollArea extends AbstractSetup {
    private readonly _mat: GameObject;

    constructor() {
        super();
        this._mat = Spawn.spawnOrThrow("mat:base/roll-area", [0, 0, 0]);
    }

    getLayoutObjects(): LayoutObjects {
        return new LayoutObjects().add(this._mat).addAfterLayout(() => {
            this._afterLayout();
        });
    }

    _afterLayout(): void {
        this._mat.setObjectType(ObjectType.Ground);
    }
}

import { GameObject, ObjectType } from "@tabletop-playground/api";
import { AbstractSetup, LayoutObjects, Spawn } from "ttpg-darrell";

export class SetupGarbage extends AbstractSetup {
    private readonly _garbage: GameObject;

    constructor() {
        super();
        this._garbage = Spawn.spawnOrThrow("container:base/garbage", [0, 0, 0]);
    }

    getLayoutObjects(): LayoutObjects {
        const layoutObjects = new LayoutObjects().add(this._garbage);
        layoutObjects.afterLayout.add(() => {
            this._afterLayout();
        });
        return layoutObjects;
    }

    _afterLayout(): void {
        this._garbage.setObjectType(ObjectType.Ground);
    }
}

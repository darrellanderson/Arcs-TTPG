import { Color, GameObject, ObjectType } from "@tabletop-playground/api";
import { AbstractSetup, LayoutObjects, Spawn } from "ttpg-darrell";

export class SetupLoreMat extends AbstractSetup {
    private readonly _mat: GameObject;

    constructor() {
        super();
        this._mat = Spawn.spawnOrThrow("mat:base/lore", [0, 0, 0]);
    }

    getLayoutObjects(): LayoutObjects {
        const layoutObjects = new LayoutObjects().add(this._mat);
        layoutObjects.afterLayout.add(() => {
            this._afterLayout();
        });
        return layoutObjects;
    }

    _afterLayout(): void {
        const playerSlot: number = this.getPlayerSlot();
        const primaryColor: Color = this.getPrimaryColor();

        this._mat.setObjectType(ObjectType.Ground);
        this._mat.setOwningPlayerSlot(playerSlot);
        this._mat.setPrimaryColor(primaryColor);
    }
}

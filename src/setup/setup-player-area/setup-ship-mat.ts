import { Color, GameObject, Rotator, Vector } from "@tabletop-playground/api";
import { AbstractSetup } from "setup/abstract-setup";
import { LayoutObjects, Spawn } from "ttpg-darrell";

export class SetupShipMat extends AbstractSetup {
    private readonly _mat: GameObject;

    constructor() {
        super();
        this._mat = Spawn.spawnOrThrow("mat:base/ship", [0, 0, 0]);
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
        const rot: Rotator = this._mat.getRotation();

        this._mat.setOwningPlayerSlot(playerSlot);
        this._mat.setPrimaryColor(primaryColor);

        for (const snapPoint of this._mat.getAllSnapPoints()) {
            const pos: Vector = snapPoint.getGlobalPosition().add([0, 0, 10]);
            const obj: GameObject = Spawn.spawnOrThrow("unit:base/ship", pos);
            obj.setOwningPlayerSlot(playerSlot);
            obj.setPrimaryColor(primaryColor);
            obj.setRotation(rot);
            obj.snapToGround();
        }
    }
}

import { Color, GameObject, ObjectType } from "@tabletop-playground/api";
import {
    AbstractSetup,
    AbstractSetupParams,
    LayoutObjects,
    Spawn,
} from "ttpg-darrell";

export class SetupLeaderMat extends AbstractSetup {
    private readonly _mat: GameObject;

    constructor(params: AbstractSetupParams) {
        super(params);
        this._mat = Spawn.spawnOrThrow("mat:base/leader", [0, 0, 0]);
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

import {
    Color,
    GameObject,
    ObjectType,
    Rotator,
    Vector,
} from "@tabletop-playground/api";
import {
    AbstractSetup,
    AbstractSetupParams,
    LayoutObjects,
    Spawn,
} from "ttpg-darrell";

export class SetupBuildingMat extends AbstractSetup {
    private readonly _mat: GameObject;

    constructor(params: AbstractSetupParams) {
        super(params);
        this._mat = Spawn.spawnOrThrow("mat:base/building", [0, 0, 0]);
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

        this._mat.setObjectType(ObjectType.Ground);
        this._mat.setOwningPlayerSlot(playerSlot);
        this._mat.setPrimaryColor(primaryColor);

        for (const snapPoint of this._mat.getAllSnapPoints()) {
            const pos: Vector = snapPoint.getGlobalPosition().add([0, 0, 10]);
            const obj: GameObject = Spawn.spawnOrThrow(
                "token:base/starport",
                pos
            );
            obj.setOwningPlayerSlot(playerSlot);
            obj.setPrimaryColor(primaryColor);
            obj.setRotation(rot);
            obj.snapToGround();
        }
    }
}

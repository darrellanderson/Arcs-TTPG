import { Color, GameObject, Rotator, Vector } from "@tabletop-playground/api";
import { AbstractSetup } from "setup/abstract-setup";
import { LayoutObjects, Spawn } from "ttpg-darrell";

export class SetupPlayerboard extends AbstractSetup {
    private readonly _playerboard: GameObject;

    constructor() {
        super();
        this._playerboard = Spawn.spawnOrThrow(
            "board:base/playerboard",
            [0, 0, 0]
        );
    }

    getLayoutObjects(): LayoutObjects {
        const layoutObjects = new LayoutObjects().add(this._playerboard);
        layoutObjects.afterLayout.add(() => {
            this._afterLayout();
        });
        return layoutObjects;
    }

    _afterLayout(): void {
        const playerSlot: number = this.getPlayerSlot();
        const primaryColor: Color = this.getPrimaryColor();
        const rot: Rotator = this._playerboard.getRotation();

        this._playerboard.setOwningPlayerSlot(playerSlot);
        this._playerboard.setPrimaryColor(primaryColor);

        for (const snapPoint of this._playerboard.getAllSnapPoints()) {
            if (!snapPoint.getTags().includes("building")) {
                continue;
            }
            const pos: Vector = snapPoint.getGlobalPosition().add([0, 0, 10]);
            const obj: GameObject = Spawn.spawnOrThrow("token:base/city", pos);
            obj.setOwningPlayerSlot(playerSlot);
            obj.setPrimaryColor(primaryColor);
            obj.setRotation(rot);
            obj.snapToGround();
        }
    }
}

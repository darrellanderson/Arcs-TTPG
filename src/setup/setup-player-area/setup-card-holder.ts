import { Color, GameObject, Rotator, Vector } from "@tabletop-playground/api";
import { AbstractSetup } from "setup/abstract-setup";
import { LayoutObjects, Spawn } from "ttpg-darrell";

export class SetupCardHolder extends AbstractSetup {
    private readonly _cardHolder: GameObject;

    constructor() {
        super();
        this._cardHolder = Spawn.spawnOrThrow("cardholder:base/trh", [0, 0, 0]);
    }

    getLayoutObjects(): LayoutObjects {
        const layoutObjects = new LayoutObjects().add(this._cardHolder);
        layoutObjects.afterLayout.add(() => {
            this._afterLayout();
        });
        return layoutObjects;
    }

    _afterLayout(): void {
        const playerSlot: number = this.getPlayerSlot();
        this._cardHolder.setOwningPlayerSlot(playerSlot);
    }
}

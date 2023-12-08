import { AbstractSetup, LayoutObjects } from "ttpg-darrell";
import { SetupDice } from "./setup-dice";
import { SetupResources } from "./setup-resources";
import { HorizontalAlignment } from "@tabletop-playground/api";

export class SetupResourceArea extends AbstractSetup {
    private readonly _layoutObjects: LayoutObjects;

    constructor() {
        super();

        const dice = new SetupDice();
        const resources = new SetupResources();

        this._layoutObjects = new LayoutObjects()
            .setChildDistanace(4)
            .setIsVertical(false)
            .setHorizontalAlignment(HorizontalAlignment.Right)
            .add(dice.getLayoutObjects())
            .add(resources.getLayoutObjects());
    }

    getLayoutObjects(): LayoutObjects {
        return this._layoutObjects;
    }
}

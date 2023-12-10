import { AbstractSetup, LayoutObjects } from "ttpg-darrell";
import { SetupDice } from "./setup-dice";
import { SetupResources } from "./setup-resources";
import { SetupGarbage } from "setup/setup-garbage/setup-garbage";
import { SPACING } from "setup/setup-config";

export class SetupResourceArea extends AbstractSetup {
    private readonly _layoutObjects: LayoutObjects;

    constructor() {
        super();

        const garbage = new SetupGarbage();
        const dice = new SetupDice();
        const resources = new SetupResources();

        const colRight = new LayoutObjects()
            .setChildDistance(SPACING)
            .setIsVertical(true)
            .add(resources.getLayoutObjects())
            .add(dice.getLayoutObjects());

        const colLeft = new LayoutObjects()
            .setChildDistance(SPACING)
            .setIsVertical(true)
            .add(garbage.getLayoutObjects());

        this._layoutObjects = new LayoutObjects()
            .setChildDistance(SPACING)
            .setIsVertical(false)
            .add(colLeft)
            .add(colRight);
    }

    getLayoutObjects(): LayoutObjects {
        return this._layoutObjects;
    }
}

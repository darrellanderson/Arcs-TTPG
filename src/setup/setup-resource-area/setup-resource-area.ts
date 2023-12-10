import { AbstractSetup, LayoutObjects } from "ttpg-darrell";
import { SetupDice } from "./setup-dice";
import { SetupResources } from "./setup-resources";
import { SetupGarbage } from "setup/setup-garbage";

export class SetupResourceArea extends AbstractSetup {
    private readonly _layoutObjects: LayoutObjects;

    constructor() {
        super();

        const garbage = new SetupGarbage();
        const dice = new SetupDice();
        const resources = new SetupResources();

        const colRight = new LayoutObjects()
            .setChildDistanace(4)
            .setIsVertical(true)
            .add(garbage.getLayoutObjects())
            .add(dice.getLayoutObjects());

        const colMid = new LayoutObjects()
            .setChildDistanace(4)
            .setIsVertical(true)
            .add(resources.getLayoutObjects());

        this._layoutObjects = new LayoutObjects()
            .setChildDistanace(4)
            .setIsVertical(false)
            .add(colMid)
            .add(colRight);
    }

    getLayoutObjects(): LayoutObjects {
        return this._layoutObjects;
    }
}

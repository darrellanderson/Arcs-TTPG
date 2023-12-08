import { AbstractSetup, LayoutObjects, Spawn } from "ttpg-darrell";
import { SetupDice } from "./setup-dice";
import { SetupResources } from "./setup-resources";
import {
    GameObject,
    HorizontalAlignment,
    world,
} from "@tabletop-playground/api";
import { SetupGarbage } from "setup/setup-garbage";

export class SetupResourceArea extends AbstractSetup {
    private readonly _layoutObjects: LayoutObjects;

    constructor() {
        super();

        const dice = new SetupDice();
        const resources = new SetupResources();

        const d4 = world.createObjectFromTemplate(
            "1885447D4CF808B36797CFB1DD679BAC",
            [0, 0, 0]
        );
        if (!d4) {
            throw new Error("no d4");
        }
        const otherCol: LayoutObjects = new LayoutObjects()
            .setIsVertical(true)
            .setChildDistanace(4)
            .add(Spawn.spawnOrThrow("token:base/initiative", [0, 0, 0]))
            .add(Spawn.spawnOrThrow("card.setup.2p:base/*", [0, 0, 0]))
            .add(Spawn.spawnOrThrow("card.setup.3p:base/*", [0, 0, 0]))
            .add(Spawn.spawnOrThrow("card.setup.4p:base/*", [0, 0, 0]))
            .add(Spawn.spawnOrThrow("token.path:base/large", [0, 0, 0]))
            .add(Spawn.spawnOrThrow("token.path:base/small", [0, 0, 0]))
            .add(Spawn.spawnOrThrow("token:base/out-of-play-marker", [0, 0, 0]))
            .add(Spawn.spawnOrThrow("card.leader:base/*", [0, 0, 0]))
            .add(Spawn.spawnOrThrow("card.lore:base/*", [0, 0, 0]))
            .add(d4)
            .setOverrideWidth(47);

        this._layoutObjects = new LayoutObjects()
            .setChildDistanace(4)
            .setIsVertical(false)
            .setHorizontalAlignment(HorizontalAlignment.Right)
            .add(resources.getLayoutObjects()) // right to left (flip)
            .add(dice.getLayoutObjects())
            .add(new SetupGarbage().getLayoutObjects())
            .add(otherCol)
            .flip(true, false);
    }

    getLayoutObjects(): LayoutObjects {
        return this._layoutObjects;
    }
}

import { world } from "@tabletop-playground/api";
import { SPACING } from "setup/static/setup-config";
import { AbstractSetup, LayoutObjects, Spawn } from "ttpg-darrell";

/**
 * Various objects not included in other setup areas.
 */
export class SetupOther extends AbstractSetup {
    getLayoutObjects(): LayoutObjects {
        const layoutObjects = new LayoutObjects()
            .setIsVertical(true)
            .setChildDistance(SPACING);

        const d4 = world.createObjectFromTemplate(
            "1885447D4CF808B36797CFB1DD679BAC",
            [0, 0, 0]
        );
        if (!d4) {
            throw new Error("no d4");
        }

        layoutObjects
            .add(Spawn.spawnOrThrow("token:base/initiative", [0, 0, 0]))
            .add(Spawn.spawnOrThrow("card.setup.2p:base/*", [0, 0, 0]))
            .add(Spawn.spawnOrThrow("card.setup.3p:base/*", [0, 0, 0]))
            .add(Spawn.spawnOrThrow("card.setup.4p:base/*", [0, 0, 0]))
            .add(Spawn.spawnOrThrow("token.path:base/large", [0, 0, 0]))
            .add(Spawn.spawnOrThrow("token.path:base/small", [0, 0, 0]))
            .add(Spawn.spawnOrThrow("token:base/out-of-play-marker", [0, 0, 0]))
            .add(Spawn.spawnOrThrow("card.leader:base/*", [0, 0, 0]))
            .add(
                Spawn.spawnOrThrow("card.leader:leaders-and-lore/*", [0, 0, 0])
            )
            .add(Spawn.spawnOrThrow("card.lore:base/*", [0, 0, 0]))
            .add(Spawn.spawnOrThrow("card.lore:leaders-and-lore/*", [0, 0, 0]))
            .add(d4);

        return layoutObjects;
    }
}

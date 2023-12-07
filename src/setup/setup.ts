import { Vector, refObject, world } from "@tabletop-playground/api";
import { LayoutObjects } from "ttpg-darrell";
import { SetupPlayerArea } from "./setup-player-area/setup-player-area";
import { SetupMap } from "./setup-map/setup-map";

console.log("---- setup ----");

// Make sure Spawn is ready.
import { InjectSpawnNSIDs } from "../global/inject-spawn-nsids/inject-spawn-nsids";
new InjectSpawnNSIDs().init();

for (const obj of world.getAllObjects()) {
    if (obj !== refObject) {
        obj.destroy();
    }
}

const setupMap = new SetupMap();

const ll = new SetupPlayerArea(0).getLayoutObjects().flip(false, false);
const lr = new SetupPlayerArea(1).getLayoutObjects().flip(false, false);
const ul = new SetupPlayerArea(2).getLayoutObjects().flip(false, true);
const ur = new SetupPlayerArea(3).getLayoutObjects().flip(false, true);

const outerSpacing = 4;
const upper = new LayoutObjects()
    .setIsVertical(false)
    .setChildDistanace(outerSpacing)
    .add(ul)
    .add(ur);
const lower = new LayoutObjects()
    .setIsVertical(false)
    .setChildDistanace(outerSpacing)
    .add(ll)
    .add(lr);
new LayoutObjects()
    .setIsVertical(true)
    .setChildDistanace(outerSpacing)
    .add(upper)
    .add(setupMap.getLayoutObjects())
    .add(lower)
    .doLayoutAtPoint(new Vector(0, 0, world.getTableHeight() + 2), 0);

import {
    Vector,
    VerticalAlignment,
    refObject,
    world,
} from "@tabletop-playground/api";
import { LayoutObjects } from "ttpg-darrell";
import { SetupPlayerArea } from "./setup-player-area/setup-player-area";
import { SetupMap } from "./setup-map/setup-map";
import { SetupCourt } from "./setup-court/setup-court";
import { SetupResourceArea } from "./setup-resource-area/setup-resource-area";
import { SetupGarbage } from "./setup-garbage";
import { SetupOther } from "./setup-other/setup-other";

console.log("----- SETUP -----");

for (const obj of world.getAllObjects()) {
    if (obj !== refObject) {
        obj.destroy();
    }
}

// Map in center.
const setupMap = new SetupMap();
const map = setupMap.getMapGameObject();

// Player areas around map.
const ll = new SetupPlayerArea(0).getLayoutObjects().flip(false, false);
const lr = new SetupPlayerArea(1).getLayoutObjects().flip(false, false);
const ul = new SetupPlayerArea(2).getLayoutObjects().flip(false, true);
const ur = new SetupPlayerArea(3).getLayoutObjects().flip(false, true);

const outerSpacing = 4;
const upper = new LayoutObjects()
    .setIsVertical(false)
    .setVerticalAlignment(VerticalAlignment.Bottom)
    .setChildDistanace(outerSpacing)
    .add(ul)
    .add(new SetupGarbage().getLayoutObjects())
    .add(ur);
const lower = new LayoutObjects()
    .setIsVertical(false)
    .setVerticalAlignment(VerticalAlignment.Top)
    .setChildDistanace(outerSpacing)
    .add(ll)
    .add(new SetupGarbage().getLayoutObjects())
    .add(lr);
new LayoutObjects()
    .setIsVertical(true)
    .setChildDistanace(outerSpacing)
    .add(upper)
    .add(setupMap.getLayoutObjects())
    .add(lower)
    .doLayoutAtPoint(new Vector(0, 0, world.getTableHeight() + 2), 0);

// Court to the right.
const court = new SetupCourt().getLayoutObjects();
court.layoutRightOf(map, outerSpacing);

// Resources to the left.
const resourceArea = new SetupResourceArea().getLayoutObjects();
resourceArea.layoutLeftOf(map, outerSpacing);

// Random other things.
const setupOther = new SetupOther().getLayoutObjects();
setupOther.doLayoutAtPoint(new Vector(0, -100, world.getTableHeight() + 2), 0);

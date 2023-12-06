import { Color, Vector, refObject, world } from "@tabletop-playground/api";
import { LayoutObjects, Spawn } from "ttpg-darrell";
import { SetupAgentMat } from "./setup-player-area/setup-agent-mat";
import { SetupShipMat } from "./setup-player-area/setup-ship-mat";
import { SetupBuildingMat } from "./setup-player-area/setup-building-mat";
import { SetupPlayerboard } from "./setup-player-area/setup-playerboard";
import { SetupLeaderMat } from "./setup-player-area/setup-leader-mat";
import { SetupCardHolder } from "./setup-player-area/setup-card-holder";

require("../global/spawn/global-init-spawn");

export class SetupPlayerArea extends LayoutObjects {
    constructor() {
        super();
    }

    getReadyForLayout(playerIndex: number) {
        console.log("go: " + playerIndex);

        const colorFromHex = (hex: string): Color => {
            const match = hex.toLowerCase().match(/^([0-9a-f]{6})$/i);
            if (!match) {
                throw new Error(`"${hex}" not a valid hex color`);
            }
            const m = match[1];
            const r = parseInt(m.substring(0, 2), 16);
            const g = parseInt(m.substring(2, 4), 16);
            const b = parseInt(m.substring(4, 6), 16);
            return new Color(r / 255, g / 255, b / 255, 1);
        };

        const slotAndColor = [
            {
                slot: 13,
                colorName: "blue",
                color: colorFromHex("6db6ff"),
            },
            {
                slot: 9,
                colorName: "yellow",
                color: colorFromHex("ffff00"),
            },
            {
                slot: 6,
                colorName: "orange",
                color: colorFromHex("db6d00"),
            },
            {
                slot: 18,
                colorName: "white",
                color: colorFromHex("ffffff"),
            },
        ];

        const slot = slotAndColor[playerIndex].slot;
        const color = slotAndColor[playerIndex].color;

        const playerboard = new SetupPlayerboard()
            .setPlayerSlot(slot)
            .setPrimaryColor(color)
            .getLayoutObjects();
        const leaderMat = new SetupLeaderMat()
            .setPlayerSlot(slot)
            .setPrimaryColor(color)
            .getLayoutObjects();

        const shipMat = new SetupShipMat()
            .setPlayerSlot(slot)
            .setPrimaryColor(color)
            .getLayoutObjects();
        const agentMat = new SetupAgentMat()
            .setPlayerSlot(slot)
            .setPrimaryColor(color)
            .getLayoutObjects();
        const buildingMat = new SetupBuildingMat()
            .setPlayerSlot(slot)
            .setPrimaryColor(color)
            .getLayoutObjects();

        const cardHolder = new SetupCardHolder()
            .setPlayerSlot(slot)
            .setPrimaryColor(color)
            .getLayoutObjects();

        const spacing = 2;
        let row1 = new LayoutObjects()
            .setIsVertical(false)
            .setChildDistanace(spacing)
            .add(playerboard)
            .add(leaderMat);
        let row2 = new LayoutObjects()
            .setIsVertical(false)
            .setChildDistanace(spacing)
            .add(shipMat)
            .add(agentMat)
            .add(buildingMat);
        let row3 = new LayoutObjects()
            .setIsVertical(false)
            .setChildDistanace(spacing)
            .add(cardHolder);

        return new LayoutObjects()
            .setIsVertical(true)
            .setChildDistanace(spacing)
            .add(row1)
            .add(row2)
            .add(row3);
    }
}

for (const obj of world.getAllObjects()) {
    if (obj !== refObject) {
        obj.destroy();
    }
}

const map = Spawn.spawnOrThrow("board:base/map", [0, 0, -10]);
//map.setObjectType(ObjectType.Ground);

const ll = new SetupPlayerArea().getReadyForLayout(0).flip(false, false);
const lr = new SetupPlayerArea().getReadyForLayout(1).flip(false, false);
const ul = new SetupPlayerArea().getReadyForLayout(2).flip(false, true);
const ur = new SetupPlayerArea().getReadyForLayout(3).flip(false, true);

const outerSpacing = 4;
console.log(`layout ${outerSpacing}`);
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
    .add(map)
    .add(lower)
    .doLayoutAtPoint(new Vector(0, 0, world.getTableHeight() + 2), 0);

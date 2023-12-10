import { Color } from "@tabletop-playground/api";
import { AbstractSetup, LayoutObjects } from "ttpg-darrell";
import { SetupPlayerboard } from "./setup-playerboard";
import { SetupLeaderMat } from "./setup-leader-mat";
import { SetupShipMat } from "./setup-ship-mat";
import { SetupAgentMat } from "./setup-agent-mat";
import { SetupBuildingMat } from "./setup-building-mat";
import { SetupCardHolder } from "./setup-card-holder";
import { SetupLoreMat } from "./setup-lore-mat";
import { HALF_SPACING } from "setup/setup-config";

// TODO: This belongs in a library...
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

const SLOT_AND_COLOR = [
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

export class SetupPlayerArea extends AbstractSetup {
    private readonly _layoutObjects: LayoutObjects;

    constructor(playerIndex: number) {
        super();

        const slot: number = SLOT_AND_COLOR[playerIndex].slot;
        const color: Color = SLOT_AND_COLOR[playerIndex].color;
        this.setPlayerSlot(slot);
        this.setPrimaryColor(color);

        const playerboard = new SetupPlayerboard()
            .setPlayerSlot(slot)
            .setPrimaryColor(color)
            .getLayoutObjects();
        const leaderMat = new SetupLeaderMat()
            .setPlayerSlot(slot)
            .setPrimaryColor(color)
            .getLayoutObjects();
        const loreMat = new SetupLoreMat()
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

        let row1 = new LayoutObjects()
            .setIsVertical(false)
            .setChildDistance(HALF_SPACING)
            .add(playerboard)
            .add(leaderMat)
            .add(loreMat);
        let row2 = new LayoutObjects()
            .setIsVertical(false)
            .setChildDistance(HALF_SPACING)
            .add(shipMat)
            .add(agentMat)
            .add(buildingMat);
        let row3 = new LayoutObjects()
            .setIsVertical(false)
            .setChildDistance(HALF_SPACING)
            .add(cardHolder);

        this._layoutObjects = new LayoutObjects()
            .setIsVertical(true)
            .setChildDistance(HALF_SPACING)
            .add(row1)
            .add(row2)
            .add(row3);
    }

    getLayoutObjects(): LayoutObjects {
        return this._layoutObjects;
    }
}

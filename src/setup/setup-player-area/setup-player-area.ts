import { Color } from "@tabletop-playground/api";
import { AbstractSetup, LayoutObjects } from "ttpg-darrell";
import { SetupPlayerboard } from "./setup-playerboard";
import { SetupLeaderMat } from "./setup-leader-mat";
import { SetupCardHolder } from "./setup-card-holder";
import { SetupLoreMat } from "./setup-lore-mat";
import { HALF_SPACING } from "setup/setup-config";
import { SetupShipContainer } from "./setup-ship-container";
import { SetupAgentContainer } from "./setup-agent-container";
import { SetupStarportContainer } from "./setup-starport-container";
import { SetupShipMat } from "./setup-ship-mat";
import { SetupAgentMat } from "./setup-agent-mat";
import { SetupBuildingMat } from "./setup-building-mat";

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
        slot: 16,
        colorName: "red",
        color: colorFromHex("ff0505"),
    },
    {
        slot: 18,
        colorName: "white",
        color: colorFromHex("ffffff"),
    },
];

const USE_BOXES: boolean = false;

export class SetupPlayerArea extends AbstractSetup {
    private readonly _layoutObjects: LayoutObjects;

    constructor(playerIndex: number) {
        super();

        const slot: number = SLOT_AND_COLOR[playerIndex].slot;
        const color: Color = SLOT_AND_COLOR[playerIndex].color;
        this.setPlayerSlot(slot);
        this.setPrimaryColor(color);

        const forwardGap = new LayoutObjects().setOverrideHeight(9);

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

        const ships = (
            USE_BOXES ? new SetupShipContainer() : new SetupShipMat()
        )
            .setPlayerSlot(slot)
            .setPrimaryColor(color)
            .getLayoutObjects();
        const agents = (
            USE_BOXES ? new SetupAgentContainer() : new SetupAgentMat()
        )
            .setPlayerSlot(slot)
            .setPrimaryColor(color)
            .getLayoutObjects();
        const startports = (
            USE_BOXES ? new SetupStarportContainer() : new SetupBuildingMat()
        )
            .setPlayerSlot(slot)
            .setPrimaryColor(color)
            .getLayoutObjects();

        const cardHolder = new SetupCardHolder()
            .setPlayerSlot(slot)
            .setPrimaryColor(color)
            .getLayoutObjects();

        const items = new LayoutObjects().setChildDistance(HALF_SPACING);

        if (USE_BOXES) {
            items.setIsVertical(false).add(startports).add(ships).add(agents);
        } else {
            const items2 = new LayoutObjects()
                .setIsVertical(false)
                .setChildDistance(HALF_SPACING)
                .add(ships)
                .add(agents);
            items.setIsVertical(true).add(startports).add(items2);
        }

        const row1 = new LayoutObjects()
            .setIsVertical(false)
            .setChildDistance(HALF_SPACING)
            .add(items)
            .add(playerboard)
            .add(leaderMat)
            .add(loreMat);
        const row3 = new LayoutObjects()
            .setIsVertical(false)
            .setChildDistance(HALF_SPACING)
            .add(cardHolder);

        this._layoutObjects = new LayoutObjects()
            .setIsVertical(true)
            .setChildDistance(HALF_SPACING)
            .add(forwardGap)
            .add(row1)
            .add(row3);
    }

    getLayoutObjects(): LayoutObjects {
        return this._layoutObjects;
    }
}

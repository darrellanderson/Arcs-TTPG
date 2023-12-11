/**
 * Show values of all dice in the area (rerolls can be common, showing just
 * roll results does not reflect the overall state).
 */

import {
    Border,
    Canvas,
    Dice,
    GameObject,
    HorizontalAlignment,
    HorizontalBox,
    ImageWidget,
    LayoutBox,
    ScreenUIElement,
    Text,
    TextJustification,
    UIElement,
    Vector,
    VerticalAlignment,
    VerticalBox,
    Widget,
    Zone,
    refObject,
    refPackageId,
    world,
} from "@tabletop-playground/api";
import { D6Widget, NSID } from "ttpg-darrell";

const packageId: string = refPackageId;

type D6State = {
    objId: string;
    nsid: string;
    currentFaceIndex: number;
    currentFaceMetadata: string;
};

function capitalizeFirstLetter(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export class RollArea {
    public static readonly ZONE_HEIGHT: number = 10;
    public static readonly INTERVAL_MSECS: number = 1000;
    public static readonly DICE_SIZE: number = 40;
    public static readonly GAP_SIZE: number = 4;

    private readonly _obj: GameObject;
    private readonly _zone: Zone;

    private readonly _diceBox: LayoutBox;
    private readonly _summaryBox: LayoutBox;
    private readonly _screenUi: ScreenUIElement;
    private readonly _widget: Widget;

    private _interval: any = undefined;
    private _d6states: D6State[] | undefined = undefined;

    constructor(gameObject: GameObject) {
        if (!gameObject) {
            throw new Error("missing game object");
        }

        this._obj = gameObject;
        this._zone = RollArea._findOrCreateZone(this._obj);

        const unpaddedWidth =
            RollArea.DICE_SIZE * 4 + RollArea.GAP_SIZE * 2 + 4;
        this._diceBox = new LayoutBox().setOverrideWidth(unpaddedWidth);
        this._summaryBox = new LayoutBox().setOverrideWidth(unpaddedWidth);
        const widget = new VerticalBox()
            .addChild(this._summaryBox)
            .addChild(this._diceBox);
        this._widget = new LayoutBox()
            .setHorizontalAlignment(HorizontalAlignment.Left)
            .setVerticalAlignment(VerticalAlignment.Top)
            .setChild(
                new Border()
                    .setColor([0, 0, 0, 1])
                    .setChild(
                        new Border().setChild(
                            new LayoutBox()
                                .setPadding(
                                    RollArea.GAP_SIZE,
                                    RollArea.GAP_SIZE,
                                    RollArea.GAP_SIZE,
                                    RollArea.GAP_SIZE
                                )
                                .setChild(widget)
                        )
                    )
            );

        this._screenUi = new ScreenUIElement();
        this._screenUi.anchorX = 0;
        this._screenUi.anchorY = 0;
        this._screenUi.relativePositionX = false;
        this._screenUi.relativePositionY = false;
        this._screenUi.positionX = 16;
        this._screenUi.positionY = 16;
        this._screenUi.relativeWidth = false;
        this._screenUi.relativeHeight = true;
        this._screenUi.width = unpaddedWidth + RollArea.GAP_SIZE * 2 + 100;
        this._screenUi.height = 1;
        this._screenUi.widget = this._widget;
        world.addScreenUI(this._screenUi);
        this._obj.onDestroyed.add(() => {
            world.removeScreenUIElement(this._screenUi);
        });

        // Redirect dice rolling out of zone back in.
        this._zone.onBeginOverlap.add((zone: Zone, obj: GameObject) => {
            const isDice = obj instanceof Dice;
            if (isDice && !this._interval) {
                this._interval = setInterval(() => {
                    this._intervalHandler();
                }, RollArea.INTERVAL_MSECS);
            }
        });
        this._zone.onEndOverlap.add((zone: Zone, obj: GameObject) => {
            const isDice = obj instanceof Dice;
            if (!isDice || obj.isHeld()) {
                return; // not a die, or being held by a player.
            }
            const speed = obj.getLinearVelocity().magnitude();
            const dir = this._obj
                .getPosition()
                .add([0, 0, obj.getSize().z])
                .subtract(obj.getPosition())
                .clampVectorMagnitude(1, 1);
            obj.setLinearVelocity(dir.multiply(speed)); // end of roll still happens
        });

        // Move zone when linked lobject moves.  CAREFUL, onMovementStopped can be spammy!
        let lastPos: Vector = this._obj.getPosition();
        let lastRot: Vector = this._obj.getRotation().toVector();
        this._obj.onMovementStopped.add(() => {
            const newPos: Vector = this._obj.getPosition();
            const newRot: Vector = this._obj.getRotation().toVector();
            const dPos = lastPos.subtract(newPos).magnitudeSquared();
            const dRot = lastRot.subtract(newRot).magnitudeSquared();
            if (dPos > 0.01 || dRot > 0.01) {
                lastPos = newPos;
                lastRot = newRot;
                this._updateZone();
            }
        });

        this._updateZone();
        this._obj.onDestroyed.add(() => {
            this._zone.destroy();
        });

        // Start the interval handler in case dice are inside.
        this._interval = setInterval(() => {
            this._intervalHandler();
        }, RollArea.INTERVAL_MSECS);
    }

    private static _findOrCreateZone(obj: GameObject) {
        let zone: Zone | undefined;
        const id = `__zone_${obj.getId()}__`;
        for (const candidate of world.getAllZones()) {
            if (candidate.getId() === id) {
                console.log(`RollArea found zone "${id}"`);
                zone = candidate;
                break;
            }
        }
        if (!zone) {
            console.log(`RollArea creating zone "${id}"`);
            zone = world.createZone([0, 0, 0]);
        }
        zone.setId(id);
        zone.setAlwaysVisible(false);
        zone.setColor([1, 1, 1, 0.1]);
        return zone;
    }

    private _updateZone() {
        // Fix location.
        const z = RollArea.ZONE_HEIGHT / 2 / this._obj.getScale().z;
        const pos = this._obj.localPositionToWorld([0, 0, z]);
        const rot = this._obj.getRotation();
        this._zone.setPosition(pos);
        this._zone.setRotation(rot);
        console.log(`RollArea updateZone ${pos} / ${rot}`);

        // UIs are included in size. Strip UIs, read size, restore UIs.
        const uis: UIElement[] = this._obj.getUIs();
        for (const ui of uis) {
            this._obj.removeUIElement(ui);
        }
        const size = this._obj.getSize();
        for (const ui of uis) {
            this._obj.addUI(ui);
        }

        // Fix size.
        size.x -= 2;
        size.y -= 2;
        size.z = RollArea.ZONE_HEIGHT;
        this._zone.setScale(size);
    }

    private _intervalHandler() {
        const dice: Dice[] = this._zone
            .getOverlappingObjects()
            .filter((obj) => {
                if (!(obj instanceof Dice)) {
                    return false;
                }
                if (!NSID.get(obj).startsWith("dice:")) {
                    return false;
                }
                return true;
            }) as Dice[];

        // Abort if nothing changed.
        const states: D6State[] = dice.map((d) => {
            return {
                objId: d.getId(),
                nsid: NSID.get(d),
                currentFaceIndex: d.getCurrentFaceIndex(),
                currentFaceMetadata: d.getCurrentFaceMetadata(),
            };
        });
        states.sort((a, b) => {
            if (a.nsid !== b.nsid) {
                return a.nsid.localeCompare(b.nsid);
            }
            if (a.currentFaceMetadata !== b.currentFaceMetadata) {
                return a.currentFaceMetadata.localeCompare(
                    b.currentFaceMetadata
                );
            }
            return a.objId.localeCompare(b.objId);
        });
        if (
            this._d6states &&
            JSON.stringify(states) === JSON.stringify(this._d6states)
        ) {
            return;
        }
        this._d6states = states;

        // Draw dice.
        const cols = 4;
        const rows = Math.ceil(states.length / cols);

        const canvas = new Canvas();

        this._diceBox
            .setOverrideHeight(
                rows * RollArea.DICE_SIZE + (rows - 1) * RollArea.GAP_SIZE
            )
            .setChild(canvas);

        const nsidToTexture: { [key: string]: string } = {
            "dice:base/assault": "base/dice/assault.png",
            "dice:base/raid": "base/dice/raid.png",
            "dice:base/skirmish": "base/dice/skirmish.png",
        };
        for (let i = 0; i < states.length; i++) {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const state: D6State = states[i];

            const texture: string = nsidToTexture[state.nsid];
            const d6 = new D6Widget()
                .setSize(RollArea.DICE_SIZE)
                .setDiceImage(texture, packageId)
                .setFace(state.currentFaceIndex);
            const x = col * (RollArea.DICE_SIZE + RollArea.GAP_SIZE);
            const y = row * (RollArea.DICE_SIZE + RollArea.GAP_SIZE);
            canvas.addChild(
                d6.getWidget(),
                x,
                y,
                RollArea.DICE_SIZE,
                RollArea.DICE_SIZE
            );
        }

        // Summary.
        const count: { [key: string]: number } = {
            self: 0,
            intercept: 0,
            ship: 0,
            building: 0,
            raid: 0,
        };
        for (const state of states) {
            const json = JSON.parse(state.currentFaceMetadata);
            for (const [k, v] of Object.entries(json)) {
                if (typeof k !== "string" || typeof v !== "number") {
                    continue; // bad die
                }
                count[k] += v;
            }
        }

        const summary = new VerticalBox().setChildDistance(RollArea.GAP_SIZE);
        const keyToTexture: { [key: string]: string } = {
            self: "base/dice/symbols/self.png",
            intercept: "base/dice/symbols/intercept.png",
            ship: "base/dice/symbols/ship.png",
            building: "base/dice/symbols/building.png",
            raid: "base/dice/symbols/raid.png",
        };
        const addSummaryRow = (key: string) => {
            const texture: string = keyToTexture[key];
            const symbol = new ImageWidget()
                .setImage(texture, packageId)
                .setImageSize(RollArea.DICE_SIZE, RollArea.DICE_SIZE);

            const countText = new Text()
                .setFontSize(RollArea.DICE_SIZE * 0.4)
                .setJustification(TextJustification.Center)
                .setText(count[key] ? count[key].toString() : "");
            const labelText = new Text()
                .setFontSize(RollArea.DICE_SIZE * 0.3)
                .setJustification(TextJustification.Left)
                .setText(capitalizeFirstLetter(key));

            const row = new HorizontalBox()
                .setVerticalAlignment(VerticalAlignment.Center)
                .setChildDistance(RollArea.GAP_SIZE)
                .addChild(symbol, 1)
                .addChild(labelText, 2)
                .addChild(countText, 1);
            summary.addChild(row);
        };
        addSummaryRow("self");
        addSummaryRow("intercept");
        addSummaryRow("ship");
        addSummaryRow("building");
        addSummaryRow("raid");
        this._summaryBox.setChild(summary);

        // Stop when no dice inside.
        console.log("RollArea: updated");
        if (dice.length === 0) {
            console.log("RollArea: no dice, clearing interval");
            clearInterval(this._interval);
            this._interval = undefined;
        }
    }
}

const obj = refObject; // refObject gets cleared end of frame
process.nextTick(() => {
    new RollArea(obj);
});

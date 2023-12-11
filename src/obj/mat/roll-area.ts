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
    Text,
    TextJustification,
    UIElement,
    UIPresentationStyle,
    Vector,
    VerticalBox,
    Zone,
    refObject,
    refPackageId,
    world,
} from "@tabletop-playground/api";
import { D6Widget, NSID } from "ttpg-darrell";

const packageId: string = refPackageId;

type D6State = {
    nsid: string;
    currentFaceIndex: number;
    currentFaceMetadata: string;
};

export class RollArea {
    public static readonly HEIGHT: number = 10;
    public static readonly INTERVAL_MSECS: number = 250;

    private readonly _obj: GameObject;
    private readonly _zone: Zone;

    private readonly _diceBox: LayoutBox;
    private readonly _summaryBox: LayoutBox;
    private readonly _ui: UIElement;

    private _scale: number = 4;
    private _interval: any = undefined;
    private _d6states: D6State[] = [];

    constructor(gameObject: GameObject) {
        if (!gameObject) {
            throw new Error("missing game object");
        }

        this._obj = gameObject;
        this._zone = RollArea._findOrCreateZone(this._obj);

        const spacing = 4 * this._scale;
        const margin = spacing;
        this._diceBox = new LayoutBox().setHorizontalAlignment(
            HorizontalAlignment.Center
        );
        this._summaryBox = new LayoutBox();
        const div = new Border().setColor([1, 1, 1, 1]);
        const widget = new VerticalBox()
            .setChildDistance(spacing)
            .addChild(this._diceBox)
            .addChild(div)
            .addChild(this._summaryBox);
        const widgetBox = new LayoutBox()
            .setPadding(margin, margin, margin, margin)
            .setChild(widget);

        this._ui = new UIElement();
        this._ui.anchorY = 1;
        this._ui.position = new Vector(0, 0, 20);
        this._ui.presentationStyle = UIPresentationStyle.ViewAligned;
        this._ui.scale = 1 / this._scale;
        this._ui.widget = new Border().setChild(widgetBox);
        this._ui.widget.setVisible(false);
        this._obj.addUI(this._ui);

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

        // Destroy zone when linked object is destroyed.
        this._obj.onDestroyed.add(() => {
            console.log(`RollArea destroying zone "${this._zone.getId()}"`);
            this._zone.destroy();
        });

        this._updateZone();

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
        zone.setAlwaysVisible(true);
        zone.setColor([1, 1, 1, 0.1]);
        return zone;
    }

    private _updateZone() {
        // Fix location.
        const z = RollArea.HEIGHT / 2 / this._obj.getScale().z;
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
        size.z = RollArea.HEIGHT;
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

        // Stop when no dice inside.
        if (dice.length === 0) {
            console.log("RollArea: no dice, clearing interval");
            clearInterval(this._interval);
            this._ui.widget.setVisible(false);
            this._interval = undefined;
            return;
        }
        this._ui.widget.setVisible(true);

        // Abort if nothing changed.
        const states: D6State[] = dice.map((d) => {
            return {
                nsid: NSID.get(d),
                currentFaceIndex: d.getCurrentFaceIndex(),
                currentFaceMetadata: d.getCurrentFaceMetadata(),
            };
        });
        states.sort((a, b) => {
            if (a.nsid !== b.nsid) {
                return a.nsid.localeCompare(b.nsid);
            }
            return a.currentFaceMetadata.localeCompare(b.currentFaceMetadata);
        });
        if (JSON.stringify(states) === JSON.stringify(this._d6states)) {
            return;
        }
        this._d6states = states;

        // Draw dice.
        const cols = Math.ceil(Math.sqrt(dice.length));
        const rows = Math.ceil(states.length / cols);

        const gap = 6 * this._scale;
        const size = 40 * this._scale;
        const frame = 1 * this._scale; // white border, eats into gap size

        const canvas = new Canvas();
        const canvasBox = new LayoutBox()
            .setOverrideWidth(cols * size + (cols - 1) * gap + frame * 2)
            .setOverrideHeight(rows * size + (rows - 1) * gap + frame * 2)
            .setChild(canvas);

        this._diceBox.setChild(canvasBox);

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
                .setSize(size)
                .setDiceImage(texture, packageId)
                .setFace(state.currentFaceIndex);
            const x = col * (size + gap) + frame;
            const y = row * (size + gap) + frame;
            const white = new Border().setColor([1, 1, 1, 1]);
            canvas.addChild(
                white,
                x - frame,
                y - frame,
                size + frame * 2,
                size + frame * 2
            );
            canvas.addChild(d6.getWidget(), x, y, size, size);
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

        const summary = new VerticalBox()
            .setChildDistance(2 * this._scale)
            .setHorizontalAlignment(HorizontalAlignment.Center);
        const labelToTexture: { [key: string]: string } = {
            self: "base/dice/symbols/self.png",
            intercept: "base/dice/symbols/intercept.png",
            ship: "base/dice/symbols/ship.png",
            building: "base/dice/symbols/building.png",
            raid: "base/dice/symbols/raid.png",
        };
        const addSummaryRow = (label: string, count: number) => {
            const texture: string = labelToTexture[label];
            const d = 10 * this._scale;
            const symbol = new ImageWidget()
                .setImage(texture, packageId)
                .setImageSize(d * 1.75, d);

            const fontSize = 10 * this._scale;
            const countText = new Text()
                .setFontSize(fontSize)
                .setText(count.toString())
                .setJustification(TextJustification.Right);
            const labelText = new Text().setFontSize(fontSize).setText(label);

            const row = new HorizontalBox()
                .setChildDistance(3 * this._scale)
                .addChild(countText)
                .addChild(symbol)
                .addChild(labelText);
            summary.addChild(row);
        };
        addSummaryRow("self", count.self);
        addSummaryRow("intercept", count.intercept);
        addSummaryRow("ship", count.ship);
        addSummaryRow("building", count.building);
        addSummaryRow("raid", count.raid);
        this._summaryBox.setChild(summary);
    }
}

const obj = refObject; // refObject gets cleared end of frame
process.nextTick(() => {
    new RollArea(obj);
});

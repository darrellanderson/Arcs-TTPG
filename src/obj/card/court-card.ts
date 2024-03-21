import {
    Border,
    Card,
    GameObject,
    RichText,
    Rotator,
    TextJustification,
    UIElement,
    UIPresentationStyle,
    UIZoomVisibility,
    Vector,
    refCard,
    world,
} from "@tabletop-playground/api";
import { LibAgent } from "lib";

class CourtCard {
    private static readonly SCALE: number = 2;
    private static readonly FONT_SIZE: number = 9 * CourtCard.SCALE;

    private readonly _card: Card;
    private _ui: UIElement | undefined;
    private _richText: RichText | undefined;

    constructor(card: Card) {
        if (!card) {
            throw new Error("missing card");
        }

        this._card = card;

        const updateAndScheduleNext = () => {
            this._update();
            if (this._card.isValid()) {
                setTimeout(
                    updateAndScheduleNext,
                    950 + Math.floor(Math.random() * 100) // drift to avoid colliding with peers
                );
            }
        };
        updateAndScheduleNext();
    }

    private _attachUI(): void {
        if (this._ui) {
            return; // already attached
        }

        this._richText = new RichText()
            .setFontSize(CourtCard.FONT_SIZE)
            .setJustification(TextJustification.Center)
            .setAutoWrap(false)
            .setText(" 1 2 3 4 ");
        const widget = new Border().setChild(this._richText);

        this._ui = new UIElement();
        this._ui.anchorX = 0.5;
        this._ui.anchorY = 1;
        this._ui.presentationStyle = UIPresentationStyle.Regular;
        this._ui.scale = 1 / CourtCard.SCALE;
        this._ui.useWidgetSize = false;
        this._ui.width = 120;
        this._ui.height = 40;
        this._ui.widget = widget;
        this._ui.zoomVisibility = UIZoomVisibility.Both;

        // Place UI at top of card.
        const currentRotation = false;
        const includeGeometry = false;
        const cardExtent: Vector = this._card.getExtent(
            currentRotation,
            includeGeometry
        );
        this._ui.position = new Vector(-cardExtent.x, 0, -cardExtent.z - 0.1);
        this._ui.rotation = new Rotator(180, 0, 180); // face "up"

        this._card.addUI(this._ui);
    }

    private _detachUI(): void {
        if (!this._ui) {
            return; // not attached
        }
        this._card.removeUIElement(this._ui);
        this._ui = undefined;
        this._richText = undefined;
    }

    private _update(): void {
        if (this._card.getStackSize() > 1) {
            this._detachUI();
            return;
        }

        const agents: GameObject[] = LibAgent.getAgentsOnCard(this._card);
        const playerSlotToAgents: { [key: number]: GameObject[] } =
            LibAgent.getPlayerSlotToAgents(agents);
        const slots: number[] = Object.keys(playerSlotToAgents)
            .map((slotStr) => Number.parseInt(slotStr))
            .sort(); // use a deterministic order

        const richText: string[] = [];
        for (const slot of slots) {
            const agentCount = playerSlotToAgents[slot].length ?? 0;
            if (slot < 0 || agentCount === 0) {
                continue;
            }
            const colorHex = world.getSlotColor(slot).toHex().substring(0, 6);
            richText.push(`[color=#${colorHex}]${agentCount}[/color]`);
        }
        if (richText.length === 0) {
            this._detachUI();
            return;
        }

        this._attachUI();
        this._richText?.setText(" " + richText.join("  ") + " ");
    }
}

new CourtCard(refCard);

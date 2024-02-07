import {
    CardHolder,
    GameObject,
    Player,
    Vector,
    refPackageId,
} from "@tabletop-playground/api";
import { SLOT_AND_COLOR } from "setup/setup-player-area/setup-player-area";
import {
    EndTurnButton,
    Find,
    IGlobal,
    TurnOrder,
    TurnOrderWidget,
} from "ttpg-darrell";

export class ArcsTurnOrder implements IGlobal {
    public static readonly SEIZE_INITIATIVE: string = "Seize initiative";
    private static __instance: ArcsTurnOrder | undefined;

    private readonly _turnOrder: TurnOrder;
    private readonly _turnOrderWidget: TurnOrderWidget;
    private readonly _endTurnButton: EndTurnButton;

    static getInstance(): ArcsTurnOrder {
        if (!this.__instance) {
            throw new Error("expected global init to create");
        }
        return this.__instance;
    }

    constructor() {
        ArcsTurnOrder.__instance = this;

        this._turnOrder = new TurnOrder("@arcs/turn-order");
        this._turnOrderWidget = new TurnOrderWidget(this._turnOrder, {
            reserveSlots: 4,
            margins: { left: 2, right: 2 },
            toggleEliminated: true,
            togglePassed: true,
            customActions: [{ name: ArcsTurnOrder.SEIZE_INITIATIVE }],
            onCustomAction: (
                clickingPlayer: Player,
                identifier: string,
                targetPlayerSlot: number
            ) => {
                if (identifier === ArcsTurnOrder.SEIZE_INITIATIVE) {
                    this._seizeInitiative(targetPlayerSlot);
                }
            },
        });
        this._endTurnButton = new EndTurnButton(this._turnOrder, {
            sound: "beep_ramp_up.wav",
            soundPackageId: refPackageId,
        });
    }

    init(): void {
        this._turnOrderWidget.attachToScreen();
        this._endTurnButton.attachToScreen();

        const order: number[] = SLOT_AND_COLOR.map((entry) => entry.slot);
        this._turnOrder.setTurnOrder(order, "forward", order[0]);

        const find = new Find();
        const initiativeMarker: GameObject | undefined = find.findGameObject(
            "token:base/initiative"
        );
        if (initiativeMarker) {
            console.log("arcs-turn-order attaching to initiative marker");
            initiativeMarker.onReleased.add(() => {
                console.log("arcs-turn-order: initiative marker moved");
                const p0: Vector = initiativeMarker.getPosition();

                let closestSlot: number = -1;
                let closestDistanceSq: number = Number.MAX_SAFE_INTEGER;
                for (const slot of order) {
                    const cardHolder: CardHolder | undefined =
                        find.findCardHolder("cardholder:base/trh", slot);
                    if (cardHolder) {
                        const p1: Vector = cardHolder.getPosition();
                        const distanceSq = p1.subtract(p0).magnitudeSquared();
                        if (distanceSq < closestDistanceSq) {
                            closestSlot = slot;
                            closestDistanceSq = distanceSq;
                        }
                    }
                }
                if (closestSlot >= 0) {
                    this._seizeInitiative(closestSlot);
                }
            });
        }
    }

    _seizeInitiative(playerSlot: number): void {
        const order: number[] = this._turnOrder.getTurnOrder();
        const slotIndex: number = order.indexOf(playerSlot);
        if (slotIndex >= 0) {
            const newOrder: number[] = [
                ...order.slice(slotIndex, order.length),
                ...order.slice(0, slotIndex),
            ];
            this._turnOrder.setTurnOrder(newOrder, "forward", newOrder[0]);
        }
    }
}

import { Player, globalEvents, refPackageId } from "@tabletop-playground/api";
import { SLOT_AND_COLOR } from "setup/static/setup-player-area/setup-player-area";
import {
    EndTurnButton,
    HotSeatButton,
    IGlobal,
    TurnOrder,
    TurnOrderWidget,
} from "ttpg-darrell";
import { ArcsScoreWartGenerator } from "./arcs-score-wart";

export class ArcsTurnOrder implements IGlobal {
    private static __instance: ArcsTurnOrder | undefined;

    private readonly _turnOrder: TurnOrder;
    private readonly _turnOrderWidget: TurnOrderWidget;
    private _endTurnButton: EndTurnButton;
    private _hotSeatButton: HotSeatButton;

    private _isHotSeat: boolean = false;

    static getInstance(): ArcsTurnOrder {
        if (!this.__instance) {
            throw new Error("expected global init to create");
        }
        return this.__instance;
    }

    constructor() {
        ArcsTurnOrder.__instance = this;

        const entryHeight: number = 30;
        const entryWidth: number = 200;

        this._turnOrder = new TurnOrder("@arcs/turn-order");
        this._turnOrderWidget = new TurnOrderWidget(this._turnOrder, {
            reserveSlots: 4,
            entryHeight,
            entryWidth,
            nameBox: { width: entryWidth - entryHeight - 10 },
            margins: { left: 2, right: 2 },
            toggleEliminated: true,
            togglePassed: true,
            wartGenerators: [ArcsScoreWartGenerator],
        });
        this._endTurnButton = new EndTurnButton(this._turnOrder, {
            sound: "beep_ramp_up.wav",
            soundPackageId: refPackageId,
        });
        this._hotSeatButton = new HotSeatButton(this._turnOrder, {});
    }

    init(): void {
        this._turnOrderWidget.attachToScreen();
        this._endTurnButton.attachToScreen();

        const order: number[] = SLOT_AND_COLOR.map((entry) => entry.slot);
        this._turnOrder.setTurnOrder(order, "forward", order[0]);

        globalEvents.onChatMessage.add(
            (sender: Player, message: string): void => {
                if (message === "!hotseat") {
                    if (this._isHotSeat) {
                        this._hotSeatButton.detach();
                        this._endTurnButton.attachToScreen();
                        this._isHotSeat = false;
                    } else {
                        this._hotSeatButton.attachToScreen();
                        this._endTurnButton.detach();
                        this._isHotSeat = true;
                    }
                }
            }
        );
    }

    getTurnOrder(): TurnOrder {
        return this._turnOrder;
    }
}

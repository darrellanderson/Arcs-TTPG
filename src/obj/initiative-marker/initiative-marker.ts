import { GameObject, refObject, Vector } from "@tabletop-playground/api";
import { ArcsTurnOrder } from "global/arcs-turn-order/arcs-turn-order";
import { Find } from "ttpg-darrell";

export class InitiativeMarker {
    private readonly _gameObject: GameObject;

    constructor(gameObject: GameObject) {
        this._gameObject = gameObject;
        this._gameObject.onReleased.add(() => {
            this._onReleased();
        });
        this._gameObject.onSnappedToGrid.add(() => {
            this._onReleased();
        });
    }

    _onReleased() {
        console.log("InitiativeMarker._onReleased");

        const turnOrder = ArcsTurnOrder.getInstance().getTurnOrder();
        const order: Array<number> = turnOrder.getTurnOrder();
        const find = new Find();

        const pos: Vector = this._gameObject.getPosition();
        const playerSlot: number = find.closestOwnedCardHolderOwner(pos);

        const slotIndex: number = order.indexOf(playerSlot);
        if (slotIndex >= 0) {
            const newOrder: number[] = [
                ...order.slice(slotIndex, order.length),
                ...order.slice(0, slotIndex),
            ];
            turnOrder.setTurnOrder(newOrder, "forward", newOrder[0]);
        }
    }
}

new InitiativeMarker(refObject);

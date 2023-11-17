import {
    Card,
    CardHolder,
    MulticastDelegate,
    Player,
} from "@tabletop-playground/api";
import { MockGameObject, MockGameObjectParams } from "./mock-game-object";
import { MockMulticastDelegate } from "./mock-multicast-delegate";

export type MockCardHolderParams = MockGameObjectParams & {};

export class MockCardHolder extends MockGameObject implements CardHolder {
    onInserted: MulticastDelegate<
        (
            holder: this,
            insertedCard: Card,
            player: Player,
            index: number
        ) => void
    > = new MockMulticastDelegate<
        (
            holder: this,
            insertedCard: Card,
            player: Player,
            index: number
        ) => void
    >();
    onRemoved: MulticastDelegate<
        (holder: this, card: Card, player: Player) => void
    > = new MockMulticastDelegate<
        (holder: this, card: Card, player: Player) => void
    >();
    onCardFlipped: MulticastDelegate<
        (holder: this, card: Card, player: Player) => void
    > = new MockMulticastDelegate<
        (holder: this, card: Card, player: Player) => void
    >();
    onCardRotated: MulticastDelegate<
        (holder: this, card: Card, player: Player) => void
    > = new MockMulticastDelegate<
        (holder: this, card: Card, player: Player) => void
    >();
    onBecameHand: MulticastDelegate<(holder: this, player: Player) => void> =
        new MockMulticastDelegate<(holder: this, player: Player) => void>();

    constructor(params?: MockCardHolderParams) {
        super(params);
    }

    setOnlyOwnerTakesCards(onlyOwner: boolean): void {
        throw new Error("Method not implemented.");
    }
    setHiddenCardsType(newType: number): void {
        throw new Error("Method not implemented.");
    }
    rotateCard(card: Card): void {
        throw new Error("Method not implemented.");
    }
    removeAt(index: number): Card | undefined {
        throw new Error("Method not implemented.");
    }
    moveCard(card: Card, index: number): void {
        throw new Error("Method not implemented.");
    }
    isCardUpsideDown(card: Card): boolean {
        throw new Error("Method not implemented.");
    }
    isCardFaceUp(card: Card): boolean {
        throw new Error("Method not implemented.");
    }
    insert(card: Card, index: number): boolean {
        throw new Error("Method not implemented.");
    }
    holds(card: Card): boolean {
        throw new Error("Method not implemented.");
    }
    getOnlyOwnerTakesCards(): boolean {
        throw new Error("Method not implemented.");
    }
    getNumCards(): number {
        throw new Error("Method not implemented.");
    }
    getHiddenCardsType(): number {
        throw new Error("Method not implemented.");
    }
    getCards(): Card[] {
        throw new Error("Method not implemented.");
    }
    flipCard(card: Card): void {
        throw new Error("Method not implemented.");
    }
}

export { MockCardHolder as CardHolder };

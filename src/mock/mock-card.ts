import {
    Card,
    CardDetails,
    CardHolder,
    MulticastDelegate,
    Player,
} from "@tabletop-playground/api";
import { MockGameObject, MockGameObjectParams } from "./mock-game-object";
import { MockMulticastDelegate } from "./mock-multicast-delegate";

export type MockCardParams = MockGameObjectParams & {
    cardDetails?: CardDetails[];
};

export class MockCard extends MockGameObject implements Card {
    private readonly _cardDetails: CardDetails[] = [];

    constructor(params?: MockCardParams) {
        super(params);
        if (params?.cardDetails) {
            this._cardDetails.push(...params.cardDetails);
        }
    }

    onInserted: MulticastDelegate<
        (
            card: this,
            insertedCard: Card,
            position: number,
            player: Player | undefined
        ) => void
    > = new MockMulticastDelegate<
        (
            card: this,
            insertedCard: Card,
            position: number,
            player: Player | undefined
        ) => void
    >();
    onRemoved: MulticastDelegate<
        (
            card: this,
            removedCard: Card,
            position: number,
            player: Player
        ) => void
    > = new MockMulticastDelegate<
        (
            card: this,
            removedCard: Card,
            position: number,
            player: Player
        ) => void
    >();

    takeCards(
        numCards?: number | undefined,
        fromFront?: boolean | undefined,
        offset?: number | undefined,
        keep?: boolean | undefined
    ): Card | undefined {
        throw new Error("Method not implemented.");
    }
    split(numStacks: number): Card[] {
        throw new Error("Method not implemented.");
    }
    shuffle(): void {
        throw new Error("Method not implemented.");
    }
    setTextureOverrideURLAt(url: string, index?: number | undefined): void {
        throw new Error("Method not implemented.");
    }
    setTextureOverrideURL(url: string): void {
        throw new Error("Method not implemented.");
    }
    setInheritScript(inherit: boolean): void {
        throw new Error("Method not implemented.");
    }
    setCardIndexAt(cardIndex: number, index?: number | undefined): void {
        throw new Error("Method not implemented.");
    }
    removeFromHolder(): void {
        throw new Error("Method not implemented.");
    }
    moveCardInStack(from: number, to: number): void {
        throw new Error("Method not implemented.");
    }
    isInHolder(): boolean {
        throw new Error("Method not implemented.");
    }
    isInHand(): boolean {
        throw new Error("Method not implemented.");
    }
    isFaceUp(): boolean {
        throw new Error("Method not implemented.");
    }
    getStackSize(): number {
        return this._cardDetails.length;
    }
    getHolder(): CardHolder | undefined {
        throw new Error("Method not implemented.");
    }
    getCardDetails(index: number): CardDetails | undefined;
    getCardDetails(): CardDetails;
    getCardDetails(index?: unknown): CardDetails | undefined {
        if (typeof index === "number") {
            return this._cardDetails[index];
        }
        return this._cardDetails[0];
    }
    getAllCardDetails(): CardDetails[] {
        return this._cardDetails;
    }
    divide(numCards: number): Card[] {
        throw new Error("Method not implemented.");
    }
    deal(
        count?: number | undefined,
        slots?: number[] | undefined,
        faceDown?: boolean | undefined,
        dealToAllHolders?: boolean | undefined
    ): void {
        throw new Error("Method not implemented.");
    }
    canAddCards(cards: Card): boolean {
        throw new Error("Method not implemented.");
    }
    addCards(
        cards: Card,
        toFront?: boolean | undefined,
        offset?: number | undefined,
        animate?: boolean | undefined,
        flipped?: boolean | undefined
    ): boolean {
        throw new Error("Method not implemented.");
    }
}

export { MockCard as Card };

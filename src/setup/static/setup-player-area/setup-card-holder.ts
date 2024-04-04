import {
    CardHolder,
    HiddenCardsType,
    ObjectType,
} from "@tabletop-playground/api";
import {
    AbstractSetup,
    AbstractSetupParams,
    LayoutObjects,
    Spawn,
} from "ttpg-darrell";

export class SetupCardHolder extends AbstractSetup {
    private readonly _cardHolder: CardHolder;

    constructor(params: AbstractSetupParams) {
        super(params);
        this._cardHolder = Spawn.spawnOrThrow(
            "cardholder:base/trh",
            [0, 0, 0]
        ) as CardHolder;
    }

    getLayoutObjects(): LayoutObjects {
        const layoutObjects = new LayoutObjects().add(this._cardHolder);
        layoutObjects.afterLayout.add(() => {
            this._afterLayout();
        });
        return layoutObjects;
    }

    _afterLayout(): void {
        const playerSlot: number = this.getPlayerSlot();

        this._cardHolder.setHiddenCardsType(HiddenCardsType.Back);
        this._cardHolder.setObjectType(ObjectType.Ground);
        this._cardHolder.setOwningPlayerSlot(playerSlot);
        // Card holder gets color from owning slot, do not set primary color
    }
}

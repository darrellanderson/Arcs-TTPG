import {
    AbstractGlobal,
    GarbageContainer,
    SimpleCardGarbageHandler,
} from "ttpg-darrell";

export class RecycleCardAction
    extends SimpleCardGarbageHandler
    implements AbstractGlobal
{
    constructor() {
        super();
        this.setCardNsidPrefix("card.action")
            .setMatNsid("board:base/map")
            .setMatSnapPointTag("card.action.discard")
            .setShuffleAfterDiscard(true);
    }

    init() {
        GarbageContainer.addHandler(this);
    }
}

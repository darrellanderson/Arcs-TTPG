import {
    AbstractGlobal,
    GarbageContainer,
    SimpleCardGarbageHandler,
} from "ttpg-darrell";

export class RecycleCardAction
    extends SimpleCardGarbageHandler
    implements AbstractGlobal
{
    init() {
        this.setCardNsidPrefix("card.action")
            .setMatNsid("board:base/map")
            .setMatSnapPointTag("card.action.discard")
            .setShuffleAfterDiscard(true);
        GarbageContainer.addHandler(this);
    }
}

import {
    GarbageContainer,
    IGlobal,
    SimpleCardGarbageHandler,
} from "ttpg-darrell";

export class RecycleCardAction
    extends SimpleCardGarbageHandler
    implements IGlobal
{
    init() {
        this.setCardNsidPrefix("card.action")
            .setSnapPointTag("card.action.discard")
            .setShuffleAfterDiscard(false);
        GarbageContainer.addHandler(this);
    }
}

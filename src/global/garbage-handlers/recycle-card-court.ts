import {
    AbstractGlobal,
    GarbageContainer,
    SimpleCardGarbageHandler,
} from "ttpg-darrell";

export class RecycleCardCourt
    extends SimpleCardGarbageHandler
    implements AbstractGlobal
{
    init() {
        this.setCardNsidPrefix("card.court")
            .setMatNsid("mat:base/court")
            .setMatSnapPointTag("card.court.discard");
        GarbageContainer.addHandler(this);
    }
}

import {
    AbstractGlobal,
    GarbageContainer,
    SimpleCardGarbageHandler,
} from "ttpg-darrell";

export class RecycleCardCourt
    extends SimpleCardGarbageHandler
    implements AbstractGlobal
{
    constructor() {
        super();
        this.setCardNsidPrefix("card.court")
            .setMatNsid("mat:base/court")
            .setMatSnapPointTag("card.court.discard");
    }

    init() {
        GarbageContainer.addHandler(this);
    }
}

import {
    GarbageContainer,
    IGlobal,
    SimpleCardGarbageHandler,
} from "ttpg-darrell";

export class RecycleCardCourt
    extends SimpleCardGarbageHandler
    implements IGlobal
{
    init() {
        this.setCardNsidPrefix("card.court")
            .setSnapPointTag("card.court.discard")
            .setFaceUp(true);
        GarbageContainer.addHandler(this);
    }
}

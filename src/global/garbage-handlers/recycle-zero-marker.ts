import {
    AbstractGlobal,
    GarbageContainer,
    GarbageHandler,
    SimpleToSnapPointHandler,
} from "ttpg-darrell";

export class RecycleZeroMarker
    extends SimpleToSnapPointHandler
    implements GarbageHandler, AbstractGlobal
{
    init(): void {
        this.addRecycleObjectNsid("token:base/zero-marker")
            .setMatNsid("board:base/map")
            .setSnapPointTag("zero-marker");
        GarbageContainer.addHandler(this);
    }
}

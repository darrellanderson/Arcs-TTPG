import {
    IGlobal,
    GarbageContainer,
    GarbageHandler,
    SimpleToSnapPointHandler,
} from "ttpg-darrell";

export class RecycleZeroMarker
    extends SimpleToSnapPointHandler
    implements GarbageHandler, IGlobal
{
    init(): void {
        this.addRecycleObjectNsid("token:base/zero-marker").setSnapPointTag(
            "zero-marker"
        );
        GarbageContainer.addHandler(this);
    }
}

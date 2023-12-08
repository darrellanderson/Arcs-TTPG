import { Dice, GameObject, SnapPoint, world } from "@tabletop-playground/api";
import {
    AbstractGlobal,
    GarbageContainer,
    GarbageHandler,
    NSID,
} from "ttpg-darrell";

export class RecycleZeroMarker implements GarbageHandler, AbstractGlobal {
    private _snapPoint: SnapPoint | undefined;

    init(): void {
        GarbageContainer.addHandler(this);
    }

    canRecycle(obj: GameObject): boolean {
        const nsid = NSID.get(obj);
        if (nsid !== "token:base/zero-marker") {
            return false;
        }

        const snapPoint = this._getSnapPoint();
        if (!snapPoint) {
            return false;
        }

        return true;
    }

    recycle(obj: GameObject): boolean {
        const snapPoint = this._getSnapPoint();
        if (!snapPoint) {
            return false;
        }
        const above = snapPoint.getGlobalPosition().add([0, 0, 10]);
        obj.setPosition(above);
        obj.snapToGround();
        obj.snap(1); // apply rotation
        return true;
    }

    _getSnapPoint(): SnapPoint | undefined {
        if (this._snapPoint && this._snapPoint.getParentObject()?.isValid()) {
            return this._snapPoint;
        }

        const skipContained = true;
        for (const obj of world.getAllObjects(skipContained)) {
            const nsid = NSID.get(obj);
            if (nsid !== "board:base/map") {
                continue;
            }
            for (const snapPoint of obj.getAllSnapPoints()) {
                if (snapPoint.getTags().includes("zero-marker")) {
                    this._snapPoint = snapPoint;
                    return snapPoint;
                }
            }
        }
        return undefined;
    }
}

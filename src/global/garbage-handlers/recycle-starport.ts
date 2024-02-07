import { GameObject, world } from "@tabletop-playground/api";
import {
    GarbageContainer,
    GarbageHandler,
    IGlobal,
    NSID,
    SimpleToContainerHandler,
} from "ttpg-darrell";

export class RecycleStarportContainer
    extends SimpleToContainerHandler
    implements GarbageHandler, IGlobal
{
    init(): void {
        this.addRecycleObjectNsid("token:base/starport")
            .setContainerNsid("container:base/starport")
            .setRequireOwningPlayerSlot(true);
        GarbageContainer.addHandler(this);
    }
}

export class RecycleStarportMat implements GarbageHandler, IGlobal {
    private _playerSlotToMat: { [key: number]: GameObject } = {};

    init(): void {
        GarbageContainer.addHandler(this);
    }

    canRecycle(obj: GameObject): boolean {
        const nsid = NSID.get(obj);
        if (nsid !== "token:base/starport") {
            return false;
        }

        const playerSlot = obj.getOwningPlayerSlot();
        if (playerSlot < 0) {
            return false;
        }

        const mat = this._getMat(playerSlot);
        if (!mat) {
            return false;
        }

        return true;
    }

    recycle(obj: GameObject): boolean {
        const playerSlot = obj.getOwningPlayerSlot();

        const mat = this._getMat(playerSlot);
        if (!mat) {
            return false;
        }

        obj.setRotation(mat.getRotation());

        for (const snapPoint of mat.getAllSnapPoints()) {
            // Check snap both directions in case of overlapping ranges.
            const snappedObject: GameObject | undefined =
                snapPoint.getSnappedObject();
            if (snappedObject?.getSnappedToPoint() === snapPoint) {
                continue; // occupied
            }
            const above = snapPoint.getGlobalPosition().add([0, 0, 10]);
            obj.setPosition(above);
            obj.snapToGround();
            obj.snap(1); // apply snap point rotation
            return true;
        }
        return false;
    }

    _getMat(playerSlot: number): GameObject | undefined {
        const cached = this._playerSlotToMat[playerSlot];
        if (cached && cached.isValid()) {
            return cached;
        }

        const skipContained = true;
        for (const obj of world.getAllObjects(skipContained)) {
            const nsid = NSID.get(obj);
            if (nsid !== "mat:base/building") {
                continue;
            }
            const matSlot = obj.getOwningPlayerSlot();
            if (matSlot !== playerSlot) {
                continue;
            }
            this._playerSlotToMat[playerSlot] = obj;
            return obj;
        }
        return undefined;
    }
}

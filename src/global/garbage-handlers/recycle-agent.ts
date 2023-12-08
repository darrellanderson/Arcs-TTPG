import { Dice, GameObject, world } from "@tabletop-playground/api";
import {
    AbstractGlobal,
    GarbageContainer,
    GarbageHandler,
    NSID,
} from "ttpg-darrell";

export class RecycleAgent implements GarbageHandler, AbstractGlobal {
    private _playerSlotToMat: { [key: number]: GameObject } = {};

    init(): void {
        GarbageContainer.addHandler(this);
    }

    canRecycle(obj: GameObject): boolean {
        const nsid = NSID.get(obj);
        if (nsid !== "unit:base/agent") {
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
            obj.snap(); // apply snap point rotation
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
            if (nsid !== "mat:base/agent") {
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

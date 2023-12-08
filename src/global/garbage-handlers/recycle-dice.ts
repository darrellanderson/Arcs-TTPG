import { Dice, GameObject, world } from "@tabletop-playground/api";
import {
    AbstractGlobal,
    GarbageContainer,
    GarbageHandler,
    NSID,
} from "ttpg-darrell";

export class RecycleDice implements GarbageHandler, AbstractGlobal {
    private static NSID_TO_SNAP_POINT_TAG: { [key: string]: string } = {
        "dice:base/assault": "die.assault",
        "dice:base/raid": "die.raid",
        "dice:base/skirmish": "die.skirmish",
    };

    private _mat: GameObject | undefined;

    init(): void {
        GarbageContainer.addHandler(this);
    }

    canRecycle(obj: GameObject): boolean {
        if (!(obj instanceof Dice)) {
            return false;
        }

        const nsid = NSID.get(obj);
        const snapPointTag = RecycleDice.NSID_TO_SNAP_POINT_TAG[nsid];
        if (!snapPointTag) {
            return false;
        }

        const mat = this._getMat();
        if (!mat) {
            return false;
        }

        return true;
    }

    recycle(obj: GameObject): boolean {
        const nsid = NSID.get(obj);
        const snapPointTag = RecycleDice.NSID_TO_SNAP_POINT_TAG[nsid];

        const mat = this._getMat();
        if (!mat) {
            return false;
        }
        const snapPoints = mat
            .getAllSnapPoints()
            .filter((p) => p.getTags().includes(snapPointTag));
        if (snapPoints.length !== 6) {
            throw new Error("bad snap point count");
        }

        obj.setRotation(mat.getRotation());
        const die: Dice = obj as Dice;
        die.setCurrentFace(1);

        for (const snapPoint of snapPoints) {
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

    _getMat(): GameObject | undefined {
        if (this._mat && this._mat.isValid()) {
            return this._mat;
        }

        const skipContained = true;
        for (const obj of world.getAllObjects(skipContained)) {
            const nsid = NSID.get(obj);
            if (nsid === "mat:base/dice") {
                this._mat = obj;
                return obj;
            }
        }
        return undefined;
    }
}

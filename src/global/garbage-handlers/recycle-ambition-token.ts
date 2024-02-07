import { GameObject, world } from "@tabletop-playground/api";
import { GarbageContainer, GarbageHandler, IGlobal, NSID } from "ttpg-darrell";

export class RecycleAmbitionToken implements GarbageHandler, IGlobal {
    private static TOKEN_NSIDS = [
        "token.ambition:base/2-0-4-2",
        "token.ambition:base/3-2-6-3",
        "token.ambition:base/5-3-9-4",
    ];

    private _mat: GameObject | undefined;

    init(): void {
        GarbageContainer.addHandler(this);
    }

    canRecycle(obj: GameObject): boolean {
        const nsid = NSID.get(obj);
        const tokenIndex = RecycleAmbitionToken.TOKEN_NSIDS.indexOf(nsid);
        if (tokenIndex < 0) {
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
        const tokenIndex = RecycleAmbitionToken.TOKEN_NSIDS.indexOf(nsid);
        if (tokenIndex < 0) {
            return false;
        }

        const mat = this._getMat();
        if (!mat) {
            return false;
        }

        const snapPoints = mat
            .getAllSnapPoints()
            .filter((p) => p.getTags().includes("ambition-marker"));
        if (snapPoints.length !== 3) {
            throw new Error("snap point count");
        }
        const snapPoint = snapPoints[tokenIndex];

        const above = snapPoint.getGlobalPosition().add([0, 0, 10]);
        obj.setPosition(above);
        obj.snapToGround();
        obj.snap(1); // apply snap point rotation

        return true;
    }

    _getMat(): GameObject | undefined {
        if (this._mat && this._mat.isValid()) {
            return this._mat;
        }

        const skipContained = true;
        for (const obj of world.getAllObjects(skipContained)) {
            const nsid = NSID.get(obj);
            if (nsid === "board:base/map") {
                this._mat = obj;
                return obj;
            }
        }
        return undefined;
    }
}

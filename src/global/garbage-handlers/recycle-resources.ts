import { Card, Dice, GameObject, world } from "@tabletop-playground/api";
import {
    AbstractGlobal,
    GarbageContainer,
    GarbageHandler,
    NSID,
} from "ttpg-darrell";

export class RecycleResources implements GarbageHandler, AbstractGlobal {
    private static NSID_TO_SNAP_POINT_TAG: { [key: string]: string } = {
        "token.resource:base/material": "resource.material",
        "token.resource:base/fuel": "resource.fuel",
        "token.resource:base/weapons": "resource.weapons",
        "token.resource:base/relics": "resource.relics",
        "token.resource:base/psionic": "resource.psionic",
    };

    private _mat: GameObject | undefined;

    init(): void {
        GarbageContainer.addHandler(this);
    }

    canRecycle(obj: GameObject): boolean {
        if (!(obj instanceof Card)) {
            return false;
        }

        const nsid = NSID.get(obj);
        const snapPointTag = RecycleResources.NSID_TO_SNAP_POINT_TAG[nsid];
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
        const snapPointTag = RecycleResources.NSID_TO_SNAP_POINT_TAG[nsid];

        const mat = this._getMat();
        if (!mat) {
            return false;
        }

        const snapPoints = mat
            .getAllSnapPoints()
            .filter((p) => p.getTags().includes(snapPointTag));
        if (snapPoints.length !== 1) {
            throw new Error("snap point count");
        }
        const snapPoint = snapPoints[0];

        const deck = snapPoint.getSnappedObject() as Card | undefined;
        if (deck) {
            const card = obj as Card;
            deck.addCards(card);
        } else {
            const above = snapPoint.getGlobalPosition().add([0, 0, 10]);
            obj.setPosition(above);
            obj.snapToGround();
            obj.snap(); // apply snap point rotation
        }
        return true;
    }

    _getMat(): GameObject | undefined {
        if (this._mat && this._mat.isValid()) {
            return this._mat;
        }

        const skipContained = true;
        for (const obj of world.getAllObjects(skipContained)) {
            const nsid = NSID.get(obj);
            if (nsid === "mat:base/resource") {
                this._mat = obj;
                return obj;
            }
        }
        return undefined;
    }
}

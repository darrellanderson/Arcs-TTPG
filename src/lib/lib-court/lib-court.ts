import { Card, GameObject, Vector, world } from "@tabletop-playground/api";
import { NSID } from "ttpg-darrell";

export class LibCourt {
    private static _cachedCourtMat: GameObject | undefined;

    static getCourtMat(): GameObject | undefined {
        if (LibCourt._cachedCourtMat && LibCourt._cachedCourtMat.isValid()) {
            return LibCourt._cachedCourtMat;
        }

        const skipContained = true;
        for (const obj of world.getAllObjects(skipContained)) {
            const nsid = NSID.get(obj);
            if (nsid !== "mat:base/court") {
                continue;
            }
            LibCourt._cachedCourtMat = obj;
            return obj;
        }
    }

    static getFaceUpCourtCardsOnMat(mat: GameObject): Card[] {
        const courtCardsOnMat: Card[] = [];

        // Extrude the mat extent for the overlap box.
        const currentRotation = false;
        const includeGeometry = false;
        const boxExtent: Vector = mat.getExtent(
            currentRotation,
            includeGeometry
        );
        boxExtent.z = 3;
        const boxPos = mat.getPosition();
        const boxRot = mat.getRotation();
        //world.drawDebugBox(boxPos, boxExtent, boxRot, [1, 0, 0, 1], 3);
        for (const obj of world.boxOverlap(boxPos, boxExtent, boxRot)) {
            if (!(obj instanceof Card)) {
                continue;
            }
            if (obj.getStackSize() > 1) {
                continue; // ignore decks
            }
            if (!obj.isFaceUp()) {
                continue; // ignore face-down cards
            }
            const nsid = NSID.get(obj);
            if (!nsid.startsWith("card.court")) {
                continue;
            }
            if (obj.isHeld()) {
                continue; // held by a player
            }
            courtCardsOnMat.push(obj);
        }

        return courtCardsOnMat;
    }
}

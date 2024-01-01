import {
    Card,
    GameObject,
    ObjectType,
    SnapPoint,
    refPackageId,
} from "@tabletop-playground/api";
import { AbstractSetup, LayoutObjects, Spawn } from "ttpg-darrell";

const packageId: string = refPackageId;

export class SetupCourt extends AbstractSetup {
    private readonly _mat: GameObject;

    constructor() {
        super();
        this._mat = Spawn.spawnOrThrow("mat:base/court", [0, 0, 0]);
    }

    getLayoutObjects(): LayoutObjects {
        const layoutObjects = new LayoutObjects().add(this._mat);
        layoutObjects.afterLayout.add(() => {
            this._afterLayout();
        });
        return layoutObjects;
    }

    _afterLayout(): void {
        this._mat.setObjectType(ObjectType.Ground);

        const snapPoints: SnapPoint[] = this._mat
            .getAllSnapPoints()
            .filter((p) => p.getTags().includes("card.court.deck"));
        if (snapPoints.length !== 1) {
            throw new Error(`bad snap point count (${snapPoints.length})`);
        }
        const snapPoint = snapPoints[0];
        const above = snapPoint.getGlobalPosition().add([0, 0, 10]);
        const deck = Spawn.spawnOrThrow("card.court:base/*", above) as Card;
        deck.snapToGround(); // move within snap range
        deck.snap(); // apply snap point rotation

        deck.setScript("obj/card/court-card.js", packageId);
        deck.setInheritScript(true);
    }
}

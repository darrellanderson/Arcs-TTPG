import {
    Card,
    GameObject,
    HorizontalAlignment,
    ObjectType,
    SnapPoint,
    refPackageId,
} from "@tabletop-playground/api";
import { SPACING } from "setup/static/setup-config";
import { SetupGarbage } from "setup/static/setup-garbage/setup-garbage";
import { AbstractSetup, LayoutObjects, Spawn } from "ttpg-darrell";

const packageId: string = refPackageId;

export class SetupCourt extends AbstractSetup {
    private readonly _mat: GameObject;
    private readonly _matDeckDiscard: GameObject;
    private readonly _deletedItems: GameObject;

    constructor() {
        super();
        this._mat = Spawn.spawnOrThrow("mat:base/court.vert", [0, 0, 0]);
        this._matDeckDiscard = Spawn.spawnOrThrow(
            "mat:base/court-deck-discard",
            [0, 0, 0]
        );

        this._deletedItems = Spawn.spawnOrThrow(
            "container:base/deleted-items",
            [0, 0, 0]
        );
    }

    getLayoutObjects(): LayoutObjects {
        const boxes = new LayoutObjects()
            .setIsVertical(false)
            .setChildDistance(SPACING)
            .setHorizontalAlignment(HorizontalAlignment.Left)
            .add(new SetupGarbage().getLayoutObjects())
            .add(this._deletedItems);

        const right = new LayoutObjects()
            .setIsVertical(true)
            .setChildDistance(SPACING)
            .setHorizontalAlignment(HorizontalAlignment.Left)
            .add(this._matDeckDiscard)
            .add(boxes);

        const layoutObjects = new LayoutObjects()
            .setIsVertical(false)
            .setChildDistance(SPACING)
            .add(this._mat)
            .add(right);
        layoutObjects.afterLayout.add(() => {
            this._afterLayout();
        });
        return layoutObjects;
    }

    _afterLayout(): void {
        this._mat.setObjectType(ObjectType.Ground);
        this._matDeckDiscard.setObjectType(ObjectType.Ground);
        this._deletedItems.setObjectType(ObjectType.Ground);

        const snapPoints: SnapPoint[] = this._matDeckDiscard
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

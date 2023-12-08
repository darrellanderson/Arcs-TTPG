import { Card, Dice, GameObject, ObjectType } from "@tabletop-playground/api";
import { AbstractSetup, LayoutObjects, Spawn } from "ttpg-darrell";

export class SetupResources extends AbstractSetup {
    public static readonly RESOURCE_COUNT: number = 5;

    private readonly _mat: GameObject;

    constructor() {
        super();
        this._mat = Spawn.spawnOrThrow("mat:base/resource", [0, 0, 0]);
        this._mat.setRotation([0, -90, 0]);
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

        this._setupForResource(
            "token.resource:base/material",
            "resource.material"
        );
        this._setupForResource("token.resource:base/fuel", "resource.fuel");
        this._setupForResource(
            "token.resource:base/weapons",
            "resource.weapons"
        );
        this._setupForResource("token.resource:base/relics", "resource.relics");
        this._setupForResource(
            "token.resource:base/psionic",
            "resource.psionic"
        );
    }

    _setupForResource(nsid: string, snapPointTag: string): void {
        const snapPoints = this._mat
            .getAllSnapPoints()
            .filter((p) => p.getTags().includes(snapPointTag));
        if (snapPoints.length !== 1) {
            throw new Error(`bad snap point count (${snapPoints.length})`);
        }
        const snapPoint = snapPoints[0];

        const above = snapPoint.getGlobalPosition().add([0, 0, 10]);
        const first = Spawn.spawnOrThrow(nsid, above);
        first.snapToGround(); // move within snap range
        first.snap(); // apply snap point rotation

        for (let i = 1; i < SetupResources.RESOURCE_COUNT; i++) {
            const obj = Spawn.spawnOrThrow(nsid, above);
            (first as Card).addCards(obj as Card);
        }
    }
}

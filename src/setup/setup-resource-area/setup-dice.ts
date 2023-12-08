import { Dice, GameObject, ObjectType } from "@tabletop-playground/api";
import { AbstractSetup, LayoutObjects, Spawn } from "ttpg-darrell";

export class SetupDice extends AbstractSetup {
    private readonly _mat: GameObject;

    constructor() {
        super();
        this._mat = Spawn.spawnOrThrow("mat:base/dice", [0, 0, 0]);
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

        let snapPoints = this._mat
            .getAllSnapPoints()
            .filter((p) => p.getTags().includes("die.assault"));
        if (snapPoints.length !== 6) {
            throw new Error(`bad snap point count (${snapPoints.length})`);
        }
        for (const snapPoint of snapPoints) {
            const above = snapPoint.getGlobalPosition().add([0, 0, 10]);
            const obj = Spawn.spawnOrThrow("dice:base/assault", above);
            obj.snapToGround(); // move within snap range
            obj.snap(); // apply snap point rotation

            (obj as Dice).setCurrentFace(1);
        }

        snapPoints = this._mat
            .getAllSnapPoints()
            .filter((p) => p.getTags().includes("die.raid"));
        if (snapPoints.length !== 6) {
            throw new Error(`bad snap point count (${snapPoints.length})`);
        }
        for (const snapPoint of snapPoints) {
            const above = snapPoint.getGlobalPosition().add([0, 0, 10]);
            const obj = Spawn.spawnOrThrow("dice:base/raid", above);
            obj.snapToGround(); // move within snap range
            obj.snap(); // apply snap point rotation

            (obj as Dice).setCurrentFace(1);
        }

        snapPoints = this._mat
            .getAllSnapPoints()
            .filter((p) => p.getTags().includes("die.skirmish"));
        if (snapPoints.length !== 6) {
            throw new Error(`bad snap point count (${snapPoints.length})`);
        }
        for (const snapPoint of snapPoints) {
            const above = snapPoint.getGlobalPosition().add([0, 0, 10]);
            const obj = Spawn.spawnOrThrow("dice:base/skirmish", above);
            obj.snapToGround(); // move within snap range
            obj.snap(); // apply snap point rotation

            (obj as Dice).setCurrentFace(1);
        }
    }
}

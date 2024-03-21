import { Dice, GameObject, ObjectType } from "@tabletop-playground/api";
import { AbstractSetup, LayoutObjects, Spawn } from "ttpg-darrell";

export class SetupDice extends AbstractSetup {
    private readonly _mat: GameObject;

    constructor() {
        super();
        this._mat = Spawn.spawnOrThrow("mat:base/dice", [0, 0, 0]);
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

        const createDice = (
            nsid: string,
            snapPointTag: string,
            face: number
        ) => {
            const snapPoints = this._mat
                .getAllSnapPoints()
                .filter((p) => p.getTags().includes(snapPointTag));
            if (snapPoints.length !== 6) {
                throw new Error(`bad snap point count (${snapPoints.length})`);
            }
            for (const snapPoint of snapPoints) {
                const above = snapPoint.getGlobalPosition().add([0, 0, 10]);
                const dice = Spawn.spawnOrThrow(nsid, above) as Dice;
                dice.setName(""); // use the faces for name
                dice.snapToGround(); // move within snap range
                dice.snap(); // apply snap point rotation

                dice.setCurrentFace(face);

                // Validate die json.
                for (const json of dice.getAllFaceMetadata()) {
                    try {
                        JSON.parse(json);
                    } catch (e) {
                        throw new Error(`bad die json "${json}" (${nsid})`);
                    }
                }
            }
        };

        createDice("dice:base/assault", "die.assault", 1);
        createDice("dice:base/raid", "die.raid", 1);
        createDice("dice:base/skirmish", "die.skirmish", 1);
    }
}

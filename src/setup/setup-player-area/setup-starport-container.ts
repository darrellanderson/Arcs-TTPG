import {
    Color,
    Container,
    GameObject,
    ObjectType,
    Vector,
} from "@tabletop-playground/api";
import {
    AbstractSetup,
    AbstractSetupParams,
    LayoutObjects,
    Spawn,
} from "ttpg-darrell";

export class SetupStarportContainer extends AbstractSetup {
    public static readonly STARPORT_COUNT: number = 5;

    private readonly _container: Container;

    constructor(params: AbstractSetupParams) {
        super(params);
        this._container = Spawn.spawnOrThrow(
            "container:base/starport",
            [0, 0, 0]
        ) as Container;

        this._container.setContainerTags(["building.starport"]);
        this._container.setType(4);
    }

    getLayoutObjects(): LayoutObjects {
        const layoutObjects = new LayoutObjects().add(this._container);
        layoutObjects.afterLayout.add(() => {
            this._afterLayout();
        });
        return layoutObjects;
    }

    _afterLayout(): void {
        const playerSlot: number = this.getPlayerSlot();
        const primaryColor: Color = this.getPrimaryColor();

        this._container.setObjectType(ObjectType.Ground);
        this._container.setOwningPlayerSlot(playerSlot);
        this._container.setPrimaryColor(primaryColor);

        const above: Vector = this._container.getPosition().add([0, 0, 10]);
        for (let i = 0; i < SetupStarportContainer.STARPORT_COUNT; i++) {
            const obj: GameObject = Spawn.spawnOrThrow(
                "token:base/starport",
                above
            );
            obj.setOwningPlayerSlot(playerSlot);
            obj.setPrimaryColor(primaryColor);
            this._container.addObjects([obj]);
        }
    }
}

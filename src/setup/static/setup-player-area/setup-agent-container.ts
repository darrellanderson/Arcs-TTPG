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

export class SetupAgentContainer extends AbstractSetup {
    public static readonly AGENT_COUNT: number = 10;

    private readonly _container: Container;

    constructor(params: AbstractSetupParams) {
        super(params);
        this._container = Spawn.spawnOrThrow(
            "container:base/agent",
            [0, 0, 0]
        ) as Container;

        this._container.setContainerTags(["agent"]);
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
        for (let i = 0; i < SetupAgentContainer.AGENT_COUNT; i++) {
            const obj: GameObject = Spawn.spawnOrThrow(
                "unit:base/agent",
                above
            );
            obj.setOwningPlayerSlot(playerSlot);
            obj.setPrimaryColor(primaryColor);
            this._container.addObjects([obj]);
        }
    }
}
import {
    Border,
    Container,
    Text,
    UIElement,
    UIPresentationStyle,
    Vector,
    refContainer,
} from "@tabletop-playground/api";
import { GarbageContainer } from "ttpg-darrell";

class UnitContainer {
    private readonly _container: Container;
    private readonly _countText: Text;

    constructor(container: Container) {
        const scale = 2;
        const fontSize = 10 * scale;
        const z = 0.8 * scale;

        this._container = container;
        this._countText = new Text().setFontSize(fontSize).setText("#");

        const border = new Border().setChild(this._countText);
        const widget = border;
        const ui = new UIElement();
        ui.position = new Vector(1, -1, z);
        ui.presentationStyle = UIPresentationStyle.ViewAligned;
        ui.scale = 1 / scale;
        ui.widget = widget;
        container.addUI(ui);

        const updateHandler = () => {
            this._update();
        };

        container.onInserted.add(updateHandler);
        container.onRemoved.add(updateHandler);

        // Listen for garbage recycling items.
        GarbageContainer.onRecycled.add(updateHandler);
        container.onDestroyed.add(() => {
            GarbageContainer.onRecycled.remove(updateHandler);
        });

        this._update();
    }

    private _update() {
        const value: string = this._container.getNumItems().toString();
        if (this._countText.getText() !== value) {
            this._countText.setText(value);
        }
    }
}

const container: Container = refContainer;
process.nextTick(() => {
    new UnitContainer(container);
});

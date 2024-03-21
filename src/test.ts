import {
    Border,
    Text,
    UIElement,
    Vector,
    refObject,
} from "@tabletop-playground/api";

const ui = new UIElement();
ui.position = new Vector(0, 0, 1);
ui.useWidgetSize = true;
ui.widget = new Border().setChild(new Text().setText("x"));
refObject.addUI(ui);

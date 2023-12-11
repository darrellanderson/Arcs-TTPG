import {
    HorizontalBox,
    UIElement,
    Vector,
    refObject,
} from "@tabletop-playground/api";
import { D6Widget } from "ttpg-darrell";

const SCALE = 2;

const panel = new HorizontalBox().setChildDistance(10 * SCALE);

for (let i = 0; i < 6; i++) {
    const d6 = new D6Widget()
        .setDiceImage("utility/D6.jpg")
        .setSize(50 * SCALE);
    d6.setFace(i);
    panel.addChild(d6.getWidget());
}

const ui = new UIElement();
ui.position = new Vector(0, 0, 3);
ui.widget = panel;
ui.scale = 1 / SCALE;
refObject.addUI(ui);

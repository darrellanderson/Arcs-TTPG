import {
    PlayerPermission,
    Rotator,
    UIElement,
    UIPresentationStyle,
    UIZoomVisibility,
    Vector,
    Widget,
} from "@tabletop-playground/api";
import { MockVector } from "./mock-vector";
import { MockRotator } from "./mock-rotator";
import { MockPlayerPermission } from "./mock-player-permission";
import { MockWidget } from "./mock-widget";

export class MockUIElement implements UIElement {
    widget: Widget = new MockWidget();
    position: Vector = new MockVector(0, 0, 0);
    rotation: Rotator = new MockRotator(0, 0, 0);
    scale: number = 1;
    useWidgetSize: boolean = false;
    width: number = 160;
    height: number = 90;
    useTransparency: boolean = false;
    anchorX: number = 0.5;
    anchorY: number = 0.5;
    presentationStyle: number = 0; // UIPresentationStyle.Regular
    twoSided: boolean = false;
    players: PlayerPermission = new MockPlayerPermission();
    zoomVisibility: number = 0; // UIZoomVisibility.Regular

    constructor() {}

    clone(): UIElement {
        const clone = new MockUIElement();
        clone.widget = this.widget;
        clone.position = this.position.clone();
        clone.rotation = this.rotation.clone();
        clone.scale = this.scale;
        clone.useWidgetSize = this.useWidgetSize;
        clone.width = this.width;
        clone.height = this.height;
        clone.useTransparency = this.useTransparency;
        clone.presentationStyle = this.presentationStyle;
        clone.twoSided = this.twoSided;
        clone.players = this.players.clone();
        clone.zoomVisibility = this.zoomVisibility;
        return clone;
    }
}

export { MockUIElement as UIElement };

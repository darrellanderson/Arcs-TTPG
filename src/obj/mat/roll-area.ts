/**
 * Show values of all dice in the area (rerolls can be common, showing just
 * roll results does not reflect the overall state).
 */

import {
    GameObject,
    ScreenUIElement,
    Zone,
    refObject,
} from "@tabletop-playground/api";

export class RollArea {
    private readonly _obj: GameObject;
    private readonly _ui: ScreenUIElement;
    private readonly _zone: Zone;

    constructor(gameObject: GameObject) {
        if (!gameObject) {
            throw new Error("missing game object");
        }

        this._obj = gameObject;
        this._ui = new ScreenUIElement();
        this._zone = new Zone();

        gameObject.onReleased;
    }
}

const obj = refObject; // refObject gets cleared end of frame
process.nextTick(() => {
    new RollArea(obj);
});

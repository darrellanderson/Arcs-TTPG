import { Color } from "@tabletop-playground/api";
import { LayoutObjects } from "ttpg-darrell";

export abstract class AbstractSetup {
    private _playerSlot: number = -1;
    private _primaryColor: Color = new Color(1, 1, 1, 1);

    // --------------------------------

    setPlayerSlot(playerSlot: number): this {
        this._playerSlot = playerSlot;
        return this;
    }

    setPrimaryColor(color: Color): this {
        this._primaryColor = color;
        return this;
    }

    // --------------------------------

    getPlayerSlot(): number {
        return this._playerSlot;
    }

    getPrimaryColor(): Color {
        return this._primaryColor;
    }

    abstract getLayoutObjects(): LayoutObjects;
}

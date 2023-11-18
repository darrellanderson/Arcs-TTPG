import {
    Color,
    DrawingLine,
    PlayerPermission,
    Vector,
} from "@tabletop-playground/api";
import { MockColor } from "./mock-color";
import { MockPlayerPermission } from "./mock-player-permission";

export class MockDrawingLine implements DrawingLine {
    points: Vector[] = [];
    color: Color = new MockColor(1, 1, 1, 1);
    thickness: number = 0.5;
    rounded: boolean = true;
    normals: Vector[] = [];
    tag: string = "";
    emissiveStrength: number = 0;
    players: PlayerPermission = new MockPlayerPermission();

    clone(): DrawingLine {
        const clone = new MockDrawingLine();
        clone.points = this.points.map((x) => x.clone());
        clone.color = this.color.clone();
        clone.thickness = this.thickness;
        clone.rounded = this.rounded;
        clone.normals = this.normals.map((x) => x.clone());
        clone.tag = this.tag;
        clone.emissiveStrength = this.emissiveStrength;
        clone.players = this.players.clone();
        return clone;
    }
}

export { MockDrawingLine as DrawingLine };

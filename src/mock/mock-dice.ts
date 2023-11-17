import { Dice, Player, Vector } from "@tabletop-playground/api";
import { MockGameObject } from "./mock-game-object";

export class MockDice extends MockGameObject implements Dice {
    setCurrentFace(index: number): void {
        throw new Error("Method not implemented.");
    }
    roll(player?: Player | undefined): void {
        throw new Error("Method not implemented.");
    }
    getNumFaces(): number {
        throw new Error("Method not implemented.");
    }
    getFaceDirections(): Vector[] {
        throw new Error("Method not implemented.");
    }
    getCurrentFaceName(): string {
        throw new Error("Method not implemented.");
    }
    getCurrentFaceMetadata(): string {
        throw new Error("Method not implemented.");
    }
    getCurrentFaceIndex(): number {
        throw new Error("Method not implemented.");
    }
    getAllFaceNames(): string[] {
        throw new Error("Method not implemented.");
    }
    getAllFaceMetadata(): string[] {
        throw new Error("Method not implemented.");
    }
}

export { MockDice as Dice };

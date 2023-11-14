import { Color, GlobalGrid } from "@tabletop-playground/api";

export class MockGlobalGrid implements GlobalGrid {
    setWidth(width: number): void {
        throw new Error("Method not implemented.");
    }
    setVisibility(visibility: number): void {
        throw new Error("Method not implemented.");
    }
    setVerticalOffset(offset: number): void {
        throw new Error("Method not implemented.");
    }
    setType(type: number): void {
        throw new Error("Method not implemented.");
    }
    setThickLines(thick: boolean): void {
        throw new Error("Method not implemented.");
    }
    setSnapType(type: number): void {
        throw new Error("Method not implemented.");
    }
    setRotation(rotation: number): void {
        throw new Error("Method not implemented.");
    }
    setHorizontalOffset(offset: number): void {
        throw new Error("Method not implemented.");
    }
    setHeight(height: number): void {
        throw new Error("Method not implemented.");
    }
    setColor(
        color: Color | [r: number, g: number, b: number, a: number]
    ): void {
        throw new Error("Method not implemented.");
    }
    hasThickLines(): boolean {
        throw new Error("Method not implemented.");
    }
    getWidth(): number {
        throw new Error("Method not implemented.");
    }
    getVisibility(): number {
        throw new Error("Method not implemented.");
    }
    getVerticalOffset(): number {
        throw new Error("Method not implemented.");
    }
    getType(): number {
        throw new Error("Method not implemented.");
    }
    getSnapType(): number {
        throw new Error("Method not implemented.");
    }
    getRotation(): number {
        throw new Error("Method not implemented.");
    }
    getHorizontalOffset(): number {
        throw new Error("Method not implemented.");
    }
    getHeight(): number {
        throw new Error("Method not implemented.");
    }
    getColor(): Color {
        throw new Error("Method not implemented.");
    }
}

export { MockGlobalGrid as GlobalGrid };

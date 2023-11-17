import {
    Card,
    CardHolder,
    Color,
    GameObject,
    Player,
    Rotator,
    Vector,
} from "@tabletop-playground/api";

export class MockPlayer implements Player {
    switchSlot(newSlot: number): boolean {
        throw new Error("Method not implemented.");
    }
    showMessage(message: string): void {
        throw new Error("Method not implemented.");
    }
    setSelectedObjects(objects: GameObject[]): void {
        throw new Error("Method not implemented.");
    }
    setSecondaryColor(
        newColor: Color | [r: number, g: number, b: number, a: number]
    ): void {
        throw new Error("Method not implemented.");
    }
    setPrimaryColor(
        newColor: Color | [r: number, g: number, b: number, a: number]
    ): void {
        throw new Error("Method not implemented.");
    }
    setPositionAndRotation(
        position: Vector | [x: number, y: number, z: number],
        rotation: Rotator | [pitch: number, yaw: number, roll: number]
    ): void {
        throw new Error("Method not implemented.");
    }
    setHandHolder(hand: CardHolder): void {
        throw new Error("Method not implemented.");
    }
    setDrawingThickness(thickness: number): void {
        throw new Error("Method not implemented.");
    }
    setDrawingGlow(glow: boolean): void {
        throw new Error("Method not implemented.");
    }
    setDrawingColor(
        color: Color | [r: number, g: number, b: number, a: number]
    ): void {
        throw new Error("Method not implemented.");
    }
    setBlindfolded(on: boolean): void {
        throw new Error("Method not implemented.");
    }
    sendChatMessage(
        message: string,
        color: Color | [r: number, g: number, b: number, a: number]
    ): void {
        throw new Error("Method not implemented.");
    }
    isValid(): boolean {
        throw new Error("Method not implemented.");
    }
    isUsingVR(): boolean {
        throw new Error("Method not implemented.");
    }
    isSpectator(): boolean {
        throw new Error("Method not implemented.");
    }
    isScriptKeyDown(index: number): boolean {
        throw new Error("Method not implemented.");
    }
    isHost(): boolean {
        throw new Error("Method not implemented.");
    }
    isHoldingObject(object: GameObject): boolean {
        throw new Error("Method not implemented.");
    }
    isHolding(): boolean {
        throw new Error("Method not implemented.");
    }
    isGameMaster(): boolean {
        throw new Error("Method not implemented.");
    }
    isBlindfolded(): boolean {
        throw new Error("Method not implemented.");
    }
    getTeam(): number {
        throw new Error("Method not implemented.");
    }
    getSlot(): number {
        throw new Error("Method not implemented.");
    }
    getSelectedObjects(): GameObject[] {
        throw new Error("Method not implemented.");
    }
    getSecondaryColor(): Color {
        throw new Error("Method not implemented.");
    }
    getRotation(): Rotator {
        throw new Error("Method not implemented.");
    }
    getPrimaryColor(): Color {
        throw new Error("Method not implemented.");
    }
    getPosition(): Vector {
        throw new Error("Method not implemented.");
    }
    getPlayerColor(): Color {
        throw new Error("Method not implemented.");
    }
    getOwnedObjects(): GameObject[] {
        throw new Error("Method not implemented.");
    }
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getHighlightedObject(): GameObject | undefined {
        throw new Error("Method not implemented.");
    }
    getHeldObjects(): GameObject[] {
        throw new Error("Method not implemented.");
    }
    getHandHolder(): CardHolder | undefined {
        throw new Error("Method not implemented.");
    }
    getHandCards(): Card[] {
        throw new Error("Method not implemented.");
    }
    getCursorVelocity(): Vector {
        throw new Error("Method not implemented.");
    }
    getCursorPosition(): Vector {
        throw new Error("Method not implemented.");
    }
}

export { MockPlayer as Player };

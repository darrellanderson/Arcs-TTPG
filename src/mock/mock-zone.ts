import {
    Color,
    GameObject,
    MulticastDelegate,
    Rotator,
    Vector,
    Zone,
} from "@tabletop-playground/api";
import { MockMulticastDelegate } from "./mock-multicast-delegate";

export class MockZone implements Zone {
    onDestroyed: MulticastDelegate<(zone: this) => void> =
        new MockMulticastDelegate<(zone: this) => void>();
    onTick: MulticastDelegate<(zone: this, deltaTime: number) => void> =
        new MockMulticastDelegate<(zone: this, deltaTime: number) => void>();
    onBeginOverlap: MulticastDelegate<
        (zone: this, object: GameObject) => void
    > = new MockMulticastDelegate<(zone: this, object: GameObject) => void>();
    onEndOverlap: MulticastDelegate<(zone: this, object: GameObject) => void> =
        new MockMulticastDelegate<(zone: this, object: GameObject) => void>();

    setStacking(permission: number): void {
        throw new Error("Method not implemented.");
    }
    setSnapping(permission: number): void {
        throw new Error("Method not implemented.");
    }
    setSlotOwns(playerSlot: number, owner: boolean): void {
        throw new Error("Method not implemented.");
    }
    setShape(shape: number): void {
        throw new Error("Method not implemented.");
    }
    setScale(scale: Vector | [x: number, y: number, z: number]): void {
        throw new Error("Method not implemented.");
    }
    setSavedData(data: string): void {
        throw new Error("Method not implemented.");
    }
    setRotation(
        rotation: Rotator | [pitch: number, yaw: number, roll: number]
    ): void {
        throw new Error("Method not implemented.");
    }
    setPosition(position: Vector | [x: number, y: number, z: number]): void {
        throw new Error("Method not implemented.");
    }
    setObjectVisibility(permission: number): void {
        throw new Error("Method not implemented.");
    }
    setObjectInteraction(permission: number): void {
        throw new Error("Method not implemented.");
    }
    setInserting(permission: number): void {
        throw new Error("Method not implemented.");
    }
    setId(iD: string): boolean {
        throw new Error("Method not implemented.");
    }
    setCursorHidden(permission: number): void {
        throw new Error("Method not implemented.");
    }
    setColor(
        color: Color | [r: number, g: number, b: number, a: number]
    ): void {
        throw new Error("Method not implemented.");
    }
    setAlwaysVisible(alwaysVisible: boolean): void {
        throw new Error("Method not implemented.");
    }
    isValid(): boolean {
        throw new Error("Method not implemented.");
    }
    isSlotOwner(playerIndex: number): boolean {
        throw new Error("Method not implemented.");
    }
    isOverlapping(object: GameObject): boolean {
        throw new Error("Method not implemented.");
    }
    isAlwaysVisible(): boolean {
        throw new Error("Method not implemented.");
    }
    getStacking(): number {
        throw new Error("Method not implemented.");
    }
    getSnapping(): number {
        throw new Error("Method not implemented.");
    }
    getShape(): number {
        throw new Error("Method not implemented.");
    }
    getScale(): Vector {
        throw new Error("Method not implemented.");
    }
    getSavedData(): string {
        throw new Error("Method not implemented.");
    }
    getRotation(): Rotator {
        throw new Error("Method not implemented.");
    }
    getPosition(): Vector {
        throw new Error("Method not implemented.");
    }
    getOwningSlots(): number[] {
        throw new Error("Method not implemented.");
    }
    getOverlappingObjects(): GameObject[] {
        throw new Error("Method not implemented.");
    }
    getObjectVisibility(): number {
        throw new Error("Method not implemented.");
    }
    getObjectInteraction(): number {
        throw new Error("Method not implemented.");
    }
    getInserting(): number {
        throw new Error("Method not implemented.");
    }
    getId(): string {
        throw new Error("Method not implemented.");
    }
    getCursorHidden(): number {
        throw new Error("Method not implemented.");
    }
    getColor(): Color {
        throw new Error("Method not implemented.");
    }
    destroy(): void {
        throw new Error("Method not implemented.");
    }
}

export { MockZone as Zone };

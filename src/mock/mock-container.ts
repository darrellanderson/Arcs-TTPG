import {
    Color,
    Container,
    DrawingLine,
    GameObject,
    MulticastDelegate,
    Player,
    Rotator,
    SnapPoint,
    Switcher,
    UIElement,
    Vector,
} from "@tabletop-playground/api";
import { MockMulticastDelegate } from "./mock-multicast-delegate";
import { MockGameObject } from "./mock-game-object";

export class MockContainer extends MockGameObject implements Container {
    onInserted: MulticastDelegate<
        (container: this, insertedObjects: GameObject[], player: Player) => void
    > = new MockMulticastDelegate<
        (container: this, insertedObjects: GameObject[], player: Player) => void
    >();
    onRemoved: MulticastDelegate<
        (container: this, removedObject: GameObject, player: Player) => void
    > = new MockMulticastDelegate<
        (container: this, removedObject: GameObject, player: Player) => void
    >();

    takeAt(
        index: number,
        position: Vector | [x: number, y: number, z: number],
        showAnimation?: boolean | undefined,
        keep?: boolean | undefined
    ): GameObject | undefined {
        throw new Error("Method not implemented.");
    }
    take(
        objectToRemove: GameObject,
        position: Vector | [x: number, y: number, z: number],
        showAnimation?: boolean | undefined,
        keep?: boolean | undefined
    ): boolean {
        throw new Error("Method not implemented.");
    }
    setType(newType: number): void {
        throw new Error("Method not implemented.");
    }
    setMaxItems(maxItems: number): void {
        throw new Error("Method not implemented.");
    }
    setContainerTags(tags: string[]): void {
        throw new Error("Method not implemented.");
    }
    removeAt(index: number): boolean {
        throw new Error("Method not implemented.");
    }
    remove(objectToRemove: GameObject): boolean {
        throw new Error("Method not implemented.");
    }
    insert(
        objects: GameObject[],
        index?: number | undefined,
        showAnimation?: boolean | undefined
    ): void {
        throw new Error("Method not implemented.");
    }
    getType(): number {
        throw new Error("Method not implemented.");
    }
    getNumItems(): number {
        throw new Error("Method not implemented.");
    }
    getNextTakeIndex(): number {
        throw new Error("Method not implemented.");
    }
    getMaxItems(): number {
        throw new Error("Method not implemented.");
    }
    getItems(): GameObject[] {
        throw new Error("Method not implemented.");
    }
    getContainerTags(): string[] {
        throw new Error("Method not implemented.");
    }
    contains(checkObject: GameObject): boolean {
        throw new Error("Method not implemented.");
    }
    clear(): void {
        throw new Error("Method not implemented.");
    }
    addObjects(
        objects: GameObject[],
        index?: number | undefined,
        showAnimation?: boolean | undefined
    ): void {
        throw new Error("Method not implemented.");
    }
}

export { MockContainer as Container };

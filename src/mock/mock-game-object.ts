import {
    Container,
    GameObject,
    MulticastDelegate,
    Player,
    Rotator,
    SnapPoint,
    Switcher,
    Vector,
} from "@tabletop-playground/api";
import { MockStaticObject, MockStaticObjectParams } from "./mock-static-object";
import { MockMulticastDelegate } from "./mock-multicast-delegate";

export type MockGameObjectParams = MockStaticObjectParams & {};

export class MockGameObject extends MockStaticObject implements GameObject {
    constructor(params: MockGameObjectParams) {
        super(params);
    }

    onCreated: MulticastDelegate<(object: this) => void> =
        new MockMulticastDelegate();
    onDestroyed: MulticastDelegate<(object: this) => void> =
        new MockMulticastDelegate();
    onTick: MulticastDelegate<(object: this, deltaTime: number) => void> =
        new MockMulticastDelegate();
    onGrab: MulticastDelegate<(object: this, player: Player) => void> =
        new MockMulticastDelegate();
    onReleased: MulticastDelegate<
        (
            object: this,
            player: Player,
            thrown: boolean,
            grabPosition: Vector | [x: number, y: number, z: number],
            grabRotation: Rotator | [pitch: number, yaw: number, roll: number]
        ) => void
    > = new MockMulticastDelegate();
    onSnapped: MulticastDelegate<
        (
            object: this,
            player: Player,
            snapPoint: SnapPoint,
            grabPosition: Vector | [x: number, y: number, z: number],
            grabRotation: Rotator | [pitch: number, yaw: number, roll: number]
        ) => void
    > = new MockMulticastDelegate();
    onSnappedToGrid: MulticastDelegate<
        (
            object: this,
            player: Player,
            grabPosition: Vector | [x: number, y: number, z: number],
            grabRotation: Rotator | [pitch: number, yaw: number, roll: number]
        ) => void
    > = new MockMulticastDelegate();
    onReset: MulticastDelegate<(object: this, player: Player) => void> =
        new MockMulticastDelegate();
    onHit: MulticastDelegate<
        (
            object: this,
            otherObject: GameObject,
            first: boolean,
            impactPoint: Vector | [x: number, y: number, z: number],
            impulse: Vector | [x: number, y: number, z: number]
        ) => void
    > = new MockMulticastDelegate();
    onPrimaryAction: MulticastDelegate<(object: this, player: Player) => void> =
        new MockMulticastDelegate();
    onSecondaryAction: MulticastDelegate<
        (object: this, player: Player) => void
    > = new MockMulticastDelegate();
    onNumberAction: MulticastDelegate<
        (object: this, player: Player, number: number) => void
    > = new MockMulticastDelegate();
    onCustomAction: MulticastDelegate<
        (object: this, player: Player, identifier: string) => void
    > = new MockMulticastDelegate();
    onMovementStopped: MulticastDelegate<(object: this) => void> =
        new MockMulticastDelegate();

    toggleLock(): void {
        throw new Error("Method not implemented.");
    }
    switchLights(on: boolean): void {
        throw new Error("Method not implemented.");
    }
    snapToGround(): void {
        throw new Error("Method not implemented.");
    }
    snap(animationSpeed?: number | undefined): SnapPoint | undefined {
        throw new Error("Method not implemented.");
    }
    setSnappingAllowed(allowed: boolean): void {
        throw new Error("Method not implemented.");
    }
    setOwningPlayerSlot(slot: number): void {
        throw new Error("Method not implemented.");
    }
    setObjectType(type: number): void {
        throw new Error("Method not implemented.");
    }
    setLinearVelocity(
        velocity: Vector | [x: number, y: number, z: number]
    ): void {
        throw new Error("Method not implemented.");
    }
    setGroupId(groupId: number): void {
        throw new Error("Method not implemented.");
    }
    setAngularVelocity(
        velocity: Rotator | [pitch: number, yaw: number, roll: number]
    ): void {
        throw new Error("Method not implemented.");
    }
    removeCustomAction(identifier: string): void {
        throw new Error("Method not implemented.");
    }
    release(): void {
        throw new Error("Method not implemented.");
    }
    isSnappingAllowed(): boolean {
        throw new Error("Method not implemented.");
    }
    isSimulatingPhysics(): boolean {
        throw new Error("Method not implemented.");
    }
    isHeld(): boolean {
        throw new Error("Method not implemented.");
    }
    getSwitcher(): Switcher | undefined {
        throw new Error("Method not implemented.");
    }
    getSnappedToPoint(): SnapPoint | undefined {
        throw new Error("Method not implemented.");
    }
    getOwningPlayerSlot(): number {
        throw new Error("Method not implemented.");
    }
    getOwningPlayer(): Player | undefined {
        throw new Error("Method not implemented.");
    }
    getObjectType(): number {
        throw new Error("Method not implemented.");
    }
    getMass(): number {
        throw new Error("Method not implemented.");
    }
    getLinearVelocity(): Vector {
        throw new Error("Method not implemented.");
    }
    getGroupId(): number {
        throw new Error("Method not implemented.");
    }
    getContainer(): Container | undefined {
        throw new Error("Method not implemented.");
    }
    getCenterOfMass(): Vector {
        throw new Error("Method not implemented.");
    }
    getAngularVelocity(): Rotator {
        throw new Error("Method not implemented.");
    }
    freeze(): void {
        throw new Error("Method not implemented.");
    }
    flipOrUpright(): void {
        throw new Error("Method not implemented.");
    }
    createSwitcher(
        objects: GameObject[],
        showAnimation?: boolean | undefined
    ): Switcher {
        throw new Error("Method not implemented.");
    }
    areLightsOn(): boolean {
        throw new Error("Method not implemented.");
    }
    applyTorque(
        torque: Vector | [x: number, y: number, z: number],
        useMass?: boolean | undefined
    ): void {
        throw new Error("Method not implemented.");
    }
    applyImpulseAtPosition(
        impulse: Vector | [x: number, y: number, z: number],
        position: Vector | [x: number, y: number, z: number]
    ): void {
        throw new Error("Method not implemented.");
    }
    applyImpulse(
        impulse: Vector | [x: number, y: number, z: number],
        useMass?: boolean | undefined
    ): void {
        throw new Error("Method not implemented.");
    }
    applyForceAtPosition(
        force: Vector | [x: number, y: number, z: number],
        position: Vector | [x: number, y: number, z: number]
    ): void {
        throw new Error("Method not implemented.");
    }
    applyForce(
        force: Vector | [x: number, y: number, z: number],
        useMass?: boolean | undefined
    ): void {
        throw new Error("Method not implemented.");
    }
    applyAngularImpulse(
        impulse: Vector | [x: number, y: number, z: number],
        useMass?: boolean | undefined
    ): void {
        throw new Error("Method not implemented.");
    }
    addCustomAction(
        name: string,
        tooltip?: string | undefined,
        identifier?: string | undefined
    ): void {
        throw new Error("Method not implemented.");
    }
}

export { MockGameObject as GameObject };

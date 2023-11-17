import { MulticastDelegate, MultistateObject } from "@tabletop-playground/api";
import { MockGameObject } from "./mock-game-object";
import { MockMulticastDelegate } from "./mock-multicast-delegate";

export class MockMultistateObject
    extends MockGameObject
    implements MultistateObject
{
    onStateChanged: MulticastDelegate<
        (multistateObject: this, newState: number, oldState: number) => void
    > = new MockMulticastDelegate<
        (multistateObject: this, newState: number, oldState: number) => void
    >();

    setState(state: number): void {
        throw new Error("Method not implemented.");
    }
    setRandomState(): void {
        throw new Error("Method not implemented.");
    }
    getState(): number {
        throw new Error("Method not implemented.");
    }
    getNumStates(): number {
        throw new Error("Method not implemented.");
    }
}

export { MockMultistateObject as MultistateObject };

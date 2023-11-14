import {
    MulticastDelegate,
    PhaseDetails,
    Player,
    TurnSystem,
} from "@tabletop-playground/api";
import { MockMulticastDelegate } from "./mock-multicast-delegate";

export class MockTurnSystem implements TurnSystem {
    onTurnChanged: MulticastDelegate<
        (
            previousTurn: number,
            previousPhase: number,
            previousRound: number
        ) => void
    > = new MockMulticastDelegate<
        (
            previousTurn: number,
            previousPhase: number,
            previousRound: number
        ) => void
    >();

    setPhases(phases: PhaseDetails[]): void {
        throw new Error("Method not implemented.");
    }
    setCurrentTurn(turn: number): void {
        throw new Error("Method not implemented.");
    }
    setCurrentRound(round: number): void {
        throw new Error("Method not implemented.");
    }
    setCurrentPhaseIndex(phase: number): void {
        throw new Error("Method not implemented.");
    }
    previousTurn(): void {
        throw new Error("Method not implemented.");
    }
    nextTurn(): void {
        throw new Error("Method not implemented.");
    }
    getCurrentTurn(): number {
        throw new Error("Method not implemented.");
    }
    getCurrentRound(): number {
        throw new Error("Method not implemented.");
    }
    getCurrentPhaseIndex(): number {
        throw new Error("Method not implemented.");
    }
    getCurrentPhase(): PhaseDetails {
        throw new Error("Method not implemented.");
    }
    getAllPhases(): PhaseDetails[] {
        throw new Error("Method not implemented.");
    }
    getActivePlayers(): Player[] {
        throw new Error("Method not implemented.");
    }
}

export { MockTurnSystem as TurnSystem };

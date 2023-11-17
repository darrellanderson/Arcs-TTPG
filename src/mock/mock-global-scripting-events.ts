import {
    Dice,
    DrawingLine,
    GameObject,
    GlobalScriptingEvents,
    MulticastDelegate,
    Package,
    Player,
} from "@tabletop-playground/api";
import { MockMulticastDelegate } from "./mock-multicast-delegate";

export class MockGlobalScriptingEvents implements GlobalScriptingEvents {
    onTick: MulticastDelegate<(milliseconds: number) => void> =
        new MockMulticastDelegate<(milliseconds: number) => void>();
    onScriptButtonPressed: MulticastDelegate<
        (player: Player, index: number, ctrl: boolean, alt: boolean) => void
    > = new MockMulticastDelegate<
        (player: Player, index: number, ctrl: boolean, alt: boolean) => void
    >();
    onScriptButtonReleased: MulticastDelegate<
        (player: Player, index: number) => void
    > = new MockMulticastDelegate<(player: Player, index: number) => void>();
    onChatMessage: MulticastDelegate<
        (sender: Player, message: string) => void
    > = new MockMulticastDelegate<(sender: Player, message: string) => void>();
    onTeamChatMessage: MulticastDelegate<
        (sender: Player, team: number, message: string) => void
    > = new MockMulticastDelegate<
        (sender: Player, team: number, message: string) => void
    >();
    onWhisper: MulticastDelegate<
        (sender: Player, recipient: Player, message: string) => void
    > = new MockMulticastDelegate<
        (sender: Player, recipient: Player, message: string) => void
    >();
    onPlayerJoined: MulticastDelegate<(player: Player) => void> =
        new MockMulticastDelegate<(player: Player) => void>();
    onPlayerLeft: MulticastDelegate<(player: Player) => void> =
        new MockMulticastDelegate<(player: Player) => void>();
    onPlayerSwitchedSlots: MulticastDelegate<
        (player: Player, index: number) => void
    > = new MockMulticastDelegate<(player: Player, index: number) => void>();
    onObjectCreated: MulticastDelegate<(object: GameObject) => void> =
        new MockMulticastDelegate<(object: GameObject) => void>();
    onObjectDestroyed: MulticastDelegate<(object: GameObject) => void> =
        new MockMulticastDelegate<(object: GameObject) => void>();
    onDiceRolled: MulticastDelegate<(player: Player, dice: Dice[]) => void> =
        new MockMulticastDelegate<(player: Player, dice: Dice[]) => void>();
    onLineDrawn: MulticastDelegate<
        (player: Player, object: GameObject, line: DrawingLine) => void
    > = new MockMulticastDelegate<
        (player: Player, object: GameObject, line: DrawingLine) => void
    >();
    onLineErased: MulticastDelegate<
        (player: Player, object: GameObject, line: DrawingLine) => void
    > = new MockMulticastDelegate<
        (player: Player, object: GameObject, line: DrawingLine) => void
    >();
    onCustomAction: MulticastDelegate<
        (player: Player, identifier: string) => void
    > = new MockMulticastDelegate<
        (player: Player, identifier: string) => void
    >();
    onPackageAdded: MulticastDelegate<(packageRef: Package) => void> =
        new MockMulticastDelegate<(packageRef: Package) => void>();
}

export { MockGlobalScriptingEvents as GlobalScriptingEvents };

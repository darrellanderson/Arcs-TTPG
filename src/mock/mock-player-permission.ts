import { Player, PlayerPermission } from "@tabletop-playground/api";

export class MockPlayerPermission implements PlayerPermission {
    value: number = -1;

    clone(): PlayerPermission {
        throw new Error("Method not implemented.");
    }
    addPlayer(player: Player): PlayerPermission {
        throw new Error("Method not implemented.");
    }
    setHost(hostIsPermitted: boolean): PlayerPermission {
        throw new Error("Method not implemented.");
    }
    setPlayerSlots(slots: number[]): PlayerPermission {
        throw new Error("Method not implemented.");
    }
    setTeams(teams: number[]): PlayerPermission {
        throw new Error("Method not implemented.");
    }
}

export { MockPlayerPermission as PlayerPermission };

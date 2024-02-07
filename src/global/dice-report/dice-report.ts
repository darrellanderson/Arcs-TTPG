import { Dice, Player, globalEvents, world } from "@tabletop-playground/api";
import { IGlobal, NSID } from "ttpg-darrell";

export class DiceReport implements IGlobal {
    init(): void {
        globalEvents.onDiceRolled.add((player: Player, dice: Dice[]) => {
            this._onDiceRolled(player, dice);
        });
    }

    _onDiceRolled(player: Player, dice: Dice[]) {
        const typeToCount: { [key: string]: number } = {};

        for (const die of dice) {
            const nsid = NSID.get(die);
            if (!nsid.startsWith("dice")) {
                continue; // not a with-metadata die
            }

            const face = JSON.parse(die.getCurrentFaceMetadata());
            if (typeof face !== "object") {
                throw new Error("not object");
            }
            for (const [k, v] of Object.entries(face)) {
                if (typeof v !== "number") {
                    throw new Error("not number");
                }
                if (v === 0) {
                    continue;
                }
                typeToCount[k] = (typeToCount[k] || 0) + v;
            }
        }

        const types = Object.keys(typeToCount).sort();
        const msg =
            ">>> " +
            types
                .map((type) => {
                    const count = typeToCount[type];
                    return `${type}: ${count}`;
                })
                .join(", ");

        console.log(msg);

        // TODO broadcast library
        const sendDiceResult = () => {
            for (const dstPlayer of world.getAllPlayers()) {
                dstPlayer.showMessage(msg);
                dstPlayer.sendChatMessage(msg, player.getPlayerColor());
            }
        };
        process.nextTick(sendDiceResult);
    }
}

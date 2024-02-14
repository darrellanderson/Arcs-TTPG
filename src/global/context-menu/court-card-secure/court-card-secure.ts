import { Card, GameObject, Player, Vector } from "@tabletop-playground/api";
import { LibAgent } from "lib";
import {
    AbstractRightClickCard,
    CardUtil,
    Find,
    GarbageContainer,
} from "ttpg-darrell";

export class CourtCardSecure extends AbstractRightClickCard {
    public static readonly ACTION_NAME = "* Secure";

    constructor() {
        const cardNsidPrefix: string = "card.court";
        const handler = (
            object: GameObject,
            player: Player,
            identifier: string
        ): void => {
            if (identifier !== CourtCardSecure.ACTION_NAME) {
                return; // not ours
            }
            if (!(object instanceof Card)) {
                throw new Error("not a card");
            }

            // Recycle securing player's agents back to their supply.
            const agents: GameObject[] = LibAgent.getAgentsOnCard(object);
            const playerSlotToAgents: { [key: number]: GameObject[] } =
                LibAgent.getPlayerSlotToAgents(agents);
            const remainingAgents: GameObject[] = [];
            for (const [playerSlot, agents] of Object.entries(
                playerSlotToAgents
            )) {
                for (const agent of agents) {
                    if (
                        Number.parseInt(playerSlot) !== player.getSlot() ||
                        !GarbageContainer.tryRecycle(agent)
                    ) {
                        remainingAgents.push(agent);
                    }
                }
            }

            // Dump remaining agents on captives area.
            let center: Vector | undefined;
            let radius: number | undefined;
            const skipContained: boolean = true;
            const playerBoard: GameObject | undefined =
                new Find().findGameObject(
                    "board:base/playerboard",
                    player.getSlot(),
                    skipContained
                );
            if (playerBoard) {
                for (const snapPoint of playerBoard.getAllSnapPoints()) {
                    if (snapPoint.getTags().includes("captives-center")) {
                        center = snapPoint.getGlobalPosition();
                        radius = snapPoint.getRange();
                        break;
                    }
                }
            }

            if (center && radius) {
                let z = 3;
                for (const agent of remainingAgents) {
                    const pos = Vector.randomPointInBoundingBox(center, [
                        radius,
                        radius,
                        0,
                    ]).add([0, 0, z]);
                    agent.setPosition(pos, 1);
                    z += agent.getExtent(false, false).z + 3;
                    console.log(z);
                }
            }

            new CardUtil().dealToHolder(object, player.getSlot());
        };

        super(cardNsidPrefix, CourtCardSecure.ACTION_NAME, handler);
    }
}

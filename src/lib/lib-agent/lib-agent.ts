import { Card, GameObject, Vector, world } from "@tabletop-playground/api";
import { NSID } from "ttpg-darrell";

export class LibAgent {
    static getAgentsOnCard(card: Card): GameObject[] {
        const agentsOnCard: GameObject[] = [];

        // Extrude the card extent for the overlap box.
        const currentRotation = false;
        const includeGeometry = false;
        const boxExtent: Vector = card.getExtent(
            currentRotation,
            includeGeometry
        );
        boxExtent.z = 20;
        const boxPos = card.getPosition();
        const boxRot = card.getRotation();
        //world.drawDebugBox(boxPos, boxExtent, boxRot, [1, 0, 0, 1], 3);
        for (const obj of world.boxOverlap(boxPos, boxExtent, boxRot)) {
            const nsid = NSID.get(obj);
            if (nsid !== "unit:base/agent") {
                continue;
            }
            agentsOnCard.push(obj);
        }

        return agentsOnCard;
    }

    static getPlayerSlotToAgents(agents: GameObject[]): {
        [key: number]: GameObject[];
    } {
        const playerSlotToAgents: { [key: number]: GameObject[] } = {};
        for (const agent of agents) {
            const slot: number = agent.getOwningPlayerSlot();
            let agents: GameObject[] | undefined = playerSlotToAgents[slot];
            if (!agents) {
                agents = [];
                playerSlotToAgents[slot] = agents;
            }
            agents.push(agent);
        }
        return playerSlotToAgents;
    }
}

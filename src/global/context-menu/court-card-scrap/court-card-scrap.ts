import { Card, Container, GameObject, Player } from "@tabletop-playground/api";
import { AbstractRightClickCard, Find } from "ttpg-darrell";

export class CourtCardScrap extends AbstractRightClickCard {
    public static readonly ACTION_NAME = "* Scrap";

    constructor() {
        const cardNsidPrefix: string = "card.court";
        const handler = (
            object: GameObject,
            player: Player,
            identifier: string
        ): void => {
            if (identifier !== CourtCardScrap.ACTION_NAME) {
                return; // not ours
            }
            if (!(object instanceof Card)) {
                throw new Error("not a card");
            }

            const deletedItems: Container | undefined =
                new Find().findContainer("container:base/deleted-items");
            if (deletedItems) {
                deletedItems.addObjects([object]);
            } else {
                object.destroy();
            }
        };

        super(cardNsidPrefix, CourtCardScrap.ACTION_NAME, handler);
    }
}

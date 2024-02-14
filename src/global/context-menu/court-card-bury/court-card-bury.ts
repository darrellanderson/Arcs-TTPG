import { Card, GameObject, Player, SnapPoint } from "@tabletop-playground/api";
import { AbstractRightClickCard, Find } from "ttpg-darrell";

export class CourtCardBury extends AbstractRightClickCard {
    public static ACTION_NAME = "* Bury";

    constructor() {
        console.log("xxx");
        const cardNsidPrefix: string = "card.court";
        const handler = (
            object: GameObject,
            player: Player,
            identifier: string
        ): void => {
            if (identifier !== CourtCardBury.ACTION_NAME) {
                return; // not ours
            }
            if (!(object instanceof Card)) {
                throw new Error("not a card");
            }

            const snapPoint: SnapPoint | undefined =
                new Find().findSnapPointByTag("card.court.deck");
            if (!snapPoint) {
                console.log("CourtCardBury: missing deck snap point");
                return;
            }

            const courtDeck: GameObject | undefined =
                snapPoint?.getSnappedObject();
            if (courtDeck && courtDeck instanceof Card) {
                courtDeck.addCards(object, true);
            } else {
                object.setRotation([0, 0, 0]);
                object.setPosition(
                    snapPoint.getGlobalPosition().add([0, 0, 3])
                );
                object.snapToGround();
                object.snap();
            }
        };

        super(cardNsidPrefix, CourtCardBury.ACTION_NAME, handler);
    }
}

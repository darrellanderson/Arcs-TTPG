//import { Card, CardDetails, StaticObject } from "@tabletop-playground/api";
import { Card, CardDetails, StaticObject } from "../mock/index";
//const { Card, CardDetails, StaticObject } = require("@tabletop-playground/api");
//const { Card, CardDetails, StaticObject } = require("../api");

export class Nsid {
    get(obj: StaticObject): string {
        if (obj instanceof Card) {
            if (obj.getStackSize() !== 1) {
                return "";
            }
            const cardDetails: CardDetails = obj.getCardDetails();
            return cardDetails.metadata;
        }
        const metadata = obj.getTemplateMetadata();
        return metadata;
    }

    getDeckNsids(card: Card): string[] {
        const result: string[] = [];
        for (const cardDetails of card.getAllCardDetails()) {
            result.push(cardDetails.metadata);
        }
        return result;
    }

    parse(metadata: string) {}
}

import { MockCardDetails } from ".";

describe("MockCardDetails", () => {
    test("index", () => {
        const value = 7;
        const cardDetails = new MockCardDetails({ index: value });
        expect(cardDetails.index).toBe(value);
    });

    test("stackIndex", () => {
        const value = 7;
        const cardDetails = new MockCardDetails({ stackIndex: value });
        expect(cardDetails.stackIndex).toBe(value);
    });

    test("templateId", () => {
        const value = "my value";
        const cardDetails = new MockCardDetails({ templateId: value });
        expect(cardDetails.templateId).toBe(value);
    });

    test("name", () => {
        const value = "my value";
        const cardDetails = new MockCardDetails({ name: value });
        expect(cardDetails.name).toBe(value);
    });

    test("metadata", () => {
        const value = "my value";
        const cardDetails = new MockCardDetails({ metadata: value });
        expect(cardDetails.metadata).toBe(value);
    });

    test("textureOverrideURL", () => {
        const value = "my value";
        const cardDetails = new MockCardDetails({ textureOverrideURL: value });
        expect(cardDetails.textureOverrideURL).toBe(value);
    });

    test("flipped", () => {
        const value = true;
        const cardDetails = new MockCardDetails({ flipped: value });
        expect(cardDetails.flipped).toBe(value);
    });

    test("tags", () => {
        const value = ["a", "b", "c"];
        const cardDetails = new MockCardDetails({ tags: value });
        expect(cardDetails.tags).toBe(value);
    });
});

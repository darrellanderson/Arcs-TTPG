import { Nsid } from "./nsid";
import { MockCard, MockCardDetails, MockGameObject } from "ttpg-mock";

it("constructor", () => {
    new Nsid();
});

it("get (simple object)", () => {
    const value: string = "my-metadata";
    const obj = new MockGameObject({ templateMetadata: value });
    const nsid = new Nsid().get(obj);
    expect(nsid).toBe(value);
});

it("get (single card)", () => {
    const value: string = "my-card-metadata";
    const obj = new MockCard({
        cardDetails: [new MockCardDetails({ metadata: value })],
    });
    const nsid = new Nsid().get(obj);
    expect(nsid).toBe(value);
});

it("get (deck)", () => {
    const obj = new MockCard({
        cardDetails: [
            new MockCardDetails({ metadata: "a" }),
            new MockCardDetails({ metadata: "b" }),
            new MockCardDetails({ metadata: "c" }),
        ],
    });
    const nsid = new Nsid().get(obj);
    expect(nsid).toBe(""); // deck has no nsid
});

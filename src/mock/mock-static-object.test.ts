import { MockStaticObject } from ".";

it("constructor", () => {
    new MockStaticObject({});
});

it("getTemplateMetadata", () => {
    const value: string = "my.test.metadata";
    const obj = new MockStaticObject({ templateMetadata: value });
    const metadata: string = obj.getTemplateMetadata();
    expect(metadata).toBe(value);
});

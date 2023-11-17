import { MockStaticObject } from ".";

it("constructor", () => {
    const description = "my-description";
    const id = "my-id";
    const name = "my-name";
    const position: [x: number, y: number, z: number] = [1, 2, 3];
    const primaryColor: [r: number, g: number, b: number, a: number] = [
        0.1, 0.2, 0.3, 0.4,
    ];
    const savedData = { "my-key": "my-value" };
    const rotation: [pitch: number, yaw: number, roll: number] = [5, 6, 7];
    const scale: [x: number, y: number, z: number] = [4, 2, 3];
    const secondaryColor: [r: number, g: number, b: number, a: number] = [
        0.5, 0.6, 0.7, 0.8,
    ];
    const size: [x: number, y: number, z: number] = [5, 2, 3];
    const templateMetadata = "my-metadata";

    const staticObj = new MockStaticObject({
        description,
        id,
        name,
        position,
        primaryColor,
        rotation,
        savedData,
        scale,
        secondaryColor,
        size,
        templateMetadata,
    });

    expect(staticObj.getDescription()).toBe(description);
    expect(staticObj.getId()).toBe(id);
    expect(staticObj.getName()).toBe(name);
    expect(staticObj.getPosition().equals(position, 0)).toBe(true);
    expect(staticObj.getPrimaryColor().toString()).toBe(
        "(R=0.1,G=0.2,B=0.3,A=0.4)"
    );
    expect(staticObj.getRotation().equals(rotation, 0)).toBe(true);
    expect(staticObj.getSavedData("my-key")).toBe("my-value");
    expect(staticObj.getScale().equals(scale, 0)).toBe(true);
    expect(staticObj.getSecondaryColor().toString()).toBe(
        "(R=0.5,G=0.6,B=0.7,A=0.8)"
    );
    expect(staticObj.getSize().equals(size, 0)).toBe(true);
    expect(staticObj.getTemplateMetadata()).toBe(templateMetadata);
});

it("description", () => {
    const input = "test-input";
    const obj = new MockStaticObject();
    obj.setDescription(input);
    const output = obj.getDescription();
    expect(output).toBe(input);
});

it("id", () => {
    // default
    const obj = new MockStaticObject();
    let output = obj.getId();
    expect(output).toMatch(/__id__([0-9]?)__/);

    // custom
    const input = "test-id";
    obj.setId(input);
    output = obj.getId();
    expect(output).toBe(input);
});

it("isValid", () => {
    const obj = new MockStaticObject();
    expect(obj.isValid()).toBe(true);
    obj.destroy();
    expect(obj.isValid()).toBe(false);
});

it("name", () => {
    const input = "test-input";
    const obj = new MockStaticObject();
    obj.setDescription(input);
    const output = obj.getDescription();
    expect(output).toBe(input);
});

it("position", () => {
    const input: [x: number, y: number, z: number] = [1, 2, 3];
    const obj = new MockStaticObject();
    obj.setPosition(input);
    const output = obj.getPosition();
    expect(output.equals(input, 0)).toBe(true);
});

it("primaryColor", () => {
    const input: [r: number, g: number, b: number, a: number] = [
        0.1, 0.2, 0.3, 1,
    ];
    const obj = new MockStaticObject();
    obj.setPrimaryColor(input);
    const output = obj.getPrimaryColor();
    expect(output.toString()).toBe("(R=0.1,G=0.2,B=0.3,A=1)");
});

it("rotation", () => {
    const input: [pitch: number, yaw: number, roll: number] = [1, 2, 3];
    const obj = new MockStaticObject();
    obj.setRotation(input);
    const output = obj.getRotation();
    expect(output.equals(input, 0)).toBe(true);
});

it("savedData", () => {
    const input = "my-saved-data";
    const key = "my-key";
    const obj = new MockStaticObject();
    obj.setSavedData(input, key);
    const output = obj.getSavedData(key);
    expect(output).toBe(input);
});

it("secondaryColor", () => {
    const input: [r: number, g: number, b: number, a: number] = [
        0.1, 0.2, 0.3, 1,
    ];
    const obj = new MockStaticObject();
    obj.setSecondaryColor(input);
    const output = obj.getSecondaryColor();
    expect(output.toString()).toBe("(R=0.1,G=0.2,B=0.3,A=1)");
});

it("tags", () => {
    const input = ["a", "b", "c"];
    const obj = new MockStaticObject();
    obj.setTags(input);
    const output = obj.getTags();
    expect(output).toEqual(input);
});

it("templateMetadata", () => {
    const input = "test-input";
    const obj = new MockStaticObject({ templateMetadata: input });
    const output = obj.getTemplateMetadata();
    expect(output).toBe(input);
});

import { MockColor } from "./mock-color";
import { MockDrawingLine } from "./mock-drawing-line";
import { MockRotator } from "./mock-rotator";
import { MockStaticObject } from "./mock-static-object";
import { MockUIElement } from "./mock-ui-element";
import { MockVector } from "./mock-vector";

it("constructor", () => {
    const params = {
        bounciness: 2,
        density: 3,
        description: "my-description",
        drawingLines: [],
        extent: new MockVector(1, 2, 3),
        extentCenter: new MockVector(4, 5, 6),
        friction: 4,
        id: "my-id",
        metallic: 5,
        name: "my-name",
        packageId: "my-package-id",
        packageName: "my-package-name",
        position: new MockVector(7, 8, 9),
        primaryColor: new MockColor(0.1, 0.2, 0.3, 0.4),
        rotation: new MockRotator(10, 11, 12),
        roughness: 6,
        savedData: { "my-key": "my-value" },
        scale: new MockVector(13, 14, 15),
        scriptFilename: "my-script-filename",
        scriptPackageId: "my-script-package-id",
        secondaryColor: new MockColor(0.5, 0.6, 0.7, 0.8),
        size: new MockVector(16, 17, 18),
        snapPoints: [],
        surfaceType: "my-surface-type",
        tags: ["my-tag"],
        templateId: "my-template-id",
        templateMetadata: "my-template-metadata",
        templateName: "my-template-name",
        uis: [],
    };

    const obj = new MockStaticObject(params);

    expect(obj.getBounciness()).toBe(params.bounciness);
    expect(obj.getDensity()).toBe(params.density);
    expect(obj.getDescription()).toBe(params.description);
    expect(obj.getDrawingLines()).toEqual(params.drawingLines);
    expect(obj.getExtent(false, false)).toEqual(params.extent);
    expect(obj.getExtentCenter(false, false)).toEqual(params.extentCenter);
    expect(obj.getFriction()).toBe(params.friction);
    expect(obj.getId()).toBe(params.id);
    expect(obj.getMetallic()).toBe(params.metallic);
    expect(obj.getName()).toBe(params.name);
    expect(obj.getPackageId()).toBe(params.packageId);
    expect(obj.getPackageName()).toBe(params.packageName);
    expect(obj.getPosition()).toEqual(params.position);
    expect(obj.getPrimaryColor()).toEqual(params.primaryColor);
    expect(obj.getRotation()).toEqual(params.rotation);
    expect(obj.getRoughness()).toBe(params.roughness);
    expect(obj.getSavedData("my-key")).toBe("my-value");
    expect(obj.getScale()).toEqual(params.scale);
    expect(obj.getScriptFilename()).toBe(params.scriptFilename);
    expect(obj.getScriptPackageId()).toBe(params.scriptPackageId);
    expect(obj.getAllSnapPoints()).toEqual(params.snapPoints);
    expect(obj.getTags()).toEqual(params.tags);
    expect(obj.getTemplateId()).toBe(params.templateId);
    expect(obj.getTemplateMetadata()).toBe(params.templateMetadata);
    expect(obj.getTemplateName()).toBe(params.templateName);
    expect(obj.getUIs()).toEqual(params.uis);
});

it("bounciness", () => {
    const input = 7;
    const obj = new MockStaticObject();
    obj.setBounciness(input);
    const output = obj.getBounciness();
    expect(output).toBe(input);
});

it("density", () => {
    const input = 7;
    const obj = new MockStaticObject();
    obj.setDensity(input);
    const output = obj.getDensity();
    expect(output).toBe(input);
});

it("description", () => {
    const input = "test-input";
    const obj = new MockStaticObject();
    obj.setDescription(input);
    const output = obj.getDescription();
    expect(output).toBe(input);
});

it("drawingLines", () => {
    const input = new MockDrawingLine();
    const obj = new MockStaticObject();
    obj.addDrawingLine(input);
    expect(obj.getDrawingLines()).toEqual([input]);
    obj.removeDrawingLineObject(input);
    expect(obj.getDrawingLines()).toEqual([]);
    obj.addDrawingLine(input);
    expect(obj.getDrawingLines()).toEqual([input]);
    obj.removeDrawingLine(0);
    expect(obj.getDrawingLines()).toEqual([]);
});

it("friction", () => {
    const input = 7;
    const obj = new MockStaticObject();
    obj.setFriction(input);
    const output = obj.getFriction();
    expect(output).toBe(input);
});

it("id", () => {
    // default
    const obj = new MockStaticObject();
    let output = obj.getId();
    expect(output).toMatch(/__id__([0-9]+)__/);

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

it("metallic", () => {
    const input = 7;
    const obj = new MockStaticObject();
    obj.setMetallic(input);
    const output = obj.getMetallic();
    expect(output).toBe(input);
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

it("roughness", () => {
    const input = 7;
    const obj = new MockStaticObject();
    obj.setRoughness(input);
    const output = obj.getRoughness();
    expect(output).toBe(input);
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

it("surfaceType", () => {
    const input = "override-surface-type";
    const obj = new MockStaticObject();
    obj.setSurfaceType(input);
    const output = obj.getSurfaceType();
    expect(output.toString()).toBe(input);
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

it("ui", () => {
    const input = new MockUIElement();
    const obj = new MockStaticObject();
    const index = obj.addUI(input);
    expect(obj.getUIs()).toEqual([input]);

    obj.removeUI(index);
    expect(obj.getUIs()).toEqual([]);

    obj.addUI(input);
    expect(obj.getUIs()).toEqual([input]);
    obj.removeUIElement(input);
    expect(obj.getUIs()).toEqual([]);

    expect(() => {
        obj.attachUI(input);
    }).toThrow();
    expect(() => {
        obj.getAttachedUIs();
    }).toThrow();
});

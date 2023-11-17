import {
    Color,
    DrawingLine,
    Rotator,
    SnapPoint,
    StaticObject,
    UIElement,
    Vector,
} from "@tabletop-playground/api";
import { MockColor, MockRotator, MockVector } from "./";

export type MockStaticObjectParams = {
    description?: string;
    extent?: Vector | [x: number, y: number, z: number];
    extentCenter?: Vector | [x: number, y: number, z: number];
    id?: string;
    name?: string;
    position?: Vector | [x: number, y: number, z: number];
    primaryColor?: Color | [r: number, g: number, b: number, a: number];
    rotation?: Rotator | [pitch: number, yaw: number, roll: number];
    savedData?: { [key: string]: string };
    scale?: Vector | [x: number, y: number, z: number];
    secondaryColor?: Color | [r: number, g: number, b: number, a: number];
    size?: Vector | [x: number, y: number, z: number];
    tags?: string[];
    templateMetadata?: string;
};

export class MockStaticObject implements StaticObject {
    private static __nextIdNumber = 1;

    private _description: string = "";
    private _extent: Vector = new MockVector(1, 1, 1);
    private _extentCenter: Vector = new MockVector(0, 0, 0);
    private _id: string = `__id__${MockStaticObject.__nextIdNumber++}__`;
    private _isValid: boolean = true;
    private _name: string = "";
    private _position: Vector = new MockVector(0, 0, 0);
    private _primaryColor: Color = new MockColor(1, 1, 1, 1);
    private _rotation: Rotator = new MockRotator(0, 0, 0);
    private _savedData: { [key: string]: string } = {};
    private _scale: Vector = new MockVector(1, 1, 1);
    private _secondaryColor: Color = new MockColor(0, 0, 0, 1);
    private _size: Vector = new MockVector(2, 2, 2);
    private _tags: string[] = [];
    private _templateMetadata: string = "";

    constructor(params?: MockStaticObjectParams) {
        if (params?.description) {
            this._description = params.description;
        }
        if (params?.id) {
            this._id = params.id;
        }
        if (params?.name) {
            this._name = params.name;
        }
        if (params?.position) {
            this._position = MockVector._from(params.position);
        }
        if (params?.primaryColor) {
            this._primaryColor = MockColor._from(params.primaryColor);
        }
        if (params?.rotation) {
            this._rotation = MockRotator._from(params.rotation);
        }
        if (params?.savedData) {
            this._savedData = params.savedData;
        }
        if (params?.scale) {
            this._scale = MockVector._from(params.scale);
        }
        if (params?.secondaryColor) {
            this._secondaryColor = MockColor._from(params.secondaryColor);
        }
        if (params?.size) {
            this._size = MockVector._from(params.size);
        }
        if (params?.tags) {
            this._tags = params.tags;
        }
        if (params?.templateMetadata) {
            this._templateMetadata = params.templateMetadata;
        }
    }

    destroy(): void {
        this._isValid = false;
    }

    getDescription(): string {
        return this._description;
    }

    getExtentCenter(
        currentRotation: boolean,
        includeGeometry: boolean
    ): Vector {
        return this._extentCenter;
    }

    getExtent(currentRotation: boolean, includeGeometry: boolean): Vector {
        return this._extent;
    }

    getId(): string {
        return this._id;
    }

    getName(): string {
        return this._name;
    }

    getPosition(): Vector {
        return this._position;
    }

    getPrimaryColor(): Color {
        return this._primaryColor;
    }

    getRotation(): Rotator {
        return this._rotation;
    }

    getSavedData(key: string): string {
        return this._savedData[key];
    }

    getScale(): Vector {
        return this._scale;
    }

    getSecondaryColor(): Color {
        return this._secondaryColor;
    }

    getSize(): Vector {
        return this._size;
    }

    getTags(): string[] {
        return this._tags;
    }

    getTemplateMetadata(): string {
        return this._templateMetadata;
    }

    isValid(): boolean {
        return this._isValid;
    }

    setDescription(description: string): void {
        this._description = description;
    }

    setId(iD: string): boolean {
        this._id = iD;
        return true;
    }

    setName(name: string): void {
        this._name = name;
    }

    setPosition(
        position: Vector | [x: number, y: number, z: number],
        animationSpeed?: number | undefined
    ): void {
        this._position = MockVector._from(position);
    }

    setPrimaryColor(
        color: Color | [r: number, g: number, b: number, a: number]
    ): void {
        this._primaryColor = MockColor._from(color);
    }

    setRotation(
        rotation: Rotator | [pitch: number, yaw: number, roll: number],
        animationSpeed?: number | undefined
    ): void {
        this._rotation = MockRotator._from(rotation);
    }

    setSavedData(data: string, key: string): void {
        this._savedData[key] = data;
    }

    setScale(scale: Vector | [x: number, y: number, z: number]): void {
        this._scale = MockVector._from(scale);
    }

    setSecondaryColor(
        color: Color | [r: number, g: number, b: number, a: number]
    ): void {
        this._secondaryColor = MockColor._from(color);
    }

    setTags(tags: string[]): void {
        this._tags = tags;
    }

    // --------------------------------

    worldRotationToLocal(
        rotation: Rotator | [pitch: number, yaw: number, roll: number]
    ): Rotator {
        throw new Error("Method not implemented.");
    }
    worldPositionToLocal(
        position: Vector | [x: number, y: number, z: number]
    ): Vector {
        throw new Error("Method not implemented.");
    }
    updateUI(element: UIElement): void {
        throw new Error("Method not implemented.");
    }
    toJSONString(): string {
        throw new Error("Method not implemented.");
    }
    setUI(index: number, element: UIElement): void {
        throw new Error("Method not implemented.");
    }
    setSurfaceType(surfaceType: string): void {
        throw new Error("Method not implemented.");
    }
    setScript(filename: string, packageId?: string | undefined): void {
        throw new Error("Method not implemented.");
    }
    setRoughness(roughness: number): void {
        throw new Error("Method not implemented.");
    }
    setMetallic(metallic: number): void {
        throw new Error("Method not implemented.");
    }
    setFriction(friction: number): void {
        throw new Error("Method not implemented.");
    }
    setDensity(density: number): void {
        throw new Error("Method not implemented.");
    }
    setBounciness(bounciness: number): void {
        throw new Error("Method not implemented.");
    }
    removeUIElement(element: UIElement): void {
        throw new Error("Method not implemented.");
    }
    removeUI(index: number): void {
        throw new Error("Method not implemented.");
    }
    removeDrawingLineObject(line: DrawingLine): void {
        throw new Error("Method not implemented.");
    }
    removeDrawingLine(index: number): void {
        throw new Error("Method not implemented.");
    }
    localRotationToWorld(
        rotation: Rotator | [pitch: number, yaw: number, roll: number]
    ): Rotator {
        throw new Error("Method not implemented.");
    }
    localPositionToWorld(
        position: Vector | [x: number, y: number, z: number]
    ): Vector {
        throw new Error("Method not implemented.");
    }
    getUIs(): UIElement[] {
        throw new Error("Method not implemented.");
    }
    getTemplateName(): string {
        throw new Error("Method not implemented.");
    }
    getTemplateId(): string {
        throw new Error("Method not implemented.");
    }
    getSurfaceType(): string {
        throw new Error("Method not implemented.");
    }
    getSnapPoint(index: number): SnapPoint | undefined {
        throw new Error("Method not implemented.");
    }
    getScriptPackageId(): string {
        throw new Error("Method not implemented.");
    }
    getScriptFilename(): string {
        throw new Error("Method not implemented.");
    }
    getRoughness(): number {
        throw new Error("Method not implemented.");
    }
    getPackageName(): string {
        throw new Error("Method not implemented.");
    }
    getPackageId(): string {
        throw new Error("Method not implemented.");
    }
    getMetallic(): number {
        throw new Error("Method not implemented.");
    }
    getFriction(): number {
        throw new Error("Method not implemented.");
    }
    getDrawingLines(): DrawingLine[] {
        throw new Error("Method not implemented.");
    }
    getDensity(): number {
        throw new Error("Method not implemented.");
    }
    getBounciness(): number {
        throw new Error("Method not implemented.");
    }
    getAttachedUIs(): UIElement[] {
        throw new Error("Method not implemented.");
    }
    getAllSnapPoints(): SnapPoint[] {
        throw new Error("Method not implemented.");
    }
    attachUI(element: UIElement): number {
        throw new Error("Method not implemented.");
    }
    addUI(element: UIElement): number {
        throw new Error("Method not implemented.");
    }
    addDrawingLine(line: DrawingLine): boolean {
        throw new Error("Method not implemented.");
    }
}

export { MockStaticObject as StaticObject };

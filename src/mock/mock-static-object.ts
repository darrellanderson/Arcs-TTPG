import {
    Color,
    DrawingLine,
    Rotator,
    SnapPoint,
    StaticObject,
    UIElement,
    Vector,
} from "@tabletop-playground/api";

export type MockStaticObjectParams = { templateMetadata?: string };

export class MockStaticObject implements StaticObject {
    private _templateMetadata: string = "";

    constructor(params: MockStaticObjectParams) {
        if (typeof params.templateMetadata === "string") {
            this._templateMetadata = params.templateMetadata;
        }
    }

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
    setTags(tags: string[]): void {
        throw new Error("Method not implemented.");
    }
    setSurfaceType(surfaceType: string): void {
        throw new Error("Method not implemented.");
    }
    setSecondaryColor(
        color: Color | [r: number, g: number, b: number, a: number]
    ): void {
        throw new Error("Method not implemented.");
    }
    setScript(filename: string, packageId?: string | undefined): void {
        throw new Error("Method not implemented.");
    }
    setScale(scale: Vector | [x: number, y: number, z: number]): void {
        throw new Error("Method not implemented.");
    }
    setSavedData(data: string, key: string): void {
        throw new Error("Method not implemented.");
    }
    setRoughness(roughness: number): void {
        throw new Error("Method not implemented.");
    }
    setRotation(
        rotation: Rotator | [pitch: number, yaw: number, roll: number],
        animationSpeed?: number | undefined
    ): void {
        throw new Error("Method not implemented.");
    }
    setPrimaryColor(
        color: Color | [r: number, g: number, b: number, a: number]
    ): void {
        throw new Error("Method not implemented.");
    }
    setPosition(
        position: Vector | [x: number, y: number, z: number],
        animationSpeed?: number | undefined
    ): void {
        throw new Error("Method not implemented.");
    }
    setName(name: string): void {
        throw new Error("Method not implemented.");
    }
    setMetallic(metallic: number): void {
        throw new Error("Method not implemented.");
    }
    setId(iD: string): boolean {
        throw new Error("Method not implemented.");
    }
    setFriction(friction: number): void {
        throw new Error("Method not implemented.");
    }
    setDescription(description: string): void {
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
    isValid(): boolean {
        throw new Error("Method not implemented.");
    }
    getUIs(): UIElement[] {
        throw new Error("Method not implemented.");
    }
    getTemplateName(): string {
        throw new Error("Method not implemented.");
    }
    getTemplateMetadata(): string {
        return this._templateMetadata;
    }
    getTemplateId(): string {
        throw new Error("Method not implemented.");
    }
    getTags(): string[] {
        throw new Error("Method not implemented.");
    }
    getSurfaceType(): string {
        throw new Error("Method not implemented.");
    }
    getSnapPoint(index: number): SnapPoint | undefined {
        throw new Error("Method not implemented.");
    }
    getSize(): Vector {
        throw new Error("Method not implemented.");
    }
    getSecondaryColor(): Color {
        throw new Error("Method not implemented.");
    }
    getScriptPackageId(): string {
        throw new Error("Method not implemented.");
    }
    getScriptFilename(): string {
        throw new Error("Method not implemented.");
    }
    getScale(): Vector {
        throw new Error("Method not implemented.");
    }
    getSavedData(key: string): string {
        throw new Error("Method not implemented.");
    }
    getRoughness(): number {
        throw new Error("Method not implemented.");
    }
    getRotation(): Rotator {
        throw new Error("Method not implemented.");
    }
    getPrimaryColor(): Color {
        throw new Error("Method not implemented.");
    }
    getPosition(): Vector {
        throw new Error("Method not implemented.");
    }
    getPackageName(): string {
        throw new Error("Method not implemented.");
    }
    getPackageId(): string {
        throw new Error("Method not implemented.");
    }
    getName(): string {
        throw new Error("Method not implemented.");
    }
    getMetallic(): number {
        throw new Error("Method not implemented.");
    }
    getId(): string {
        throw new Error("Method not implemented.");
    }
    getFriction(): number {
        throw new Error("Method not implemented.");
    }
    getExtentCenter(
        currentRotation: boolean,
        includeGeometry: boolean
    ): Vector {
        throw new Error("Method not implemented.");
    }
    getExtent(currentRotation: boolean, includeGeometry: boolean): Vector {
        throw new Error("Method not implemented.");
    }
    getDrawingLines(): DrawingLine[] {
        throw new Error("Method not implemented.");
    }
    getDescription(): string {
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
    destroy(): void {
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

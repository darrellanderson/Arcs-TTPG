import {
    Color,
    DrawingLine,
    GameObject,
    GameWorld,
    GlobalGrid,
    Label,
    LightingSettings,
    Package,
    Player,
    Rotator,
    ScreenUIElement,
    Sound,
    StaticObject,
    TraceHit,
    TurnSystem,
    UIElement,
    Vector,
    Zone,
} from "@tabletop-playground/api";
import { MockGlobalGrid } from "./mock-global-grid";
import { MockTurnSystem } from "./mock-turn-system";
import { MockLightingSettings } from "./mock-lighting-settings";

export class MockGameWorld implements GameWorld {
    grid: GlobalGrid = new MockGlobalGrid();
    lighting: LightingSettings = new MockLightingSettings();
    turns: TurnSystem = new MockTurnSystem();

    updateUI(element: UIElement): void {
        throw new Error("Method not implemented.");
    }
    updateScreenUI(element: ScreenUIElement): void {
        throw new Error("Method not implemented.");
    }
    startDebugMode(port?: number | undefined): void {
        throw new Error("Method not implemented.");
    }
    sphereTrace(
        start: Vector | [x: number, y: number, z: number],
        end: Vector | [x: number, y: number, z: number],
        radius: number
    ): TraceHit[] {
        throw new Error("Method not implemented.");
    }
    sphereOverlap(
        position: Vector | [x: number, y: number, z: number],
        radius: number
    ): GameObject[] {
        throw new Error("Method not implemented.");
    }
    showPing(
        position: Vector | [x: number, y: number, z: number],
        color: Color | [r: number, g: number, b: number, a: number],
        playSound: boolean
    ): void {
        throw new Error("Method not implemented.");
    }
    setUI(index: number, element: UIElement): void {
        throw new Error("Method not implemented.");
    }
    setSlotTeam(slot: number, team: number): void {
        throw new Error("Method not implemented.");
    }
    setSlotColor(
        slot: number,
        color: Color | [r: number, g: number, b: number, a: number]
    ): void {
        throw new Error("Method not implemented.");
    }
    setShowDiceRollMessages(show: boolean): void {
        throw new Error("Method not implemented.");
    }
    setScreenUI(index: number, element: ScreenUIElement): void {
        throw new Error("Method not implemented.");
    }
    setSavedData(data: string, key?: string | undefined): void {
        throw new Error("Method not implemented.");
    }
    setGravityMultiplier(multiplier: number): void {
        throw new Error("Method not implemented.");
    }
    setBackground(
        textureName?: string | undefined,
        packageId?: string | undefined
    ): void {
        throw new Error("Method not implemented.");
    }
    resetScripting(): void {
        throw new Error("Method not implemented.");
    }
    removeUIElement(element: UIElement): void {
        throw new Error("Method not implemented.");
    }
    removeUI(index: number): void {
        throw new Error("Method not implemented.");
    }
    removeScreenUIElement(element: ScreenUIElement): void {
        throw new Error("Method not implemented.");
    }
    removeScreenUI(index: number): void {
        throw new Error("Method not implemented.");
    }
    removeDrawingLineObject(line: DrawingLine): void {
        throw new Error("Method not implemented.");
    }
    removeDrawingLine(index: number): void {
        throw new Error("Method not implemented.");
    }
    removeCustomAction(identifier: string): void {
        throw new Error("Method not implemented.");
    }
    previousTurn(): void {
        throw new Error("Method not implemented.");
    }
    nextTurn(): void {
        throw new Error("Method not implemented.");
    }
    lineTrace(
        start: Vector | [x: number, y: number, z: number],
        end: Vector | [x: number, y: number, z: number]
    ): TraceHit[] {
        throw new Error("Method not implemented.");
    }
    importText(filename: string, packageId?: string | undefined): string {
        throw new Error("Method not implemented.");
    }
    importSoundFromURL(url: string, ignoreCache?: boolean | undefined): Sound {
        throw new Error("Method not implemented.");
    }
    importSound(
        filename: string,
        packageId?: string | undefined,
        ignoreCache?: boolean | undefined
    ): Sound {
        throw new Error("Method not implemented.");
    }
    getZoneById(zoneId: string): Zone | undefined {
        throw new Error("Method not implemented.");
    }
    getUIs(): UIElement[] {
        throw new Error("Method not implemented.");
    }
    getTemplatePackageId(templateId: string): string {
        throw new Error("Method not implemented.");
    }
    getTemplateName(templateId: string): string {
        throw new Error("Method not implemented.");
    }
    getTableHeight(
        position?: Vector | [x: number, y: number, z: number] | undefined
    ): number {
        throw new Error("Method not implemented.");
    }
    getSlotTeam(slot: number): number {
        throw new Error("Method not implemented.");
    }
    getSlotColor(slot: number): Color {
        throw new Error("Method not implemented.");
    }
    getShowDiceRollMessages(): boolean {
        throw new Error("Method not implemented.");
    }
    getScreenUIs(): ScreenUIElement[] {
        throw new Error("Method not implemented.");
    }
    getSavedData(key?: string | undefined): string {
        throw new Error("Method not implemented.");
    }
    getPlayerBySlot(slot: number): Player | undefined {
        throw new Error("Method not implemented.");
    }
    getPlayerByName(name: string): Player | undefined {
        throw new Error("Method not implemented.");
    }
    getPackageById(packageId: string): Package | undefined {
        throw new Error("Method not implemented.");
    }
    getObjectsByTemplateId(templateId: string): GameObject[] {
        throw new Error("Method not implemented.");
    }
    getObjectsByGroupId(groupId: number): GameObject[] {
        throw new Error("Method not implemented.");
    }
    getObjectGroupIds(): number[] {
        throw new Error("Method not implemented.");
    }
    getObjectById(objectId: string): GameObject | undefined {
        throw new Error("Method not implemented.");
    }
    getLabelById(labelId: string): Label | undefined {
        throw new Error("Method not implemented.");
    }
    getGravityMultiplier(): number {
        throw new Error("Method not implemented.");
    }
    getGameTime(): number {
        throw new Error("Method not implemented.");
    }
    getDrawingLines(): DrawingLine[] {
        throw new Error("Method not implemented.");
    }
    getCurrentTurn(): number {
        throw new Error("Method not implemented.");
    }
    getBackgroundPackageId(): string {
        throw new Error("Method not implemented.");
    }
    getBackgroundFilename(): string {
        throw new Error("Method not implemented.");
    }
    getAllZones(): Zone[] {
        throw new Error("Method not implemented.");
    }
    getAllTags(): string[] {
        throw new Error("Method not implemented.");
    }
    getAllTables(): StaticObject[] {
        throw new Error("Method not implemented.");
    }
    getAllPlayers(): Player[] {
        throw new Error("Method not implemented.");
    }
    getAllowedPackages(): Package[] {
        throw new Error("Method not implemented.");
    }
    getAllObjects(skipContained?: boolean | undefined): GameObject[] {
        throw new Error("Method not implemented.");
    }
    getAllLabels(): Label[] {
        throw new Error("Method not implemented.");
    }
    drawDebugSphere(
        position: Vector | [x: number, y: number, z: number],
        radius: number,
        color: Color | [r: number, g: number, b: number, a: number],
        duration: number,
        thickness?: number | undefined
    ): void {
        throw new Error("Method not implemented.");
    }
    drawDebugPoint(
        position: Vector | [x: number, y: number, z: number],
        size: number,
        color: Color | [r: number, g: number, b: number, a: number],
        duration: number
    ): void {
        throw new Error("Method not implemented.");
    }
    drawDebugLine(
        start: Vector | [x: number, y: number, z: number],
        end: Vector | [x: number, y: number, z: number],
        color: Color | [r: number, g: number, b: number, a: number],
        duration: number,
        thickness?: number | undefined
    ): void {
        throw new Error("Method not implemented.");
    }
    drawDebugBox(
        center: Vector | [x: number, y: number, z: number],
        extent: Vector | [x: number, y: number, z: number],
        orientation: Rotator | [pitch: number, yaw: number, roll: number],
        color: Color | [r: number, g: number, b: number, a: number],
        duration: number,
        thickness?: number | undefined
    ): void {
        throw new Error("Method not implemented.");
    }
    createZone(position: Vector | [x: number, y: number, z: number]): Zone {
        throw new Error("Method not implemented.");
    }
    createTableFromTemplate(
        templateId: string,
        position: Vector | [x: number, y: number, z: number]
    ): StaticObject | undefined {
        throw new Error("Method not implemented.");
    }
    createStaticObjectFromJSON(
        jsonString: string,
        position: Vector | [x: number, y: number, z: number]
    ): StaticObject | undefined {
        throw new Error("Method not implemented.");
    }
    createObjectFromTemplate(
        templateId: string,
        position: Vector | [x: number, y: number, z: number]
    ): GameObject | undefined {
        throw new Error("Method not implemented.");
    }
    createObjectFromJSON(
        jsonString: string,
        position: Vector | [x: number, y: number, z: number]
    ): GameObject | undefined {
        throw new Error("Method not implemented.");
    }
    createLabel(position: Vector | [x: number, y: number, z: number]): Label {
        throw new Error("Method not implemented.");
    }
    clearConsole(): void {
        throw new Error("Method not implemented.");
    }
    capsuleTrace(
        start: Vector | [x: number, y: number, z: number],
        end: Vector | [x: number, y: number, z: number],
        extent: Vector | [x: number, y: number, z: number],
        orientation?:
            | Rotator
            | [pitch: number, yaw: number, roll: number]
            | undefined
    ): TraceHit[] {
        throw new Error("Method not implemented.");
    }
    capsuleOverlap(
        position: Vector | [x: number, y: number, z: number],
        extent: Vector | [x: number, y: number, z: number],
        orientation?:
            | Rotator
            | [pitch: number, yaw: number, roll: number]
            | undefined
    ): GameObject[] {
        throw new Error("Method not implemented.");
    }
    broadcastChatMessage(
        message: string,
        color?: Color | [r: number, g: number, b: number, a: number] | undefined
    ): void {
        throw new Error("Method not implemented.");
    }
    boxTrace(
        start: Vector | [x: number, y: number, z: number],
        end: Vector | [x: number, y: number, z: number],
        extent: Vector | [x: number, y: number, z: number],
        orientation?:
            | Rotator
            | [pitch: number, yaw: number, roll: number]
            | undefined
    ): TraceHit[] {
        throw new Error("Method not implemented.");
    }
    boxOverlap(
        position: Vector | [x: number, y: number, z: number],
        extent: Vector | [x: number, y: number, z: number],
        orientation?:
            | Rotator
            | [pitch: number, yaw: number, roll: number]
            | undefined
    ): GameObject[] {
        throw new Error("Method not implemented.");
    }
    addUI(element: UIElement): number {
        throw new Error("Method not implemented.");
    }
    addScreenUI(element: ScreenUIElement): number {
        throw new Error("Method not implemented.");
    }
    addDrawingLine(line: DrawingLine): boolean {
        throw new Error("Method not implemented.");
    }
    addCustomAction(
        name: string,
        tooltip?: string | undefined,
        identifier?: string | undefined
    ): void {
        throw new Error("Method not implemented.");
    }
}

export { MockGameWorld as GameWorld };

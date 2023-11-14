import { Color, LightingSettings } from "@tabletop-playground/api";

export class MockLightingSettings implements LightingSettings {
    setMainLightSpecularIntensity(intensity: number): void {
        throw new Error("Method not implemented.");
    }
    setMainLightIntensity(intensity: number): void {
        throw new Error("Method not implemented.");
    }
    setMainLightColor(
        color: Color | [r: number, g: number, b: number, a: number]
    ): void {
        throw new Error("Method not implemented.");
    }
    setMainLightAzimuth(angle: number): void {
        throw new Error("Method not implemented.");
    }
    setMainLightAltitude(angle: number): void {
        throw new Error("Method not implemented.");
    }
    getMainLightSpecularIntensity(): number {
        throw new Error("Method not implemented.");
    }
    getMainLightIntensity(): number {
        throw new Error("Method not implemented.");
    }
    getMainLightColor(): Color {
        throw new Error("Method not implemented.");
    }
    getMainLightAzimuth(): number {
        throw new Error("Method not implemented.");
    }
    getMainLightAltitude(): number {
        throw new Error("Method not implemented.");
    }
}

export { MockLightingSettings as LightingSettings };

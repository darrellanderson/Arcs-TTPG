import { DemoObj } from "./demo";

describe("MyObj", () => {
    test("getValue", () => {
        const demoObj: DemoObj = new DemoObj();
        const value: number = demoObj.getValue();
        expect(value).toBe(7);
    });
});

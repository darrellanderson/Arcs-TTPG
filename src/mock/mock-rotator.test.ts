import { MockRotator } from "./mock-rotator";

it("_from", () => {
    const arg: [pitch: number, yaw: number, roll: number] = [1, 2, 3];
    const a = MockRotator._from(arg);
    expect(a.pitch).toBe(1);
    expect(a.yaw).toBe(2);
    expect(a.roll).toBe(3);
});

it("constructor", () => {
    const a = new MockRotator(1, 2, 3);
    expect(a.pitch).toBe(1);
    expect(a.yaw).toBe(2);
    expect(a.roll).toBe(3);
    expect(a[0]).toBe(1);
    expect(a[1]).toBe(2);
    expect(a[2]).toBe(3);
});

it("get/set []", () => {
    const a = new MockRotator(1, 2, 3);
    a[0] += 4;
    a[1] += 4;
    a[2] += 4;
    expect(a[0]).toBe(5);
    expect(a[1]).toBe(6);
    expect(a[2]).toBe(7);
});

it("[Symbol.iterator", () => {
    const a = new MockRotator(1, 2, 3);
    const out = [];
    for (const item of a) {
        out.push(item);
    }
    expect(out).toEqual([1, 2, 3]);
});

it("clone", () => {
    const a = new MockRotator(1, 2, 3);
    const clone = a.clone();
    expect(clone.pitch).toBe(1);
    expect(clone.yaw).toBe(2);
    expect(clone.roll).toBe(3);
});

it("equals", () => {
    const a = new MockRotator(1, 2, 3);
    const b = new MockRotator(1.1, 2.1, 3.1);
    expect(a.equals(b, 0)).toBe(false);
    expect(a.equals(b, 0.2)).toBe(true);
});

it("multiply", () => {
    const a = new MockRotator(1, 2, 3);
    const b = a.multiply(3);
    expect(a.pitch).toBe(1);
    expect(a.yaw).toBe(2);
    expect(a.roll).toBe(3);
    expect(b.pitch).toBe(3);
    expect(b.yaw).toBe(6);
    expect(b.roll).toBe(9);
});

it("negate", () => {
    const a = new MockRotator(1, 2, 3);
    const b = a.negate();
    expect(a.pitch).toBe(1);
    expect(a.yaw).toBe(2);
    expect(a.roll).toBe(3);
    expect(b.pitch).toBe(-1);
    expect(b.yaw).toBe(-2);
    expect(b.roll).toBe(-3);
});

it("toString", () => {
    const a = new MockRotator(1, 2, 3);
    const s = a.toString();
    expect(s).toBe("(P=1,Y=2,R=3)");
});

it("toVector", () => {
    const a = new MockRotator(1, 2, 3);
    const vector = a.toVector();
    expect(vector.x).toBe(1);
    expect(vector.y).toBe(2);
    expect(vector.z).toBe(3);
});

it("static.interpolateTo", () => {
    const a = new MockRotator(0, 0, 0);
    const b = new MockRotator(1, 0, 0);
    const deltaTime = 0.1;
    const animSpeed = 1;
    const c = MockRotator.interpolateTo(a, b, deltaTime, animSpeed);
    expect(c.pitch).toBeCloseTo(0.1);
    expect(c.yaw).toBe(0);
    expect(c.roll).toBe(0);
});

it("static.interpolateToConstant", () => {
    const a = new MockRotator(0, 0, 0);
    const b = new MockRotator(1, 0, 0);
    const deltaTime = 0.1;
    const animSpeed = 1;
    const c = MockRotator.interpolateToConstant(a, b, deltaTime, animSpeed);
    expect(c.pitch).toBeCloseTo(0.1);
    expect(c.yaw).toBe(0);
    expect(c.roll).toBe(0);
});

it("static.lerp", () => {
    const a = new MockRotator(0, 0, 0);
    const b = new MockRotator(1, 0, 0);
    const bShortestPath = false;
    const c = MockRotator.lerp(a, b, 0.1, bShortestPath);
    expect(c.pitch).toBeCloseTo(0.1);
    expect(c.yaw).toBe(0);
    expect(c.roll).toBe(0);
});

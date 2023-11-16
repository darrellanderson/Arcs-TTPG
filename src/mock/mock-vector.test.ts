import { MockVector } from "./mock-vector";

it("_from", () => {
    const arg: [x: number, y: number, z: number] = [1, 2, 3];
    const vector = MockVector._from(arg);
    expect(vector.x).toBe(1);
    expect(vector.y).toBe(2);
    expect(vector.z).toBe(3);
});

it("constructor", () => {
    const vector = new MockVector(1, 2, 3);
    expect(vector.x).toBe(1);
    expect(vector.y).toBe(2);
    expect(vector.z).toBe(3);
    expect(vector[0]).toBe(1);
    expect(vector[1]).toBe(2);
    expect(vector[2]).toBe(3);
});

it("get/set []", () => {
    const vector = new MockVector(1, 2, 3);
    vector[0] += 4;
    vector[1] += 4;
    vector[2] += 4;
    expect(vector[0]).toBe(5);
    expect(vector[1]).toBe(6);
    expect(vector[2]).toBe(7);
});

it("[Symbol.iterator", () => {
    const vector = new MockVector(1, 2, 3);
    const out = [];
    for (const item of vector) {
        out.push(item);
    }
    expect(out).toEqual([1, 2, 3]);
});

it("add", () => {
    const a = new MockVector(1, 2, 3);
    const b = new MockVector(5, 6, 7);
    const c = a.add(b);
    expect(a.x).toBe(1); // a + b stable
    expect(a.y).toBe(2);
    expect(a.z).toBe(3);
    expect(b.x).toBe(5);
    expect(b.y).toBe(6);
    expect(b.z).toBe(7);
    expect(c.x).toBe(6);
    expect(c.y).toBe(8);
    expect(c.z).toBe(10);
});

it("clampVectorMagnitude", () => {
    const good = new MockVector(100, 0, 0).clampVectorMagnitude(10, 1000);
    expect(good.x).toBe(100);
    expect(good.y).toBe(0);
    expect(good.z).toBe(0);
    const bad1 = new MockVector(1, 0, 0).clampVectorMagnitude(10, 1000);
    expect(bad1.x).toBe(10);
    expect(bad1.y).toBe(0);
    expect(bad1.z).toBe(0);
    const bad10K = new MockVector(10000, 0, 0).clampVectorMagnitude(10, 1000);
    expect(bad10K.x).toBe(1000);
    expect(bad10K.y).toBe(0);
    expect(bad10K.z).toBe(0);
    const zero = new MockVector(0, 0, 0).clampVectorMagnitude(1, 1);
    expect(zero.x).toBe(0);
    expect(zero.y).toBe(0);
    expect(zero.z).toBe(0);
});

it("clone", () => {
    const vector = new MockVector(1, 2, 3);
    const clone = vector.clone();
    expect(clone.x).toBe(1);
    expect(clone.y).toBe(2);
    expect(clone.z).toBe(3);
});

it("distance", () => {
    const a = new MockVector(1, 0, 0);
    const b = new MockVector(2, 0, 0);
    const distance = a.distance(b);
    expect(distance).toBe(1);
});

it("divide", () => {
    const a = new MockVector(2, 4, 6);
    const b = a.divide(2);
    const c = a.divide(0); // returns (0,0,0)
    expect(a.x).toBe(2);
    expect(a.y).toBe(4);
    expect(a.z).toBe(6);
    expect(b.x).toBe(1);
    expect(b.y).toBe(2);
    expect(b.z).toBe(3);
    expect(c.x).toBe(0);
    expect(c.y).toBe(0);
    expect(c.z).toBe(0);
});

it("dot", () => {
    const a = new MockVector(1, 2, 3);
    const b = new MockVector(5, 6, 7);
    const dot = a.dot(b);
    expect(dot).toBe(38);
});

it("equals", () => {
    const a = new MockVector(1, 2, 3);
    const b = new MockVector(1.1, 2.1, 3.1);
    expect(a.equals(b, 0)).toBe(false);
    expect(a.equals(b, 0.2)).toBe(true);
});

it("getMaxElement", () => {
    const a = new MockVector(1, 2, 3);
    const value = a.getMaxElement();
    expect(value).toBe(3);
});

it("getMinElement", () => {
    const a = new MockVector(1, 2, 3);
    const value = a.getMinElement();
    expect(value).toBe(1);
});

it("isInBox", () => {
    const a = new MockVector(1, 2, 3);
    const b = new MockVector(10, 20, 30);
    const boxOrigin: [x: number, y: number, z: number] = [0, 0, 0];
    const boxExtent: [x: number, y: number, z: number] = [5, 5, 5];
    const valueA = a.isInBox(boxOrigin, boxExtent);
    const valueB = b.isInBox(boxOrigin, boxExtent);
    expect(valueA).toBe(true);
    expect(valueB).toBe(false);
});

it("magnitude", () => {
    const a = new MockVector(1, 2, 3);
    const value = a.magnitude();
    expect(value).toBeCloseTo(3.741);
});

it("magnitudeSquared", () => {
    const a = new MockVector(1, 2, 3);
    const value = a.magnitudeSquared();
    expect(value).toBe(14);
});

it("multiply", () => {
    const a = new MockVector(1, 2, 3);
    const b = a.multiply(2);
    expect(a.x).toBe(1);
    expect(a.y).toBe(2);
    expect(a.z).toBe(3);
    expect(b.x).toBe(2);
    expect(b.y).toBe(4);
    expect(b.z).toBe(6);
});

it("negate", () => {
    const a = new MockVector(1, 2, 3);
    const b = a.negate();
    expect(a.x).toBe(1);
    expect(a.y).toBe(2);
    expect(a.z).toBe(3);
    expect(b.x).toBe(-1);
    expect(b.y).toBe(-2);
    expect(b.z).toBe(-3);
});

it("rotateAngleAxis", () => {
    const a = new MockVector(2, 0, 3.5);
    const angleDeg = 90;
    const axis = new MockVector(0, 0, 1);
    const b = a.rotateAngleAxis(angleDeg, axis);
    expect(a.x).toBe(2);
    expect(a.y).toBe(0);
    expect(a.z).toBe(3.5);
    expect(b.x).toBeCloseTo(0);
    expect(b.y).toBeCloseTo(2);
    expect(b.z).toBe(3.5);

    // Only [0,0,1] axis supported by Mock.
    const not001 = new MockVector(1, 2, 3);
    expect(() => {
        a.rotateAngleAxis(angleDeg, not001);
    }).toThrow();
});

it("subract", () => {
    const a = new MockVector(1, 2, 3);
    const b = new MockVector(5, 7, 9);
    const c = a.subtract(b);
    expect(a.x).toBe(1); // a + b stable
    expect(a.y).toBe(2);
    expect(a.z).toBe(3);
    expect(b.x).toBe(5);
    expect(b.y).toBe(7);
    expect(b.z).toBe(9);
    expect(c.x).toBe(-4);
    expect(c.y).toBe(-5);
    expect(c.z).toBe(-6);
});

it("toColor", () => {
    const vector = new MockVector(1, 2, 3);
    const color = vector.toColor();
    expect(color.toString()).toBe("(R=1,G=2,B=3,A=1)");
});

it("toRotator", () => {
    const vector = new MockVector(1, 2, 3);
    const rotator = vector.toRotator();
    expect(rotator.toString()).toBe("(P=1,Y=2,R=3)");
});

it("toString", () => {
    const vector = new MockVector(1, 2, 3);
    const s = vector.toString();
    expect(s).toBe("(X=1,Y=2,Z=3)");
});

it("unit", () => {
    const vector = new MockVector(10, 0, 0);
    const unit = vector.unit();
    expect(unit.x).toBe(1);
    expect(unit.y).toBe(0);
    expect(unit.z).toBe(0);
});

it("static.getVectorArrayAverage", () => {
    const a = new MockVector(0, 0, 0);
    const b = new MockVector(1, 0, 0);
    const c = MockVector.getVectorArrayAverage([a, b]);
    expect(c.x).toBeCloseTo(0.5);
    expect(c.y).toBe(0);
    expect(c.z).toBe(0);
});

it("static.interpolateTo", () => {
    const a = new MockVector(0, 0, 0);
    const b = new MockVector(1, 0, 0);
    const deltaTime = 0.1;
    const animSpeed = 1;
    const c = MockVector.interpolateTo(a, b, deltaTime, animSpeed);
    expect(c.x).toBeCloseTo(0.1);
    expect(c.y).toBe(0);
    expect(c.z).toBe(0);
});

it("static.interpolateToConstant", () => {
    const a = new MockVector(0, 0, 0);
    const b = new MockVector(1, 0, 0);
    const deltaTime = 0.1;
    const animSpeed = 1;
    const c = MockVector.interpolateToConstant(a, b, deltaTime, animSpeed);
    expect(c.x).toBeCloseTo(0.1);
    expect(c.y).toBe(0);
    expect(c.z).toBe(0);
});

it("static.lerp", () => {
    const a = new MockVector(0, 0, 0);
    const b = new MockVector(1, 0, 0);
    const c = MockVector.lerp(a, b, 0.1);
    expect(c.x).toBeCloseTo(0.1);
    expect(c.y).toBe(0);
    expect(c.z).toBe(0);
});

it("static.randomPointInBoundingBox", () => {
    const origin = new MockVector(1, 2, 3);
    const boxExtent = new MockVector(0.1, 0.2, 0.3);
    const point = MockVector.randomPointInBoundingBox(origin, boxExtent);
    const d = origin.distance(point);
    expect(d).toBeLessThan(1);
});

it("static.randomUnitVector", () => {
    let point = MockVector.randomUnitVector();
    let d = point.magnitude();
    expect(d).toBeCloseTo(1);

    // Verify if seed is (0,0,0) still gives unit result.
    jest.spyOn(global.Math, "random").mockReturnValue(0.5);
    point = MockVector.randomUnitVector();
    d = point.magnitude();
    expect(d).toBeCloseTo(1);
    jest.spyOn(global.Math, "random").mockRestore();
});

import { MockColor } from "./mock-color";

it("_from", () => {
    const a = MockColor._from([1, 2, 3, 4]);
    expect(a.r).toBe(1);
    expect(a.g).toBe(2);
    expect(a.b).toBe(3);
    expect(a.a).toBe(4);
    const b = MockColor._from(a);
    expect(b.r).toBe(1);
    expect(b.g).toBe(2);
    expect(b.b).toBe(3);
    expect(b.a).toBe(4);
});

it("constructor", () => {
    const a = new MockColor(1, 2, 3, 4);
    expect(a.r).toBe(1);
    expect(a.g).toBe(2);
    expect(a.b).toBe(3);
    expect(a.a).toBe(4);
    expect(a[0]).toBe(1);
    expect(a[1]).toBe(2);
    expect(a[2]).toBe(3);
    expect(a[3]).toBe(4);
});

it("get/set []", () => {
    const a = new MockColor(1, 2, 3, 4);
    a[0] += 1;
    a[1] += 2;
    a[2] += 3;
    a[3] += 4;
    expect(a[0]).toBe(2);
    expect(a[1]).toBe(4);
    expect(a[2]).toBe(6);
    expect(a[3]).toBe(8);
});

it("[Symbol.iterator", () => {
    const a = new MockColor(1, 2, 3, 4);
    const out: number[] = [];
    for (const item of a) {
        out.push(item);
    }
    expect(out).toEqual([1, 2, 3, 4]);
});

it("clone", () => {
    const a = new MockColor(1, 2, 3, 4);
    const clone = a.clone();
    expect(clone.r).toBe(1);
    expect(clone.g).toBe(2);
    expect(clone.b).toBe(3);
    expect(clone.a).toBe(4);
});

it("multiply", () => {
    const a = new MockColor(1, 2, 3, 4);
    const b = a.multiply(3);
    expect(b.r).toBe(3);
    expect(b.g).toBe(6);
    expect(b.b).toBe(9);
    expect(b.a).toBe(12);
});

it("toHex", () => {
    const a = new MockColor(0, 0.5, 0.75, 1);
    const hex = a.toHex();
    expect(hex).toBe("0080BFFF");
});

it("toString", () => {
    const a = new MockColor(1, 2, 3, 4);
    const s = a.toString();
    expect(s).toBe("(R=1,G=2,B=3,A=4)");
});

it("toVector", () => {
    const a = new MockColor(1, 2, 3, 4);
    const vector = a.toVector();
    expect(vector.x).toBe(1);
    expect(vector.y).toBe(2);
    expect(vector.z).toBe(3);
});

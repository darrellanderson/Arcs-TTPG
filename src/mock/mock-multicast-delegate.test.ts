import { MockMulticastDelegate } from ".";

it("constructor", () => {
    new MockMulticastDelegate<number>();
});

it("trigger", () => {
    let total = 0;
    const handler = (value: number) => {
        total += value;
    };

    const multicastDelegate = new MockMulticastDelegate<
        (value: number) => void
    >();
    multicastDelegate.add(handler);

    multicastDelegate.trigger(7);
    multicastDelegate.trigger(2);
    expect(total).toBe(9);
});

it("add/remove", () => {
    let total = 0;
    const handler = (value: number) => {
        total += value;
    };

    const multicastDelegate = new MockMulticastDelegate<
        (value: number) => void
    >();
    multicastDelegate.add(handler);

    multicastDelegate.trigger(7);
    multicastDelegate.remove(handler);
    multicastDelegate.trigger(2);
    expect(total).toBe(7);
});

it("add/clear", () => {
    let total = 0;
    const handler = (value: number) => {
        total += value;
    };

    const multicastDelegate = new MockMulticastDelegate<
        (value: number) => void
    >();
    multicastDelegate.add(handler);

    multicastDelegate.trigger(7);
    multicastDelegate.clear();
    multicastDelegate.trigger(2);
    expect(total).toBe(7);
});

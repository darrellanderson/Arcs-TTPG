import { MockGameObject } from "./mock-game-object";
import { MockGameWorld } from "./mock-game-world";

export * from "./mock-card";
export * from "./mock-card-details";
export * from "./mock-game-object";
export * from "./mock-game-world";
export * from "./mock-multicast-delegate";
export * from "./mock-rotator";
export * from "./mock-static-object";
export * from "./mock-vector";

const world = new MockGameWorld();
export { world };

const refObject = undefined;
export { refObject };

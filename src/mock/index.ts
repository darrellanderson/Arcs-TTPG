import { FetchOptions, FetchResponse } from "@tabletop-playground/api";
import { MockGameWorld } from "./mock-game-world";
import { MockGlobalScriptingEvents } from "./mock-global-scripting-events";

// % ls -1 | awk '{print "export * from @./" $1 "@;"}' | sed -e 's/@/"/g' -e "s/\.ts//" | grep -v test.ts

export * from "./mock-card-details.test";
export * from "./mock-card-details";
export * from "./mock-card-holder";
export * from "./mock-card.test";
export * from "./mock-card";
export * from "./mock-color.test";
export * from "./mock-color";
export * from "./mock-container";
export * from "./mock-dice";
export * from "./mock-game-object.test";
export * from "./mock-game-object";
export * from "./mock-game-world";
export * from "./mock-global-grid";
export * from "./mock-global-scripting-events";
export * from "./mock-lighting-settings";
export * from "./mock-multicast-delegate.test";
export * from "./mock-multicast-delegate";
export * from "./mock-multistate-object";
export * from "./mock-player-permission";
export * from "./mock-player";
export * from "./mock-rotator.test";
export * from "./mock-rotator";
export * from "./mock-snap-point";
export * from "./mock-static-object.test";
export * from "./mock-static-object";
export * from "./mock-turn-system";
export * from "./mock-vector.test";
export * from "./mock-vector";
export * from "./mock-zone";

function fetch(url: string, options?: FetchOptions): Promise<FetchResponse> {
    throw new Error("Method not implemented.");
}
const globalEvents = new MockGlobalScriptingEvents();
const world = new MockGameWorld();
export { fetch, globalEvents, world };

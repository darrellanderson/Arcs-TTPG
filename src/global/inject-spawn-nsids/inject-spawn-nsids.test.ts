import { Spawn } from "ttpg-darrell";
import { InjectSpawnNSIDs } from "./inject-spawn-nsids"; // "tooling/extract-nsid-to-template-id.ts"

it("inject-spawn-nsids", () => {
    Spawn.clear();

    const injectedNsid = "board:base/map";
    expect(Spawn.has(injectedNsid)).toBeFalsy();

    new InjectSpawnNSIDs().init();
    expect(Spawn.has(injectedNsid)).toBeTruthy();

    Spawn.clear();
});

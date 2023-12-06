import nsidToTemplateId from "./auto-nsid-to-template-id.json";
import { AbstractGlobal, Spawn } from "ttpg-darrell";

export class InjectSpawnNSIDs implements AbstractGlobal {
    init(): void {
        Spawn.inject(nsidToTemplateId);
    }
}

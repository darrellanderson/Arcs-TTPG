import nsidToTemplateId from "./auto-nsid-to-template-id.json";
import { IGlobal, Spawn } from "ttpg-darrell";

export class InjectSpawnNSIDs implements IGlobal {
    init(): void {
        Spawn.inject(nsidToTemplateId);
    }
}

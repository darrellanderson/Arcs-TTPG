import { GameObject, Rotator, Vector, world } from "@tabletop-playground/api";

const _nsidToSpawnRecord: {
    [key: string]: { templateId: string; name: string; desc: string };
} = {};

class SpawnRecord {
    readonly nsid: string;
    readonly templateId: string;
    readonly name?: string;
    readonly desc?: string;

    constructor(params: any) {
        if (typeof params !== "object") {
            throw new Error("SpawnRecord: params not an object");
        }

        if (typeof params.nsid !== "string") {
            throw new Error("SpawnRecord: bad nsid");
        }
        this.nsid = params.nsid;

        if (typeof params.templateId !== "string") {
            throw new Error("SpawnRecord: bad templateId");
        }
        this.templateId = params.templateId;

        if (params.name) {
            if (typeof params.name !== "string" || params.name.length >= 100) {
                throw new Error("SpawnRecord: bad name");
            }
            this.name = params.name;
        }
        if (params.desc) {
            if (typeof params.desc !== "string" || params.desc.length >= 2000) {
                throw new Error("SpawnRecord: bad name");
            }
            this.desc = params.desc;
        }
    }
}

export class Spawn {
    private readonly _nsidToSpawnRecord: { [key: string]: SpawnRecord } = {};

    inject(nsidToSpawnRecord: any) {
        if (typeof nsidToSpawnRecord !== "object") {
            throw new Error("Spawn.inject: bad nsidToSpawnRecord");
        }
        for (const [k, v] of Object.entries(nsidToSpawnRecord)) {
            if (typeof k !== "string" || typeof v !== "string") {
                throw new Error(`Spawn.inject: bad entry ["${k}"]="${v}"`);
            }
            this._nsidToSpawnRecord[k] = new SpawnRecord(v);
        }
    }

    spawn(
        nsid: string,
        pos: Vector | [x: number, y: number, z: number],
        rot: Rotator | [pitch: number, yaw: number, roll: number]
    ): GameObject {
        const { templateId, name, desc } = _nsidToSpawnRecord[nsid];
        if (!templateId) {
            throw new Error(`Spawn.spawn no templateId for nsid "${nsid}"`);
        }

        const obj = world.createObjectFromTemplate(templateId, pos);
        if (!(obj instanceof GameObject)) {
            throw new Error(
                `Spawn.spawn failed for nsid "${nsid}" (templateId "${templateId}")`
            );
        }

        obj.setName(name);
        obj.setDescription(desc);
        obj.setRotation(rot);
        return obj;
    }
}

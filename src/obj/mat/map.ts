// Create a "don't stack" zone in the action card area for flipped cards near other cards.

import {
    GameObject,
    Vector,
    Zone,
    ZonePermission,
    refObject,
    world,
} from "@tabletop-playground/api";

const ZONE_ID = "__map_initiative_region__";

class MapInitiativeZone {
    private readonly _obj: GameObject;
    private readonly _zone: Zone;

    static findOrCreateZone(): Zone {
        for (const zone of world.getAllZones()) {
            if (zone.getId() === ZONE_ID) {
                zone.destroy();
            }
        }

        console.log("map: create zone");
        const zone: Zone = world.createZone([0, 0, world.getTableHeight()]);
        zone.setId(ZONE_ID);
        zone.setAlwaysVisible(false);
        zone.setColor([1, 0, 0, 0.4]);
        zone.setScale([19, 11, 10]);
        zone.setStacking(ZonePermission.Nobody);
        return zone;
    }

    constructor(obj: GameObject) {
        if (!obj) {
            throw new Error("bad game object");
        }
        this._obj = obj;
        this._zone = MapInitiativeZone.findOrCreateZone();

        // Move zone when linked lobject moves.  CAREFUL, onMovementStopped can be spammy!
        let lastPos: Vector = obj.getPosition();
        let lastRot: Vector = obj.getRotation().toVector();
        obj.onMovementStopped.add(() => {
            const newPos: Vector = obj.getPosition();
            const newRot: Vector = obj.getRotation().toVector();
            const dPos = lastPos.subtract(newPos).magnitudeSquared();
            const dRot = lastRot.subtract(newRot).magnitudeSquared();
            if (dPos > 0.01 || dRot > 0.01) {
                lastPos = newPos;
                lastRot = newRot;
                this.updateZone();
            }
        });

        obj.onDestroyed.add(() => {
            this._zone.destroy();
        });

        process.nextTick(() => {
            this.updateZone();
        });
    }

    updateZone() {
        console.log("map: update zone");
        const pos = this._obj.localPositionToWorld([4, -37, 5]);
        const rot = this._obj.getRotation();
        this._zone.setPosition(pos);
        this._zone.setRotation(rot);
    }
}

new MapInitiativeZone(refObject);

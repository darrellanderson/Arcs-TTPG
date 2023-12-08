import {
    Card,
    GameObject,
    ObjectType,
    SnapPoint,
    world,
} from "@tabletop-playground/api";
import { AbstractSetup, LayoutObjects, NSID, Spawn } from "ttpg-darrell";

export class SetupMap extends AbstractSetup {
    readonly _map: GameObject;

    constructor() {
        super();
        this._map = Spawn.spawnOrThrow("board:base/map", [0, 0, 0]);
    }

    getMapGameObject(): GameObject {
        return this._map;
    }

    getLayoutObjects(): LayoutObjects {
        const layoutObjects = new LayoutObjects().add(this._map);
        layoutObjects.afterLayout.add(() => {
            this._afterLayout();
        });
        return layoutObjects;
    }

    _afterLayout() {
        this._map.setObjectType(ObjectType.Ground);

        this._addActionDeck();
        this._addAmbitionMarkers();
        this._addZeroMarker();
        this._addChapterMarker();
    }

    _addActionDeck() {
        const snapPoints: SnapPoint[] = this._map
            .getAllSnapPoints()
            .filter((p) => p.getTags().includes("card.action.discard"));
        if (snapPoints.length !== 1) {
            throw new Error(`bad snap point count (${snapPoints.length})`);
        }
        const snapPoint = snapPoints[0];
        const above = snapPoint.getGlobalPosition().add([0, 0, 10]);
        const deck = Spawn.spawnOrThrow("card.action:base/*", above) as Card;
        deck.snapToGround(); // move within snap range
        deck.snap(); // apply snap point rotation

        // Move 4p cards to the side.
        const nsids: string[] = NSID.getDeck(deck);
        let moveCards: Card | undefined;
        for (let i = nsids.length - 1; i >= 0; i--) {
            const nsid: string = nsids[i];
            const parsed = NSID.parse(nsid);
            const name0: string | undefined = parsed?.name[0];
            if (name0 === "1" || name0 === "7") {
                const numCards = 1;
                const fromFront = false;
                const offset = i;
                const keep = false;
                const card = deck.takeCards(numCards, fromFront, offset, keep);
                if (!card) {
                    throw new Error("takeCards");
                }
                if (!moveCards) {
                    moveCards = card;
                } else {
                    moveCards.addCards(card);
                }
            }
        }
        if (moveCards) {
            moveCards.setRotation(deck.getRotation().compose([0, 90, 0]));
            moveCards.setPosition(deck.getPosition().add([0, 0, 10]));
            moveCards.snapToGround();
        }
    }

    _addAmbitionMarkers() {
        const snapPoints: SnapPoint[] = this._map
            .getAllSnapPoints()
            .filter((p) => p.getTags().includes("ambition-marker"));
        if (snapPoints.length !== 3) {
            throw new Error(`bad snap point count (${snapPoints.length})`);
        }
        const nsids: string[] = [
            "token.ambition:base/2-0-4-2",
            "token.ambition:base/3-2-6-3",
            "token.ambition:base/5-3-9-4",
        ];
        for (let i = 0; i < snapPoints.length; i++) {
            const snapPoint = snapPoints[i];
            const nsid = nsids[i];
            const above = snapPoint.getGlobalPosition().add([0, 0, 10]);
            const obj = Spawn.spawnOrThrow(nsid, above);
            obj.snapToGround(); // move within snap range
            obj.snap(); // apply snap point rotation
        }
    }

    _addZeroMarker() {
        const snapPoints: SnapPoint[] = this._map
            .getAllSnapPoints()
            .filter((p) => p.getTags().includes("zero-marker"));
        if (snapPoints.length !== 1) {
            throw new Error(`bad snap point count (${snapPoints.length})`);
        }
        const snapPoint = snapPoints[0];
        const above = snapPoint.getGlobalPosition().add([0, 0, 10]);
        const obj = Spawn.spawnOrThrow("token:base/zero-marker", above);
        obj.snapToGround(); // move within snap range
        obj.snap(); // apply snap point rotation
    }

    _addChapterMarker() {
        const snapPoints: SnapPoint[] = this._map
            .getAllSnapPoints()
            .filter((p) => p.getTags().includes("chapter-marker"));
        if (snapPoints.length !== 5) {
            throw new Error(`bad snap point count (${snapPoints.length})`);
        }
        const snapPoint = snapPoints[0];
        const above = snapPoint.getGlobalPosition().add([0, 0, 10]);
        const obj = Spawn.spawnOrThrow("token:base/chapter-marker", above);
        obj.snapToGround(); // move within snap range
        obj.snap(); // apply snap point rotation
    }
}

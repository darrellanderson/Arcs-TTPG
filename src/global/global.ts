console.log("----- GLOBAL -----");

import {
    ErrorHandler,
    GlobalInit,
    IGlobal,
    LeaveSeat,
    OnCardBecameSingletonOrDeck,
} from "ttpg-darrell";
import { ArcsTurnOrder } from "./arcs-turn-order/arcs-turn-order";
import { CourtCardBury } from "./context-menu/court-card-bury/court-card-bury";
import { CourtCardScrap } from "./context-menu/court-card-scrap/court-card-scrap";
import { CourtCardSecure } from "./context-menu/court-card-secure/court-card-secure";
import { DiceReport } from "./dice-report/dice-report";
import { InjectSpawnNSIDs } from "./inject-spawn-nsids/inject-spawn-nsids";
import {
    RecycleAgentContainer,
    RecycleAgentMat,
} from "./garbage-handlers/recycle-agent";
import { RecycleAmbitionToken } from "./garbage-handlers/recycle-ambition-token";
import { RecycleCardAction } from "./garbage-handlers/recycle-card-action";
import { RecycleCardCourt } from "./garbage-handlers/recycle-card-court";
import { RecycleCity } from "./garbage-handlers/recycle-city";
import { RecycleDice } from "./garbage-handlers/recycle-dice";
import { RecyclePowerMarker } from "./garbage-handlers/recycle-power-marker";
import { RecycleResources } from "./garbage-handlers/recycle-resources";
import {
    RecycleShipContainer,
    RecycleShipMat,
} from "./garbage-handlers/recycle-ship";
import {
    RecycleStarportContainer,
    RecycleStarportMat,
} from "./garbage-handlers/recycle-starport";
import { RecycleZeroMarker } from "./garbage-handlers/recycle-zero-marker";

const iGlobals: Array<IGlobal> = [
    // Inject first!
    new InjectSpawnNSIDs(),

    new LeaveSeat(),
    new ErrorHandler(),
    new OnCardBecameSingletonOrDeck(),
    new ArcsTurnOrder(),
    new CourtCardBury(),
    new CourtCardScrap(),
    new CourtCardSecure(),
    new DiceReport(),
    new RecycleAgentContainer(),
    new RecycleAgentMat(),
    new RecycleAmbitionToken(),
    new RecycleCardAction(),
    new RecycleCardCourt(),
    new RecycleCity(),
    new RecycleDice(),
    new RecyclePowerMarker(),
    new RecycleResources(),
    new RecycleShipContainer(),
    new RecycleShipMat(),
    new RecycleStarportContainer(),
    new RecycleStarportMat(),
    new RecycleZeroMarker(),
];

// ------------------------------------

GlobalInit.runGlobalInit(iGlobals);

// Export something bogus for import to appear "useful".
export {};

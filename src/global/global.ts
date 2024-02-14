console.log("----- GLOBAL -----");

import {
    ErrorHandler,
    GlobalInit,
    IGlobal,
    LeaveSeat,
    OnCardBecameSingletonOrDeck,
} from "ttpg-darrell";

const iGlobals: IGlobal[] = [];

iGlobals.push(new LeaveSeat());
iGlobals.push(new ErrorHandler());
iGlobals.push(new OnCardBecameSingletonOrDeck());

// ------------------------------------

import { InjectSpawnNSIDs } from "./inject-spawn-nsids/inject-spawn-nsids";
iGlobals.push(new InjectSpawnNSIDs());

// ------------------------------------

import { ArcsTurnOrder } from "./arcs-turn-order/arcs-turn-order";
iGlobals.push(new ArcsTurnOrder());

import { CourtCardBury } from "./context-menu/court-card-bury/court-card-bury";
iGlobals.push(new CourtCardBury());

import { DiceReport } from "./dice-report/dice-report";
iGlobals.push(new DiceReport());

// ------------------------------------

import {
    RecycleAgentContainer,
    RecycleAgentMat,
} from "./garbage-handlers/recycle-agent";
iGlobals.push(new RecycleAgentContainer());
iGlobals.push(new RecycleAgentMat());

import { RecycleAmbitionToken } from "./garbage-handlers/recycle-ambition-token";
iGlobals.push(new RecycleAmbitionToken());

import { RecycleCardAction } from "./garbage-handlers/recycle-card-action";
iGlobals.push(new RecycleCardAction());

import { RecycleCardCourt } from "./garbage-handlers/recycle-card-court";
iGlobals.push(new RecycleCardCourt());

import { RecycleCity } from "./garbage-handlers/recycle-city";
iGlobals.push(new RecycleCity());

import { RecycleDice } from "./garbage-handlers/recycle-dice";
iGlobals.push(new RecycleDice());

import { RecyclePowerMarker } from "./garbage-handlers/recycle-power-marker";
iGlobals.push(new RecyclePowerMarker());

import { RecycleResources } from "./garbage-handlers/recycle-resources";
iGlobals.push(new RecycleResources());

import {
    RecycleShipContainer,
    RecycleShipMat,
} from "./garbage-handlers/recycle-ship";
iGlobals.push(new RecycleShipContainer());
iGlobals.push(new RecycleShipMat());

import {
    RecycleStarportContainer,
    RecycleStarportMat,
} from "./garbage-handlers/recycle-starport";
iGlobals.push(new RecycleStarportContainer());
iGlobals.push(new RecycleStarportMat());

import { RecycleZeroMarker } from "./garbage-handlers/recycle-zero-marker";
iGlobals.push(new RecycleZeroMarker());

// ------------------------------------

GlobalInit.runGlobalInit(iGlobals);

// Export something bogus for import to appear "useful".
export {};

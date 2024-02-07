console.log("----- GLOBAL -----");

const abstractGlobals: AbstractGlobal[] = [];

import { AbstractGlobal, ErrorHandler, LeaveSeat } from "ttpg-darrell";
abstractGlobals.push(new LeaveSeat());
abstractGlobals.push(new ErrorHandler());

// ------------------------------------

import { InjectSpawnNSIDs } from "./inject-spawn-nsids/inject-spawn-nsids";
abstractGlobals.push(new InjectSpawnNSIDs());

// ------------------------------------

import { DiceReport } from "./dice-report/dice-report";
abstractGlobals.push(new DiceReport());

// ------------------------------------

import {
    RecycleAgentContainer,
    RecycleAgentMat,
} from "./garbage-handlers/recycle-agent";
abstractGlobals.push(new RecycleAgentContainer());
abstractGlobals.push(new RecycleAgentMat());

import { RecycleAmbitionToken } from "./garbage-handlers/recycle-ambition-token";
abstractGlobals.push(new RecycleAmbitionToken());

import { RecycleCardAction } from "./garbage-handlers/recycle-card-action";
abstractGlobals.push(new RecycleCardAction());

import { RecycleCardCourt } from "./garbage-handlers/recycle-card-court";
abstractGlobals.push(new RecycleCardCourt());

import { RecycleCity } from "./garbage-handlers/recycle-city";
abstractGlobals.push(new RecycleCity());

import { RecycleDice } from "./garbage-handlers/recycle-dice";
abstractGlobals.push(new RecycleDice());

import { RecyclePowerMarker } from "./garbage-handlers/recycle-power-marker";
abstractGlobals.push(new RecyclePowerMarker());

import { RecycleResources } from "./garbage-handlers/recycle-resources";
abstractGlobals.push(new RecycleResources());

import {
    RecycleShipContainer,
    RecycleShipMat,
} from "./garbage-handlers/recycle-ship";
abstractGlobals.push(new RecycleShipContainer());
abstractGlobals.push(new RecycleShipMat());

import {
    RecycleStarportContainer,
    RecycleStarportMat,
} from "./garbage-handlers/recycle-starport";
abstractGlobals.push(new RecycleStarportContainer());
abstractGlobals.push(new RecycleStarportMat());

import { RecycleZeroMarker } from "./garbage-handlers/recycle-zero-marker";
abstractGlobals.push(new RecycleZeroMarker());

// ------------------------------------

AbstractGlobal.runAbstractGlobalInit(abstractGlobals);

// Export something bogus for import to appear "useful".
export {};

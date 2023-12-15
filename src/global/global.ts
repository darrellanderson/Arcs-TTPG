console.log("----- GLOBAL -----");

import { InjectSpawnNSIDs } from "./inject-spawn-nsids/inject-spawn-nsids";
new InjectSpawnNSIDs().init();

// ------------------------------------

import { DiceReport } from "./dice-report/dice-report";
new DiceReport().init();

// ------------------------------------

import {
    RecycleAgentContainer,
    RecycleAgentMat,
} from "./garbage-handlers/recycle-agent";
new RecycleAgentContainer().init();
new RecycleAgentMat().init();

import { RecycleAmbitionToken } from "./garbage-handlers/recycle-ambition-token";
new RecycleAmbitionToken().init();

import { RecycleCardAction } from "./garbage-handlers/recycle-card-action";
new RecycleCardAction().init();

import { RecycleCardCourt } from "./garbage-handlers/recycle-card-court";
new RecycleCardCourt().init();

import { RecycleCity } from "./garbage-handlers/recycle-city";
new RecycleCity().init();

import { RecycleDice } from "./garbage-handlers/recycle-dice";
new RecycleDice().init();

import { RecyclePowerMarker } from "./garbage-handlers/recycle-power-marker";
new RecyclePowerMarker().init();

import { RecycleResources } from "./garbage-handlers/recycle-resources";
new RecycleResources().init();

import {
    RecycleShipContainer,
    RecycleShipMat,
} from "./garbage-handlers/recycle-ship";
new RecycleShipContainer().init();
new RecycleShipMat().init();

import {
    RecycleStarportContainer,
    RecycleStarportMat,
} from "./garbage-handlers/recycle-starport";
new RecycleStarportContainer().init();
new RecycleStarportMat().init();

import { RecycleZeroMarker } from "./garbage-handlers/recycle-zero-marker";
new RecycleZeroMarker().init();

// ------------------------------------

import { LeaveSeat } from "ttpg-darrell";
new LeaveSeat().init();

// Export something bogus for import to appear "useful".
export {};

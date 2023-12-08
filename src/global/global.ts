import { InjectSpawnNSIDs } from "./inject-spawn-nsids/inject-spawn-nsids";
new InjectSpawnNSIDs().init();

// ------------------------------------

import { RecycleAgent } from "./garbage-handlers/recycle-agent";
new RecycleAgent().init();

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

import { RecycleShip } from "./garbage-handlers/recycle-ship";
new RecycleShip().init();

import { RecycleStarport } from "./garbage-handlers/recycle-starport";
new RecycleStarport().init();

// ------------------------------------

import { LeaveSeat } from "ttpg-darrell";
new LeaveSeat().init();

// Export something bogus for import to appear "useful".
export {};

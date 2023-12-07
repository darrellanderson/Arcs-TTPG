import { InjectSpawnNSIDs } from "./inject-spawn-nsids/inject-spawn-nsids";
new InjectSpawnNSIDs().init();

import { LeaveSeat } from "ttpg-darrell";
new LeaveSeat().init();

import { RecycleCardAction } from "./garbage-handlers/recycle-card-action";
new RecycleCardAction().init();

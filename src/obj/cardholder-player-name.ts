import { refObject } from "@tabletop-playground/api";
import { PlayerNameTakeSeat } from "ttpg-darrell";

// Wait a frame to:
// (1) let creator finish setting up if a new object,
// (2) let player data become valid if (re)loading.
const obj = refObject; // refObject gets cleared end of frame
process.nextTick(() => {
    new PlayerNameTakeSeat(obj);
});

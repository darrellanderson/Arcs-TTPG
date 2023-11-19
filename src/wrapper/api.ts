let _world: any;
let _GameWorld: any;

const isTTPG =
    "platform" in process && process.platform === "TabletopPlayground";
if (isTTPG) {
    console.log("wrapper/api: @tabletop-playground/api");
    const { world, GameWorld } = require("@tabletop-playground/api");
    _world = world;
    _GameWorld = GameWorld;
} else {
    console.log("wrapper/api: mock");
    const { MockGameWorld } = require("../mock/mock-game-world");
    _world = new MockGameWorld();
    _GameWorld = MockGameWorld;
}

export { _GameWorld as GameWorld, _world as world };

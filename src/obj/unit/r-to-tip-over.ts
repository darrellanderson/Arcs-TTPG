import {
    GameObject,
    Player,
    Rotator,
    refObject,
} from "@tabletop-playground/api";

refObject.onFlipUpright.add((object: GameObject, player: Player) => {
    process.nextTick(() => {
        const msg = "Use [R] to tip over/upright";
        player.showMessage(msg);
        player.sendChatMessage(msg, [1, 0, 0, 1]);
    });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
refObject.onPrimaryAction.add((object: GameObject, player: Player) => {
    process.nextTick(() => {
        const rot = object.getRotation();
        const dotZ = rot.getUpVector().dot([0, 0, 1]);
        const isUpright = dotZ > 0.5; // 1 = upright, -1 = upside down

        // Lift slightly.
        const above = object.getPosition().add([0, 0, object.getSize().z + 1]);
        object.setPosition(above, 0);

        // Rotate sideways or upright.
        const pitch = new Rotator(isUpright ? -90 : 90, 0, 0);
        object.setRotation(pitch.compose(rot));

        //object.snapToGround();
    });
});

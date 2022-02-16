export default class Physics {
    static resolveCollision(rect1, rect2, keyboard) {
        const dx = rect1.x + rect1.width / 2 - (rect2.x + rect2.width / 2);
        const dy = rect1.y + rect1.height / 2 - (rect2.y + rect2.height / 2);

        const aw = (rect1.width + rect2.width) / 2;
        const ah = (rect1.height + rect2.height) / 2;

        if (Math.abs(dx) > aw || Math.abs(dy) > ah) return false;

        if (Math.abs(dx / rect1.width) > Math.abs(dy / rect1.height)) {
            if(dx < 0) {
                keyboard.worldX -= keyboard.worldSpeed;
            } else {
                keyboard.worldX += keyboard.worldSpeed;
            }
        } else {
            if(dy < 0) {
                keyboard.worldY -= keyboard.worldSpeed;
            } else {
                keyboard.worldY += keyboard.worldSpeed;
            }
        }

        return true;
    }

    // static resolveCollision(rect1, rect2, keyboard) {
    // }
}

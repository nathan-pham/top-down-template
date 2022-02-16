import Physics from "./Physics.js";

export default class Component {
    name = "<component>";
    layer = 1;

    size = { width: 0, height: 0 };
    x = 0;
    y = 0;

    action = "idle";

    constructor({ sprites = {}, animations = {} } = {}) {
        this.sprites = sprites;
        this.animations = animations;
    }

    setAction(action) {
        if (action !== this.action) {
            this.action = action;
        }
    }

    getAnimation(time) {
        return this.animations[this.action][time % this.animations[this.action].length];
    }

    get bbox() {
        return {
            x: this.x,
            y: this.y,
            ...this.size,
        };
    }

    bbox(keyboard) {
        return keyboard
            ? {
                  x: this.x + keyboard.worldX,
                  y: this.y + keyboard.worldY,
                  ...this.size,
              }
            : this.bbox;
    }

    collidable(app) {
        const keyboard = app.find((o) => o.name.includes("keyboard"));
        const player = app.find((o) => o.name.includes("player"));

        const collisions = Physics.checkCollision(this.bbox(keyboard), player.bbox);

        if (collisions) {
            if (player.direction == "left") {
                keyboard.worldX -= keyboard.worldSpeed;
            } else if (player.direction == "right") {
                keyboard.worldX += keyboard.worldSpeed;
            } else if (player.direction == "forward") {
                keyboard.worldY += keyboard.worldSpeed;
            } else if (player.direction == "backward") {
                keyboard.worldY -= keyboard.worldSpeed;
            }
        }
    }

    update(app) {}
    render(app) {}

    core(app) {
        this.update(app);
        this.render(app);
    }
}

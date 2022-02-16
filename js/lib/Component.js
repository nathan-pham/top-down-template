import Physics from "./Physics.js";

export default class Component {
    name = "<component>";
    layer = 1;

    size = { width: 0, height: 0 };
    x = 0;
    y = 0;

    action = "idle";
    checkCollisions = false;

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

    bbox(keyboard) {
        return keyboard
            ? {
                  x: this.x + keyboard.worldX,
                  y: this.y + keyboard.worldY,
                  ...this.size,
              }
            : {
                  x: this.x,
                  y: this.y,
                  ...this.size,
              };
    }

    collidable(app) {
        const keyboard = app.find((o) => o.name.includes("keyboard"));
        const player = app.find((o) => o.name.includes("player"));

        Physics.resolveCollision(this.bbox(keyboard), player.bbox(), keyboard);
    }

    update(app) {
        if (this.checkCollisions) {
            this.collidable(app);
        }
    }
    render(app) {}

    renderBBox(app) {
        if (this.checkCollisions || this.name == "player") {
            const bbox = this.bbox(app.find("keyboard"));
            app.ctx.strokeStyle = "red";
            app.ctx.strokeRect(bbox.x, bbox.y, bbox.width, bbox.height);
        }
    }
}

import Component from "/js/lib/Component.js";

export default class Player extends Component {
    name = "player";
    action = "forwardIdle";
    layer = 100;
    size = { width: 100, height: 100 };
    x = 0;
    y = 0;

    direction = "forward";

    constructor({ sprites, animations, x = 0, y = 0 } = {}) {
        super({ sprites, animations });
        this.x = x - this.size.width / 2;
        this.y = y - this.size.height / 2;
    }

    bbox() {
        return {
            x: this.x + 25 + 12.5,
            y: this.y + 25 + 12.5,
            width: 25,
            height: 25,
        };
    }

    update(app) {
        const keyboard = app.find((o) => o.name.includes("keyboard"));

        this.setAction(`${this.direction}Idle`);

        if (keyboard.keys.includes("ArrowDown")) {
            this.setAction("forwardWalk");
            this.direction = "forward";
        }

        if (keyboard.keys.includes("ArrowUp")) {
            this.setAction("backwardWalk");
            this.direction = "backward";
        }

        if (keyboard.keys.includes("ArrowRight")) {
            this.setAction("rightWalk");
            this.direction = "right";
        }

        if (keyboard.keys.includes("ArrowLeft")) {
            this.setAction("leftWalk");
            this.direction = "left";
        }
    }

    render({ ctx, time, size: { width, height } }) {
        ctx.drawImage(this.getAnimation(time), this.x, this.y, this.size.width, this.size.height);
    }
}

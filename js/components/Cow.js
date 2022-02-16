import Component from "/js/lib/Component.js";

export default class Player extends Component {
    name = "cow";
    action = "idle";
    size = { width: 75, height: 75 };
    x = 0;
    y = 0;

    constructor({ sprites, animations, x = 0, y = 0 } = {}) {
        super({ sprites, animations });
        this.x = x - this.size.width / 2;
        this.y = y - this.size.height / 2;
        this.checkCollisions = true;
    }

    bbox({ worldX, worldY }) {
        return {
            x: this.x + worldX,
            y: this.y + worldY + this.size.height / 2 - 10,
            width: this.size.width,
            height: this.size.height / 2,
        }
    }

    render(app) {
        const keyboard = app.find("keyboard");
        app.ctx.drawImage(this.getAnimation(app.time), this.x + keyboard.worldX, this.y + keyboard.worldY, this.size.width, this.size.height);
    }
}

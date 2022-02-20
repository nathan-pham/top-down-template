import Component from "/js/lib/Component.js";
import CustomMath from "/js/lib/CustomMath.js";

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

        this.moo = false;
        this.mooOpacity = 0;
    }

    bbox({ worldX, worldY }) {
        return {
            x: this.x + worldX + 10,
            y: this.y + worldY + this.size.height / 2 - 10,
            width: this.size.width - 20,
            height: this.size.height / 2,
        };
    }

    update(app) {
        const collisions = super.update(app);
        this.moo = !!collisions;
        this.mooOpacity = CustomMath.lerp(this.mooOpacity, this.moo ? 1 : 0, 0.25);
    }

    render(app) {
        const keyboard = app.find("keyboard");
        const x = this.x + keyboard.worldX;
        const y = this.y + keyboard.worldY;

        app.ctx.drawImage(this.getAnimation(app.time), x, y, this.size.width, this.size.height);

        app.ctx.fillStyle = `rgba(0, 0, 0, ${this.mooOpacity})`;
        app.ctx.font = "20px 'VT323', monospace";
        app.ctx.fillText("moooooo", x + 15, y + 20);

        // font-family: 'VT323', monospace;
    }
}

import Component from "/js/lib/Component.js";
import Physics from "/js/lib/Physics.js";

export default class Tile extends Component {
    name = "physics:tile";
    size = { width: 50, height: 100 };
    x = 100;
    y = 100;

    render(app) {
        const keyboard = app.find((o) => o.name.includes("keyboard"));
        this.collidable(app)

        app.ctx.fillStyle = "#000"
        app.ctx.fillRect(keyboard.worldX + this.x, keyboard.worldY + this.y, this.size.width, this.size.height);
    }
}

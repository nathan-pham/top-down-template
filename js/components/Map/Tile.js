import Component from "/js/lib/Component.js";
import Physics from "/js/lib/Physics.js";

export default class Tile extends Component {
    name = "tile";
    size = { width: 50, height: 50 };
    x = 0;
    y = 0;

    constructor({ sprites, type, x, y } = {}) {
        super({ sprites });
        this.type = type
        this.x = x;
        this.y = y;
    }

    render(app) {
        const keyboard = app.find((o) => o.name.includes("keyboard"));
        app.ctx.drawImage(this.sprites[this.type], this.x + keyboard.worldX, this.y + keyboard.worldY, this.size.width, this.size.height);
    }
}

// export default class Tile extends Component {
//     name = "physics:tile";
//     size = { width: 50, height: 100 };
//     x = 100;
//     y = 100;

//     render(app) {
//         const keyboard = app.find((o) => o.name.includes("keyboard"));
//         this.collidable(app)

//         app.ctx.fillStyle = "#000"
//         app.ctx.fillRect(keyboard.worldX + this.x, keyboard.worldY + this.y, this.size.width, this.size.height);
//     }
// }

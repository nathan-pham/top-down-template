import Component from "/js/lib/Component.js";
import Physics from "/js/lib/Physics.js";

export default class Tile extends Component {
    name = "tile";
    size = { width: 50, height: 50 };
    x = 0;
    y = 0;

    constructor({ sprites, spriteType, tileType, checkCollisions, x = 0, y = 0 } = {}) {
        super({ sprites });

        this.spriteType = spriteType;
        this.tileType = tileType;
        this.checkCollisions = checkCollisions;

        this.x = x;
        this.y = y;
    }

    bbox(keyboard) {
        if (this.spriteType == "fences" && this.tileType == "0,1") {
            // if(this.sprite)

            return {
                x: this.x + keyboard.worldX + this.size.width / 4,
                y: this.y + keyboard.worldY,
                width: this.size.width / 2,
                height: this.size.height,
            };
        } 

        return super.bbox(keyboard);
    }

    render(app, offsetX, offsetY) {
        const keyboard = app.find((o) => o.name.includes("keyboard"));
        app.ctx.drawImage(this.sprites[this.spriteType][this.tileType], this.x + keyboard.worldX + offsetX, this.y + keyboard.worldY + offsetY, this.size.width, this.size.height);

        // if (this.checkCollisions) {
        //     const bbox = this.bbox(keyboard);
        //     app.ctx.strokeStyle = "red";
        //     app.ctx.strokeRect(bbox.x, bbox.y, bbox.width, bbox.height);
        // }
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

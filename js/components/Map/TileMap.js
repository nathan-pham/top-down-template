import Component from "/js/lib/Component.js";
import Tile from "./Tile.js";

export default class TileMap extends Component {
    x = 0;
    y = 0;

    constructor({ sprites }) {
        super({ sprites });

        this.tiles = [
            ["0,0", "0,0", "0,0"],
            ["0,0", "0,0", "0,0"],
            ["0,0", "0,0", "0,0"],
        ].map((row, y) => {
            return row.map((tile, x) => {
                return new Tile({ sprites, type: tile, x: x * 50, y: y * 50 });
            });
        });
    }

    render(app) {
        const keyboard = app.find((o) => o.name.includes("keyboard"));

        for(const row of this.tiles) {
            for(const tile of row) {
                tile.render(app)
            }
        }

        // this.tiles.forEach((row) => {
        //     row.forEach((tile) => {
        //         tile.render(app);
        //     });
        // });
    }
}

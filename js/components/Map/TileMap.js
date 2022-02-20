import Component from "/js/lib/Component.js";
import Tile from "./Tile.js";

export default class TileMap extends Component {
    x = 0;
    y = 0;

    constructor({ sprites, keyboard, x = 0, y = 0 }) {
        super({ sprites });

        // const tileSprites = {
        //     grass: loader.loadSprite(await loader.loadImage("Tilesets/Grass.png"), 7, 7),
        //     hills: loader.loadSprite(await loader.loadImage("Tilesets/Hills.png"), 6, 6),
        //     dirt: loader.loadSprite(await loader.loadImage("Tilesets/TiledDirt.png"), 7, 7),
        //     fences: loader.loadSprite(await loader.loadImage("Tilesets/Fences.png"), 4, 4),
        // }

        this.tiles = [
            ["fences:1,0", "fences:2,3", "fences:2,3", "fences:2,3", "fences:3,0"],
            ["fences:0,1", "          ", "          ", "          ", "fences:0,1"],
            ["fences:0,1", "          ", "          ", "          ", "fences:0,1"],
            ["fences:0,1", "          ", "          ", "          ", "fences:0,1"],
            ["fences:0,1", "          ", "          ", "          ", "fences:0,1"],
            ["fences:1,2", "fences:2,3", "fences:2,3", "fences:2,3", "fences:3,2"],

            // ["hills:1,0", "hills:2,3", "hills:3,0"],
            // ["hills:0,1", "hills:2,1", "hills:0,1"],
            // ["hills:1,2", "hills:2,2", "hills:3,2"],
            // ["hills:1,3", "hills:2,3", "hills:3,3"],
            // ["fences:0,0", "dirt:0,2", "grass:0,0"],
            // ["          ", "dirt:0,3", "grass:0,0"],
            // ["fences:0,1", "dirt:0,4", ["fences:0,3", "grass:3,0"]],
        ].map((row, y) => {
            return row.map((tiles, x) => {
                const createTile = (tile) => {
                    let [spriteType, tileType] = tile
                        .split(":")
                        .map((v) => v.trim())
                        .filter((v) => v.length);
                    let checkCollisions = false;

                    if (!tileType) {
                        tileType = spriteType || "0,0";
                        spriteType = "dirt";
                    }

                    if (spriteType == "fences") {
                        checkCollisions = true;
                    }

                    return new Tile({ sprites, spriteType, tileType, checkCollisions, x: x * 50, y: y * 50 });
                };

                if (Array.isArray(tiles)) {
                    return tiles.map(createTile).reverse().map((tile, i) => {
                        tile.layer = i + 1;
                        return tile;
                    });
                }

                return createTile(tiles);
            });
        });

        const height = this.tiles.length * 50;
        const width = this.tiles[0].length * 50;

        keyboard.worldX = x - width / 2;
        keyboard.worldY = y - height / 2;
    }

    update(app) {
        this.tiles.flat(Infinity).forEach((tile) => tile.update(app));
    }

    render(app) {
        this.tiles.flat(Infinity).forEach((tile) => tile.render(app, this.x, this.y));
    }

    renderBBox(app) {
        this.tiles.flat(Infinity).forEach((tile) => tile.renderBBox(app));
    }
}

import App from "./lib/App.js";
import TextureLoader from "./lib/TextureLoader.js";

import Background from "./components/Background.js";
import Keyboard from "./components/Keyboard.js";
import Player from "./components/Player.js";
import TileMap from "./components/Map/TileMap.js";
import Cow from "./components/Cow.js";

// import Tile from "./components/Map/Tile.js";

const main = async () => {
    const loader = new TextureLoader().setBase("/SproutLands");

    const playerSprites = loader.loadSprite(await loader.loadImage("Characters/BasicCharacter.png"), 4, 4);
    const playerAnimations = {
        forwardIdle: loader.createAnimations(playerSprites, ["0,0", "1,0"], [14, 14]),
        forwardWalk: loader.createAnimations(playerSprites, ["2,0", "3,0"], [14, 14]),

        backwardIdle: loader.createAnimations(playerSprites, ["0,1", "1,1"], [14, 14]),
        backwardWalk: loader.createAnimations(playerSprites, ["2,1", "3,1"], [14, 14]),

        leftIdle: loader.createAnimations(playerSprites, ["0,2", "1,2"], [14, 14]),
        leftWalk: loader.createAnimations(playerSprites, ["2,2", "3,2"], [14, 14]),

        rightIdle: loader.createAnimations(playerSprites, ["0,3", "1,3"], [14, 14]),
        rightWalk: loader.createAnimations(playerSprites, ["2,3", "3,3"], [14, 14]),
    };

    const cowSprites = loader.loadSprite(await loader.loadImage("Characters/Cow.png"), 3, 2);
    const cowAnimations = {
        idle: loader.createAnimations(cowSprites, ["0,0", "1,0"], [300, 14]),
    }

    const tileSprites = {
        grass: loader.loadSprite(await loader.loadImage("Tilesets/Grass.png"), 7, 7),
        hills: loader.loadSprite(await loader.loadImage("Tilesets/Hills.png"), 6, 6),
        dirt: loader.loadSprite(await loader.loadImage("Tilesets/TiledDirt.png"), 7, 7),
        fences: loader.loadSprite(await loader.loadImage("Tilesets/Fences.png"), 4, 4),
        house: loader.loadSprite(await loader.loadImage("Tilesets/WoodenHouse.png"), 5, 5),
    };

    const app = new App({ renderBBox: false });

    const keyboard = new Keyboard();

    // prettier-ignore
    app.add(
        keyboard,
        new Background(), 
        new TileMap({ 
            keyboard,
            sprites: tileSprites, 
            x: app.size.width / 2, 
            y: app.size.height / 2
        }),
        new Cow({
            sprites: cowSprites,
            animations: cowAnimations,
            x: 110,
            y: 100,
        }),
        new Player({ 
            sprites: playerSprites, 
            animations: playerAnimations,
            x: app.size.width / 2,
            y: app.size.height / 2,
        }), 
        // new Tile({ sprites: {} })
    );
};

main();

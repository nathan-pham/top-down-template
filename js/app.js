import App from "./lib/App.js";
import TextureLoader from "./lib/TextureLoader.js";

import Background from "./components/Background.js";
import Keyboard from "./components/Keyboard.js";
import Player from "./components/Player.js";
import Tile from "./components/Map/Tile.js";

const main = async () => {
    const loader = new TextureLoader().setBase("/SproutLands");

    const playerSprite = loader.loadSprite(await loader.loadImage("Characters/BasicCharacter.png"), 4, 4)
    const playerAnimations = {
        forwardIdle: loader.createAnimations(playerSprite, ["0,0", "1,0"], [14, 14]),
        forwardWalk: loader.createAnimations(playerSprite, ["2,0", "3,0"], [14, 14]),

        backwardIdle: loader.createAnimations(playerSprite, ["0,1", "1,1"], [14, 14]),
        backwardWalk: loader.createAnimations(playerSprite, ["2,1", "3,1"], [14, 14]),

        leftIdle: loader.createAnimations(playerSprite, ["0,2", "1,2"], [14, 14]),
        leftWalk: loader.createAnimations(playerSprite, ["2,2", "3,2"], [14, 14]),

        rightIdle: loader.createAnimations(playerSprite, ["0,3", "1,3"], [14, 14]),
        rightWalk: loader.createAnimations(playerSprite, ["2,3", "3,3"], [14, 14]),
    }
    const app = new App();

    // prettier-ignore
    app.add(
        new Keyboard(),
        new Background(), 
        new Player({ sprites: playerSprite, animations: playerAnimations }), 
        new Tile({ sprites: {} })
    );
};

main();

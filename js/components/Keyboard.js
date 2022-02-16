import Component from "/js/lib/Component.js";

export default class Keyboard extends Component {
    name = "physics:keyboard";
    keys = [];

    worldSpeed = 5;
    worldX = 0;
    worldY = 0;

    constructor() {
        super();
        this.#addEventListeners();
    }

    #addEventListeners() {
        window.addEventListener("keydown", (e) => {
            this.keys.push(e.key);
        });

        window.addEventListener("keyup", (e) => {
            this.keys = this.keys.filter((key) => key !== e.key);
        });
    }

    update() {
        if (this.keys.includes("ArrowUp")) {
            this.worldY += this.worldSpeed;
        }
        if (this.keys.includes("ArrowDown")) {
            this.worldY -= this.worldSpeed;
        }
        if (this.keys.includes("ArrowLeft")) {
            this.worldX += this.worldSpeed;
        }
        if (this.keys.includes("ArrowRight")) {
            this.worldX -= this.worldSpeed;
        }
    }
}

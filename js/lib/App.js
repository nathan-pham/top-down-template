export default class App {
    constructor({ renderBBox=false }={}) {
        this.renderBBox = renderBBox
        this.components = [];
        this.time = 0;

        this.#createCanvas();
        this.#addEventListeners();

        this.#startCore();
    }

    find(name) {
        // prettier-ignore
        return this.components.find((object) => (
            typeof name == "function" ? name(object) : object.name == name
        ));
    }

    findAll(name) {
        // prettier-ignore
        return this.components.filter((object) => (
            typeof name == "function" ? name(object) : object.name == name
        ));
    }

    remove(name) {
        // prettier-ignore
        this.components = this.components.filter((object) => (
            typeof name == "function" ? name(object) : object.name !== name)
        );
    }

    add(...components) {
        for (const object of components) {
            this.components.push(object);
        }
    }

    get size() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }

    #onResize() {
        this.ctx.imageSmoothingEnabled = false;
        this.canvas.width = this.size.width;
        this.canvas.height = this.size.height;
        this.canvas.style.width = `${this.size.width}px`;
        this.canvas.style.height = `${this.size.height}px`;
    }

    #addEventListeners() {
        window.addEventListener("resize", () => {
            this.#onResize();
        });
    }

    #createCanvas() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.#onResize();
        document.body.appendChild(this.canvas);
    }

    #startCore() {
        const render = () => {
            for(const object of this.components) {
                object.update(this)
            }
            for (const object of this.components.sort((a, b) => a.layer - b.layer)) {
                object.render(this)

                if(this.renderBBox) {
                    object.renderBBox(this);
                }
            }

            this.time += 1;
            requestAnimationFrame(render);
        };

        render();
    }
}

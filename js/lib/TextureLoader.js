export default class TextureLoader {
    base = "";

    setBase(base) {
        this.base = base;
        return this;
    }

    loadImage(src) {
        return new Promise((resolve, reject) => {
            const image = new Image();

            image.onload = () => resolve(image);
            image.onerror = () => reject(new Error("Could not load image"));

            image.src = `${this.base}/${src}`;
        });
    }

    /**
     * convert a canvas element to an image
     * @param {HTMLCanavsElement} canvas - canvas to draw on
     * @returns {Image}
     */
    #canvasToImage(canvas) {
        const image = new Image();
        image.src = canvas.toDataURL("image/png");
        return image;
    }

    /**
     *
     * @param {Image} image - image from loadImage
     * @param {number} xSegments - number of subimages in x direction
     * @param {number} ySegments - number of subimages in y direction
     * @returns
     */
    loadSprite(image, xSegments, ySegments) {
        const sprites = {};

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const width = image.width / xSegments;
        const height = image.height / ySegments;

        canvas.width = width;
        canvas.height = height;

        for (let y = 0; y < ySegments; y++) {
            for (let x = 0; x < xSegments; x++) {
                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(image, x * width, y * height, width, height, 0, 0, width, height);

                sprites[`${x},${y}`] = this.#canvasToImage(canvas);
            }
        }
        return sprites;
    }

    /**
     *
     * @param {object} sprites - sprites object loaded from loadSprite
     * @param {string[]} useSprites - array of sprites to use
     * @param {number[]} useFrames - array of frames to use per sprite
     * @returns {string[]} - array of sprites to use
     */
    createAnimations(sprites, useSprites, useFrames) {
        const animation = [];

        for (let i = 0; i < useSprites.length; i++) {
            const useSprite = useSprites[i];
            const useFrame = useFrames[i];

            const sprite = sprites[useSprite];

            for (let j = 0; j < useFrame; j++) {
                animation.push(sprite);
            }
        }

        return animation;
    }
}

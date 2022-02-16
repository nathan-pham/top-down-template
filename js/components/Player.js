import Component from "/js/lib/Component.js";

export default class Player extends Component {
    name = "physics:player";
    action = "forwardIdle";
    layer = 100;
    size = { width: 100, height: 100 };
    x = 0;
    y = 0;

    direction = "forward"

    get bbox() {
        return {
            x: this.x + 34,
            y: this.y + 29,
            width: 31,
            height: 40,
        };
    }

    update(app) {
        const centerX = app.size.width / 2 - this.size.width / 2;
        const centerY = app.size.height / 2 - this.size.height / 2;
        this.x = centerX;
        this.y = centerY;

        const keyboard = app.find((o) => o.name.includes("keyboard"));
        
        this.setAction(`${this.direction}Idle`);

        if(keyboard.keys.includes("ArrowDown")) {
            this.setAction("forwardWalk");
            this.direction = "forward";
        } 
        
        if(keyboard.keys.includes("ArrowUp")) {
            this.setAction("backwardWalk");
            this.direction = "backward";
        } 
        
        if(keyboard.keys.includes("ArrowRight")) {
            this.setAction("rightWalk");
            this.direction = "right";
        } 
        
        if(keyboard.keys.includes("ArrowLeft")) {
            this.setAction("leftWalk");
            this.direction = "left";
        }

    }

    render({ ctx, time, size: { width, height } }) {
        ctx.drawImage(this.getAnimation(time), this.x, this.y, this.size.width, this.size.height);

        // ctx.strokeStyle = "red";
        // ctx.strokeRect(this.bbox.x, this.bbox.y, this.bbox.width, this.bbox.height);
    }
}

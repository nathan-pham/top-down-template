import Component from "/js/lib/Component.js";

export default class Background extends Component {
    layer = -1

    render({ ctx, size: { width, height } }) {
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, width, height);
    }
}

import Component from "/js/lib/Component.js";

export default class Background extends Component {
    layer = -1

    render({ ctx, size: { width, height } }) {
        ctx.fillStyle = "#c0d470";
        ctx.fillRect(0, 0, width, height);
    }
}

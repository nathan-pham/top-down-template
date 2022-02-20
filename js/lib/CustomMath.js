export default class CustomMath {
    static lerp(start, end, t) {
        return start + (end - start) * t
    }
}

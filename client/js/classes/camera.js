export default class Camera {
    /**
     * Camera - transforms whole scene based on it
     * @param {*} params - x, y, scale
     */
    constructor (params) {
        window.camera = {}
        window.camera.x = params.x
        window.camera.y = params.y
        window.camera.scale = params.scale
    }
    setCoords(x,y) {
        window.camera.x = x
        window.camera.y = y
    }
    setX(x) {
        window.camera.x = x
    }
    setY(y) {
        window.camera.y = y
    }
}
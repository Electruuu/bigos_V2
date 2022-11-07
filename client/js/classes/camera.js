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

        document.addEventListener('drawTick', () => {this.draw()})
    }
    draw() {
        if (window.camera.following) {
            window.camera.x = window.camera.following.getCoords().x-50
            window.camera.y = window.camera.following.getCoords().y*window.canvas.width/window.canvas.height-50
        }
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
    follow(obj) {
        window.camera.following = obj
    }
}
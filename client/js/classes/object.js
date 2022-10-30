export default class Object {
    constructor (params) {
        this.x = window.canvas.width*params.x/100
        this.y = window.canvas.height*params.y/100
    }
    setCoords(x,y) {
        this.x = window.canvas.width*x/100
        this.y = window.canvas.height*y/100
    }
    setX(x) {
        this.x = window.canvas.width*x/100
    }
    setY(y) {
        this.y = window.canvas.height*y/100
    }
    getCoords() {
        return {
            x: this.x/window.canvas.width*100,
            y: this.y/window.canvas.height*100
        }
    }
}
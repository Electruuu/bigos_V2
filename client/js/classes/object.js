export default class Object {
    constructor (params) {
        this.x = window.canvas.width*params.x/100 || 0
        this.y = window.canvas.width*params.y/100 || 0
        this.angle = params.angle*Math.PI/180 || 0
        this.scaleSize = 354*4 // constant for scaling system // Current system coord step: 5
        this.scale = window.canvas.width*params.scale/this.scaleSize || window.canvas.width*1/this.scaleSize
    }
    setCoords(x,y) {
        this.x = window.canvas.width*x/100
        this.y = window.canvas.width*y/100
    }
    setX(x) {
        this.x = window.canvas.width*x/100
    }
    setY(y) {
        this.y = window.canvas.width*y/100
    }
    setAngle(angle) {
        this.angle = angle*Math.PI/180
    }
    getAngle() {
        return this.angle/Math.PI*180
    }
    getCoords() {
        return {
            x: this.x/window.canvas.width*100,
            y: this.y/window.canvas.width*100
        }
    }
    setScale(scale) {
        this.scale = window.canvas.width*scale/this.scaleSize
    }
    getScale() {
        return this.scale/window.canvas.width*this.scaleSize
    }
}
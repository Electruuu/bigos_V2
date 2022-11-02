import Sprite from "./sprite.js";

export default class Bullet extends Sprite {
    constructor(params) {
        super({blt:true, x:params.x, y:params.y})
    }
}

class Expression {
    /**
     * Creates Linear Expression 
     * @param {float} a - Slope Factor. 
     * @param {float} bnd - Starting Boundry  
     */
    constructor(params) {
        this.a = params.a
        this.bnd = params.bnd
    }
    /**
     * Computes 
     * @param {*} x - Calculate Function For x.
     * @param {*} y - Calculate x For y  
     */
    f(params) {
        if ((params.x || false) || params.x!=0) {
            return this.a*params.x
        } else if ((params.y || false) || params.y != 0) {
            return params.y/this.a
        }
    } 
    // Math.abs(this.f({x:x})-playerY)/height
    // Math.abs(this.f({y:y})-playerX)/width
}
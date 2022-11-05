import Sprite from "./sprite.js";

export default class Bullet extends Sprite {
    constructor(params) {
        super({blt:true, x:params.x, y:params.y, angle:params.angle})
        let ex = new Expression({a:Math.tan(angle*Math.PI/180), bnd:params.x});
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
        if ((params.x || false) || params.x==0) {
            return this.a*params.x
        } else if ((params.y || false) || params.y == 0) {
            return params.y/this.a
        }
    } 
    isHit(params) {
        if (mode=='x') {
            return
        }
    }
    // Math.abs(this.f({x:x})-playerY)/height
    // Math.abs(this.f({y:y})-playerX)/width
    // angle to a: tan((ang*pi)/180) = a
    // a to angle: ang = (180tan^-1(a))/pi
}
import Object from "./object.js";

export default class Sprite extends Object {
    /**
     * Rysuje teksturę
     * @param {*} x - X Position of Sprite.
     * @param {*} y - Y Position of Sprite.
     * @param {*} textures - Textures to Load.
     * @param {*} blt - Should Render Be Projectile Based.
     * @param {*} alpha - Opacity.
     */
    constructor (params) {
        //przekazuje parametry do klasy rodzica (Object)
        super(params)
        
        //wczytuje tekstury, tylko jeśli jakieś zostały podane
        params.textures && this.#loadTextures(params.textures)

        this.alpha = params.alpha !== undefined ? params.alpha : 1;

        //nasłuchuje na custom event drawTick żeby wiedzieć kiedy narysować obraz (wykona, tylko jeśli tekstury się wczytały)
        document.addEventListener('drawTick', () => {this.draw({blt:params.blt||false})})
    }

    #loadTextures(textures) {
        this.texturesLoaded = false
        this.textures = []
        for (let i in textures) {
            //tworzę teksturę
            this.textures[i] = new Image()
            this.textures[i].src = `/img/${textures[i]}`
        }
    }
    /**
     * Removes Texture with given ID.
     * @param {*} id - ID of Texture to remove.
     */
    removeTexture(id) {
        this.textures.splice(id, 1)
    }
    setAlpha(alpha) {
        this.alpha = alpha
    }
    getAlpha() {
        return this.alpha
    }
    /**
     * Draws a Sprite
     * @param {*} blt - Type of Drawing (normal or projectile)   
     */
    draw(params) {
        let x = params.x
        //w main.js przypisałem canvas i ctx do window, które jest globalne.
        window.ctx.save()
        window.ctx.translate(
            this.x-(window.camera.x*window.canvas.width/100)-32, 
            this.y-(window.camera.y*window.canvas.height/100)-32
        )
        window.ctx.scale(this.scale, this.scale)
        window.ctx.rotate(this.angle)
        window.ctx.globalAlpha = this.alpha
        for (let i in this.textures) {
            window.ctx.drawImage(
                this.textures[i], 
                -16 + (params.blt ? (x += this.spd) : 0), 
                -16
            )
        }
        window.ctx.restore()
    }
}
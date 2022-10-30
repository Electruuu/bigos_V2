import Object from "./object.js";

export default class Sprite extends Object {
    /**
     * Rysuje teksturę
     * @param {*} params - x, y, textures
     */
    constructor (params) {
        //przekazuje parametry do klasy rodzica (Object)
        super(params)
        
        //wczytuje tekstury, tylko jeśli jakieś zostały podane
        params.textures && this.#loadTextures(params.textures)

        //nasłuchuje na custom event drawTick żeby wiedzieć kiedy narysować obraz (wykona, tylko jeśli tekstury się wczytały)
        document.addEventListener('drawTick', () => {this.draw()})
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

    draw() {
        //w main.js przypisałem canvas i ctx do window, które jest globalne.
        for (let i in this.textures) {
            window.ctx.drawImage(this.textures[i], this.x-window.camera.x, this.y-window.camera.y)
        }
    }
}
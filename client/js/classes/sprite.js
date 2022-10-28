import object from "./object.js";

export default class sprite extends object {
    /**
     * Rysuje teksturę
     * @param {*} params - x, y, textures
     */
    constructor (params) {
        //przekazuje parametry do klasy rodzica (object)
        super(params)
        
        //wczytuje tekstury, tylko jeśli jakieś zostały podane
        params.textures && this.#loadTextures(params.textures)

        //nasłuchuje na custom event drawTick żeby wiedzieć kiedy narysować obraz (wykona, tylko jeśli tekstury się wczytały)
        document.addEventListener('drawTick', () => {if (this.texturesLoaded) this.draw()})
    }

    #loadTextures(textures) {
        console.log("load")
        this.texturesLoaded = false
        this.textures = []
        for (let i in textures) {
            //tworzę teksturę
            this.textures[i] = new Image()
            this.textures[i].src = `/img/${textures[i]}`
            //gdy się wczyta, sprawdzam czy to koniec, jesli tak to ustawiam texturesLoaded na true
            this.textures[i].onload = () => {
                if (textures.length == i+1) 
                    this.texturesLoaded = true
            }
        }
    }
    removeTexture(id) {
        this.textures.splice(id, 1)
    }

    draw() {
        console.log("draw")
        //w main.js przypisałem canvas i ctx do window, które jest globalne.
        window.ctx.drawImage(this.textures[0], this.x, this.y)
    }
}
import Sprite from "./sprite.js"

export default class MapManager {
    constructor() {
        this.sprites = []
    }
    loadMap(file) {
        //this.destroyMap()

        for (let i in file) {
            if (file[i].type == 'wall') {
                for (let j in file[i].x) {
                    console.log(`wall: ${file[i].x[j]} / ${file[i].y[j]}`)
                    this.sprites.push(
                        new Sprite({
                            x: file[i].x[j],
                            y: file[i].y[j],
                            textures: [
                                'Ground_Top_32x32.png'
                            ]
                        })
                    )
                }
            }
        }
    }
}
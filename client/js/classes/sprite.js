import object from "./object.js";

export default class sprite extends object {
    constructor (params) {
        //przekazuje parametry do klasy rodzica (object)
        super(params)
        //nasłuchuje na custom event drawTick żeby wiedzieć kiedy narysować obraz
        document.addEventListener('drawTick', () => {this.draw()})
    }
    draw() {
        //w main.js przypisałem canvas i ctx do window, które jest globalne.
        window.ctx.fillRect(this.x, this.y, 10, 10)
    }
    pog() {
        console.log("hau")
    }
}
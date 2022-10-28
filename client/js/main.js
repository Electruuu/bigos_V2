import sprite from "./classes/sprite.js"
import frameLoop from "./frameLoop.js"

window.canvas = document.getElementById('main')
window.ctx = window.canvas.getContext('2d')

let player2 = new sprite({x: 15, y: 35, textures: ['gracz.png']})

player2.removeTexture(0)

let player = new sprite({x: 10, y: 30, color: 'red'})

document.addEventListener('drawTick', () => {
    player2.x = document.getElementById('x').value
})

frameLoop()

//document.dispatchEvent(new CustomEvent('drawTick'))
import sprite from "./classes/sprite.js"

window.canvas = document.getElementById('main')
window.ctx = window.canvas.getContext('2d')

let player = new sprite({x: 10, y: 30})

document.dispatchEvent(new CustomEvent('drawTick'))
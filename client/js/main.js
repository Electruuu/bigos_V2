import sprite from "./classes/sprite.js"
import frameLoop from "./frameLoop.js"

window.canvas = document.getElementById('main')
window.ctx = window.canvas.getContext('2d')

const socket = new WebSocket('ws://localhost:8081');
// Listen for messages


// Connection opened
socket.addEventListener('open', (event) => {
    socket.send('Hello Server!');
});

socket.addEventListener('message', (event) => {
    console.log('Message from server ', event.data);
});


let player2 = new sprite({x: 15, y: 35, textures: ['5Hp_Blue_32x32.png']})
/*
player2.removeTexture(0)

let playerTemp = new sprite({x: 10, y: 30, color: 'red'})

class player {
    constructor(id = -1) {
        
    }
}

//var newPlayer1 = new player()
*/
document.addEventListener('drawTick', () => {
    player2.x = document.getElementById('x').value
})

frameLoop()

//document.dispatchEvent(new CustomEvent('drawTick'))
//import Camera from "./classes/camera.js"; // doesn't exist, don't even try to import
import Sprite from "./classes/sprite.js"
import frameLoop from "./frameLoop.js"
import initCanvas from "./initCanvas.js"
import Player from "./classes/player.js"

initCanvas()

const socket = new WebSocket('ws://localhost:8081');
// Listen for messages



// Connection opened
socket.addEventListener('open', (event) => {
    let player1 = new Player(-1, socket, 15, 50)

    let player3 = new Player(-1, socket, 15, 75)


    socket.send(JSON.stringify({type:"test",params:'Hello Server!'}));

    //let camera = new Camera({x: 0, y: 0})
    //camera: bieda edition vvv
    window.camera = {}
    window.camera.x = 0
    window.camera.y = 0

    let player2 = new Sprite({x: 15, y: 35, textures: ['5Hp_Blue_32x32.png','gracz.png']})

    document.addEventListener('drawTick', () => {
        player2.setX(document.getElementById('playerX').value)
        player1.moveTo(document.getElementById('playerX').value,0)
        window.camera.x = Number(document.getElementById('cameraX').value)
    })
});

socket.addEventListener('message', (event) => {
    console.log('Message from server ', event.data);
});



frameLoop()

//document.dispatchEvent(new CustomEvent('drawTick'))
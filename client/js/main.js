import Camera from "./classes/camera.js";
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

    let camera = new Camera({x: 0, y: 0})

    let player2 = new Sprite({x: 15, y: 35, textures: ['5Hp_Blue_32x32.png','Player_Face_32x32.png']})

    camera.follow(player2)

    document.addEventListener('drawTick', () => {
        //console.log(`pl: ${player2.x}/${player2.y}, cam: ${window.camera.x}/${window.camera.y}`)

        player2.setX(document.getElementById('playerX').value)
        //player1.moveTo(document.getElementById('playerX').value,0)
        //camera.setX(Number(document.getElementById('cameraX').value))
    })
});

socket.addEventListener('message', (event) => {
    console.log('Message from server ', event.data);
});



frameLoop()

//document.dispatchEvent(new CustomEvent('drawTick'))
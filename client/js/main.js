import Camera from "./classes/camera.js";
import Sprite from "./classes/sprite.js"
import frameLoop from "./frameLoop.js"
import initCanvas from "./initCanvas.js"
import Player from "./classes/player.js"
import Ghost from "./classes/ghost.js";
initCanvas()

const socket = new WebSocket('ws://localhost:8081');
// Listen for messages

var playerLog = []

// Connection opened
socket.addEventListener('open', (event) => {

    socket.send(JSON.stringify({
        type:'getply'
    }))

    let player1 = new Player(-1, socket, 15, 50)

    playerLog[playerLog.length] = player1

    //let player2 = new Sprite({x:20,y:20,textures:['gracz.png']})

    //let widmo1 = new Ghost(4,socket,20,20)

    socket.send(JSON.stringify({type:"test",params:'Hello Server!'}));
    /*
    let camera = new Camera({x: 0, y: 0})

    let player2 = new Sprite({x: 15, y: 35, textures: ['5Hp_Blue_32x32.png','Player_Face_32x32.png']})

    camera.follow(player2)
    */
    document.addEventListener('drawTick', () => {
        //console.log(`pl: ${player2.x}/${player2.y}, cam: ${window.camera.x}/${window.camera.y}`)

        player1.moveTo(document.getElementById('playerX').value, 15)
        //player1.moveTo(document.getElementById('playerX').value,0)
        //camera.setX(Number(document.getElementById('cameraX').value))
    })
});

socket.addEventListener('message', (event) => {
    let msg = JSON.parse(event.data)
    console.log('Message from server ', msg);
    switch (msg.type) {
        case 'radply':
            console.log(playerLog, msg.params)
            for (let i in playerLog) {
                if (playerLog[i].me.id==msg.params.id) {
                    console.log('widmo istnieje D:')
                    return -1
                }
            }
            console.log('dodawanie widma')
            playerLog[playerLog.length] = new Ghost(msg.params.id, socket, 0, 0)
            break;
        case 'rgetply':
            console.log(playerLog, msg.params)
            for (let i in msg.params) {
                for (let j in playerLog) {
                    if (msg.params[i].id != playerLog[j].me.id) {
                        console.log('added ghost successfully' )
                        playerLog[playerLog.length] = new Ghost(msg.params[i].id, socket, msg.params[i].data.pos.x, msg.params[i].data.pos.y)
                    }
                } 
            }
    }
});



frameLoop()

//document.dispatchEvent(new CustomEvent('drawTick'))
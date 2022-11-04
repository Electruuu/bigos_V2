import Camera from "./classes/camera.js";
import Sprite from "./classes/sprite.js"
import frameLoop from "./frameLoop.js"
import initCanvas from "./initCanvas.js"
import Player from "./classes/player.js"
import Ghost from "./classes/ghost.js";
initCanvas()

const socket = new WebSocket('ws://localhost:8081');

var playerLog = []

// Connection opened
socket.addEventListener('open', (event) => {

    socket.send(JSON.stringify({
        type:'getply'
    }))

    let tlo = new Sprite({x:0,y:0,color:'blue'})

    let player1 = new Player({id:-1, socket:socket, x:15, y:50})

    playerLog[playerLog.length] = player1

    player1.move(0,20)

    socket.send(JSON.stringify({type:"test",params:'Hello Server!'}));
    
    //let player2 = new Sprite({x: 15, y: 35, textures: ['5Hp_Blue_32x32.png'], angle: 0})
    
    //let os = (new Date()).getSeconds()

    //let d

    document.addEventListener('drawTick', () => {
        //console.log(`pl: ${player2.x}/${player2.y}, cam: ${window.camera.x}/${window.camera.y}`)
        //d++
        //console.log((new Date()).getSeconds())
        /*if (os<(new Date()).getSeconds()) {
            console.log(d)
            d = 0
            os = (new Date()).getSeconds()
        }*/

        //player1.moveTo(document.getElementById('playerX').value, 15)
        //console.log(player1.sprite.getCoords())
        player1.checkMove()
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
            if (compareIDs(playerLog, [msg.params.id])) {
                console.log('dodawanie widma')
                playerLog[playerLog.length] = new Ghost(msg.params.id, socket, msg.params.pos.x, msg.params.pos.y)
            }
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
/**
 * Compares Set of Players with Set of IDs. 
 * @param {*} playerSet1 - Array of Player/Ghost Objects 
 * @param {*} IDList - Array with IDs.
 * @returns Is Any ID in any of Those Set Matching.
 */
function compareIDs(playerSet1, IDList) {
    for (let i in playerSet1) {
        for (let j in IDList) {
            if (playerSet1[i].me.id==IDList[j]) {
                return false
            }
        }
    }
    return true
}



frameLoop()

//document.dispatchEvent(new CustomEvent('drawTick'))
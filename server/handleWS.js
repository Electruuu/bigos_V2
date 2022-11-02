import { WebSocketServer } from 'ws'
import config from '../config.js'
import db from './db.js'
import incoming from './incoming.js'

export default function handleWS() {
    const wss = new WebSocketServer({port: config.prod.ws})

    global.data = new db({})
    let wsConections = []
    
    wss.on('connection', (ws) => {

        wsConections[wsConections.length] = ws

        console.log("Connection established");
        //console.log(wss.clients)

        //TODO: this vvv
     
        // addHeartBeat()

        ws.on('message', (msg) => {incoming(msg, ws, wsConections)})
        
    })
}
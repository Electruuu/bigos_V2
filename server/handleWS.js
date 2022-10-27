import { WebSocketServer } from 'ws'
import config from '../config.js'

export default function handleWS() {
    const wss = new WebSocketServer({port: config.prod.ws})

    wss.on('connection', (ws) => {

        console.log("Connection established");

        ws.send(encode({
            type:"handshake",
        }))

        ws.on('message', (message) => {

        })
        
    })
}
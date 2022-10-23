import ws from 'ws'
import config from '../config.json'

export default function handleWS() {
    const wss = new ws.Server({port: config.prod.ws})

    wss.on('connection', (ws) => {

        console.log("Connection established");

        ws.send(encode({
            type:"handshake",
        }))

        ws.on('message', (message) => {

        })
        
    })
}
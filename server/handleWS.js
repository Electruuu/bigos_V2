import { WebSocketServer } from 'ws'
import config from '../config.js'
import db from './db.js'

export default function handleWS() {
    const wss = new WebSocketServer({port: config.prod.ws})

    const data = new db()
    
    wss.on('connection', (ws) => {

        console.log("Connection established");
        //console.log(wss.clients)

        //TODO: this vvv
     
        // addHeartBeat()

        ws.on('message', (message) => {
            ws.send('uwu')
            /*if (data.addPlayer(message)==0) {
            } else {
                data.addPlayer(-1)
            }*/// registerUser() Partaily done  
        })
        
    })
}
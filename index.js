import serveClient from "./server/serveClient.js";
import express from "express"
import handleWS from "./server/handleWS.js";
import config from "./config.js";

//express.js setup
global.app = express()

//launch systems
serveClient()
handleWS()

//set express.js listening port
global.app.listen(config.prod.http, () => {
    console.log(`Bigos się gotuje na http://127.0.0.1:${config.prod.http}`)
})
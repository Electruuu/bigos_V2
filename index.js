import serverClient from "./server/serveClient.js";
import express from "express"
import handleWS from "./server/handleWS.js";

//express.js setup
global.app = express()

serverClient()
handleWS()

global.app.listen(3000, () => {
    console.log(`Bigos się gotuje na porcie 3000`)
})
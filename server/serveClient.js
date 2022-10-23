import express from "express"

export default function serveClient() {
    global.app.get('/', (req, res) => {
        res.sendFile('client/html/index.html', {root: '.'})
    })
    global.app.use(express.static('client'))
    global.app.use('/lib', express.static('lib'))
}
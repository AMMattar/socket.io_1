const { log } = require('console')
const { Socket } = require('dgram')
const express = require('express')
const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: "*" } })

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home')
})

server.listen(3000, () => {
    console.log("server is running ... ")
})

io.on('connection', (Socket) => {
    console.log("User connected: " + Socket.id)
    Socket.on("message", (data) => {
        console.log(data)
        Socket.broadcast.emit("message", data)
    })
})
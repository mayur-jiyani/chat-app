const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

// app.get('/', (req, res) => {
//     res.render('index', {
//         title: 'Weather',
//         name: 'mayur jiyani'
//     })
// })

let count = 0

io.on('connection', (socket) => {
    console.log('new websocket connection');

    socket.emit('countUpdated', count)

    socket.on('increment', () => {
        count++
        // socket.emit('countUpdated', count)
        io.emit('countUpdated', count)
    })
})

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
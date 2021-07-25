// const io = require('socket.io')()
// const io = require("socket.io-client")('https://localhost:3000')
import * as io from 'socket.io'

// defining an empty object to hold a list of 'chatters'
let chatters = {}


io.on('connection', (socket) => {
  // This is where all of our server-side socket.io functionality will exist.  
    console.log("SOCKET IO CONNECTED")
    socket.on("connect_error", (err) => {
        console.log(`ERROR: ${err.message}`)
    })
    // When anyone 'enters the room (loads the page)', add them to the list and play a sound
    socket.on('register-user', (username) => {
        console.log("IO.JS REGISTER USER")
        chatters[socket.id] = username
        io.emit('update-chatter-list', Object.keys(chatters).map(id => chatters[id]))
        io.emit('user-enter')
    })
    // When anyone 'leaves the room (navigates away from the page)', remove them from the list and play a sound
    socket.on('disconnect', () => {
        console.log("IO.JS DELETE USER")
        delete chatters[socket.id]
        io.emit('exit-user')
        io.emit('update-chatter-list', Object.keys(chatters).map(id => chatters[id]))
    })
    // When anyone sends a message, send the message to all of the connected clients and play a sound

    // When anyone presses a key while typing a message, display a '(user) is typing...' message to all clients
    socket.on('typing', (data) => {
        console.log("IO.JS TYPING")
        socket.broadcast.emit('typing', {username: data.username})
    });

    socket.on('new_message', (data) => {
        console.log("IO.JS NEW MESSAGE")
        io.sockets.emit('new_message', {
              message: data.message, 
              username: data.username,
              avatar: data.avatar
          })
      })
})

module.exports = io
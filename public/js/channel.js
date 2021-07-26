const socket = io()


let message = document.getElementById("message");
let username = document.getElementById("username");
let send_message = document.getElementById("send_message");
let chatroom = document.getElementById("chatroom");
let avatar = document.getElementById("avatar");
let isTyping = document.getElementById("isTyping");
let chatters = document.getElementById("chatters");
let channel = document.getElementById("channel").dataset.channel
socket.emit('create', channel)
console.log(channel)


socket.on("connect", () => {
    console.log("CONNECTED TO: " + channel)
})

// When a user enters the room, play a sound
socket.on("user-enter", () => {
    console.log("USER ENTER")
});

// When a user leaves the room, play a sound
socket.on("user-exit", ({channel: channel}) => {
    console.log("USER EXIT")
});

socket.on("update-chatter-list", (data) => {
    console.log("CHANNEL.JS SOCKET UPDATE CHATTER LIST")
    let chatterList = "<li>" + data.join("</li><li>") + "</li>"
    chatters.innerHTML = chatterList
})

socket.on("typing", (data) => {
    console.log("CHANNEL.JS SOCKET TYPING")
    isTyping.innerText = `${data.username} is typing...`
})

socket.on("new_message", (data) => {
    isTyping.innerText = ""
    let newMessage = document.createElement('div')
    newMessage.classList.add("message_output")
    console.log(data)
    newMessage.innerHTML = `
        <div class="avatar">
            <img id="avatarPhoto" height="30" src="${data.avatar}" alt="">
        </div>
        <div class="content">
            <p class="username">${data.username} <small>a few seconds ago</small></p>
            <p class="text">${data.message}</p>
        </div>
    `
    chatroom.append(newMessage)
    console.log("CHANNEL.JS SOCKET NEW MESSAGE")
    // This is going to be something else? 
    fetch(`/channel/${channel}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            avatar: data.avatar,
            username: data.username,
            message: data.message,
            channel: channel
        })
    })
})

message.addEventListener("keypress", () => {
    console.log("CHANNEL.JS TYPING EVENT TRIGGERED")
    socket.emit("typing", {username: username.value, channel: channel})
})

send_message.addEventListener("click", () => {
    socket.emit("new_message", {
        username: username.value,
        message: message.value,
        avatar: avatar.value,
        channel: channel
    })

    message.value = ""
})

message.addEventListener("keypress", (e) => {
    if(e.key === "Enter") {
        console.log("CHANNEL.JS NEW MESSAGE")
        socket.emit("new_message", {
            username: username.value,
            message: message.value,
            avatar: avatar.value,
            channel: channel
        })

        message.value = ""
    }
})

function getUserName() {
    console.log("GETTING USERNAME")
    fetch("/user/name")
        .then((response) => {
        return response.json()
            .then((data) => {
                console.log("CHANNEL.JS REGISTER USER")
                console.log(channel)
                socket.emit("register-user", {data: data, channel: channel});
        });
    });
}

getUserName();
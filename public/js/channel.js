const socket = io('https://vetnet-gz.herokuapp.com/')


let message = document.getElementById("message");
let message_container = document.querySelector('#message_container')
let username = document.getElementById("username");
let send_message = document.getElementById("send_message");
let chatroom = document.getElementById("chatroom");
let avatar = document.getElementById("avatar");
let isTyping = document.getElementById("isTyping");
let chatters = document.getElementById("chatters");
let channel = document.getElementById("channel").dataset.channel
let user = document.getElementById("user").dataset.user
let messageInput = document.querySelector(".message_input")
let messageMenu = document.querySelectorAll('.message-menu')
let maxHeight = 66;

chatroom.scrollTop = chatroom.scrollHeight

socket.emit('create', channel)


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
    console.log(user)
    if(user === data.profile) {
        newMessage.innerHTML = `
            <div class="avatar">
                <img class="avatarPhoto" height="30" src="${data.avatar}" alt="">
            </div>
            <div class="content">
                <p class="username">${data.username} <small class="date">a few seconds ago</small></p>
                <p class="text">${data.message}</p>
            </div>
            <div class="message-menu">
                <i class="fas fa-ellipsis-v"></i>
                <div class="message-menu-container">
                    <a href="#">Delete Message</a>
                </div>
            </div>
            `
    } else {
        newMessage.innerHTML = `
            <div class="avatar">
                <img class="avatarPhoto" height="30" src="${data.avatar}" alt="">
            </div>
            <div class="content">
                <p class="username">${data.username} <small class="date">a few seconds ago</small></p>
                <p class="text">${data.message}</p>
            </div>
            `
    }
    
    chatroom.append(newMessage)
    chatroom.scrollTo(0, chatroom.scrollHeight)
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
    socket.emit("typing", {username: username.value, channel: channel})
})

message.addEventListener("keypress", (e) => {
    if ((message.offsetHeight < message.scrollHeight) || (message.offsetWidth < message.scrollWidth)) {
        e.stopPropagation();
    }

    if(e.key === "Enter") {
        document.execCommand('insertHTML', false, '')
        
        if(e.shiftKey) {
            resize(maxHeight)
            message.scrollTop = message.scrollHeight
            message_container.scrollTop = message_container.scrollHeight
            // document.execCommand('insertHTML', false, '<br />')
            // let caret = getCaretPosition(message)
            // message.innerHTML = message.innerHTML.substring(0, caret - 1) + "<br />" + content.substring(caret, content.length);
            // e.stopPropagation()
        } else {
            e.preventDefault()
            console.log('============================')
            console.log(message.innerText)
            console.log(message.innerHTML.trim().length)
            console.log('============================')
            if(message.innerHTML.trim().length > 0) {
                console.log("RUNNING!")
                resize(maxHeight)
                

                socket.emit("new_message", {
                    username: username.value,
                    message: message.innerHTML.replaceAll({"\n": "<br />"}),
                    avatar: avatar.value,
                    profile: user,
                    channel: channel
                })
    
                message.innerHTML = ''
                message.style.height = 'auto'
                message_container.style.height = '40px'
                message_container.classList.remove('yScroll')
            } else {
                message.innerHTML = ''
                message.style.height = 'auto'
                message_container.style.height = '40px'
                message_container.classList.remove('yScroll')
                return
            }
        }
    }
})

message.addEventListener('change', () => {
    resize(maxHeight)
})
message.addEventListener('cut', () => {
    resize(maxHeight)
})
message.addEventListener('paste', () => {
    resize(maxHeight)
})
message.addEventListener('keydown', (e) => {
    if(e.key === "Backspace") {
        resize(maxHeight)
    } else {
        resize(maxHeight)
    }
})
message.addEventListener('keyup', (e) => {
    if(e.key === "Backspace") {
        console.log("BACKSPACE")
        resize(maxHeight)
    } else {
        resize(maxHeight)
    }
})
message.addEventListener('keypress', (e) => {
    resize(maxHeight)
})
/**
 *     observe(message, 'change',  resize(maxHeight));
    observe(message, 'cut',     delayedResize);
    observe(message, 'paste',   delayedResize);
    observe(message, 'drop',    delayedResize);
    observe(message, 'keydown', delayedResize);
 */

function getUserName() {
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

let observe;
if (window.attachEvent) {
    observe = function (element, event, handler) {
        element.attachEvent('on' + event, handler);
    };
}
else {
    observe = function (element, event, handler) {
        element.addEventListener(event, handler, false);
    };
}
function init () {
    resize(maxHeight);
}

function delayedResize () {
    window.setTimeout(resize(maxHeight), 0);
}

function resize (maxHeight) {
    console.log("SCROLL HEIGHT")
    console.log(message.scrollHeight);
    if(message.scrollHeight <= maxHeight){
        message.removeAttribute("class")
        message.style.height = 'auto';
        // message.style.height = message.scrollHeight+'px';
        message_container.style.height = message.scrollHeight+'px';
    }
    else{
        console.log('over');
        message_container.className = "yScroll";
    }

    // message.scrollTop = message.scrollHeight
    message_container.scrollTop = message_container.scrollHeight
}


messageMenu.forEach((menu) => {
    menu.addEventListener('click', (e) => {
        
        if(document.querySelector('.showing')) {
            document.querySelector('.showing').classList.remove('showing')
        }
        let deleteMessageBtn = menu.querySelector('.message-menu-container')
        deleteMessageBtn.classList.add('showing')
    })
})

window.addEventListener('click', function(e) {
    console.log(e.target)
    const select = document.querySelector('.showing')
    console.log(select)
    if (select !== null && e.target.className !== 'fas fa-ellipsis-v' && e.target.className !== 'message-menu-container showing' && e.target.tagName.toLowerCase() !== 'a') {
        select.classList.remove('showing');
    }
});


String.prototype.replaceAll = function(obj) {
    var retStr = this;
    for (var x in obj) {
        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
    }
    return retStr;
};

init();
getUserName();


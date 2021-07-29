const socket = io()


let message = document.getElementById("message");
let username = document.getElementById("username");
let send_message = document.getElementById("send_message");
let chatroom = document.getElementById("chatroom");
let avatar = document.getElementById("avatar");
let isTyping = document.getElementById("isTyping");
let chatters = document.getElementById("chatters");
let channel = document.getElementById("channel").dataset.channel
let messageInput = document.querySelector(".message_input")
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
            <img class="avatarPhoto" height="30" src="${data.avatar}" alt="">
        </div>
        <div class="content">
            <p class="username">${data.username} <small class="date">a few seconds ago</small></p>
            <p class="text">${data.message}</p>
        </div>
    `
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
    console.log("CHANNEL.JS TYPING EVENT TRIGGERED")
    socket.emit("typing", {username: username.value, channel: channel})
})

message.addEventListener("keypress", (e) => {
    console.log("KEYPRESS")
    if ((message.offsetHeight < message.scrollHeight) || (message.offsetWidth < message.scrollWidth)) {
        e.stopPropagation();
    }

    if(e.key === "Enter") {
        console.log(message.innerHTML)
        if(e.shiftKey) {
            document.execCommand('insertHTML', false, '<br />')
            return false
            // let caret = getCaretPosition(message)
            // message.innerHTML = message.innerHTML.substring(0, caret - 1) + "<br />" + content.substring(caret, content.length);
            // e.stopPropagation()
        } else {
            if(message.innerHTML.trim().length > 0) {
                console.log(message.innerHTML)
                console.log("CHANNEL.JS NEW MESSAGE")
                socket.emit("new_message", {
                    username: username.value,
                    message: message.innerHTML.replaceAll({"\n": "<br />"}),
                    avatar: avatar.value,
                    channel: channel
                })
        
                message.innerHTML = ''
                unwrap(message, "div")
                console.log(message)                
            } else {
                return
            }
        }
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
    let maxHeight = 50;
    
    function resize (maxHeight) {
    console.log(message.scrollHeight);
        if(message.scrollHeight < maxHeight){
            message.removeAttribute("class")
            message.style.height = 'auto';
            message.style.height = message.scrollHeight+'px';
        }
        else{
            console.log('over');
            message.className = "yScroll";
        }
    }
    
    function delayedResize () {
        window.setTimeout(resize(maxHeight), 0);
    }
    observe(message, 'change',  resize(maxHeight));
    observe(message, 'cut',     delayedResize);
    observe(message, 'paste',   delayedResize);
    observe(message, 'drop',    delayedResize);
    observe(message, 'keydown', delayedResize);

    message.focus();
    message.select();
    resize(maxHeight);
}

function getCaretPosition(editableDiv) {
    var caretPos = 0,
      sel, range;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.rangeCount) {
        range = sel.getRangeAt(0);
        if (range.commonAncestorContainer.parentNode == editableDiv) {
          caretPos = range.endOffset;
        }
      }
    } else if (document.selection && document.selection.createRange) {
      range = document.selection.createRange();
      if (range.parentElement() == editableDiv) {
        var tempEl = document.createElement("span");
        editableDiv.insertBefore(tempEl, editableDiv.firstChild);
        var tempRange = range.duplicate();
        tempRange.moveToElementText(tempEl);
        tempRange.setEndPoint("EndToEnd", range);
        caretPos = tempRange.text.length;
      }
    }
    return caretPos;
  }

  function unwrap(root,tagname,extra) {
    var elms = root.getElementsByTagName(tagname), l = elms.length, i;
    for( i=l-1; i>=0; i--) {
        // work backwards to avoid possible complications with nested spans
        while(elms[i].firstChild)
            elms[i].parentNode.insertBefore(elms[i].firstChild,elms[i]);
        if( extra) extra(elms[i]);
        elms[i].parentNode.removeChild(elms[i]);
    }
}

  String.prototype.replaceAll = function(obj) {
    var retStr = this;
    for (var x in obj) {
        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
    }
    return retStr;
};

init();

getUserName();


// When a user enters the room, play a sound
socket.on("user-enter", () => {
    enterAudio.play();
  });
  
  // When a user leaves the room, play a sound
  socket.on("user-exit", () => {
    exitAudio.play();
  });

  socket.on("update-chatter-list", (data) => {
    let chatterList = "<li>" + data.join("</li><li>") + "</li>";
    chatters.innerHTML = chatterList;
  });

  message.addEventListener("keypress", () => {
    socket.emit("typing", { username: username.value });
  });

  socket.on("typing", (data) => {
    isTyping.innerText = `${data.username} is typing...`;
  });

  /**
 * When 'send message' is clicked, emit a message containing the chat 
 * info to the server
 */

send_message.addEventListener("click", () => {
    socket.emit("new_message", {
      username: username.value,
      message: message.value,
      avatar: avatar.value,
    });
    message.value = "";
  });
  
  /**
   * When a user presses the 'Enter' key, emit a message containing the 
   * chat info to the server
   */
  
  message.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      socket.emit("new_message", {
        username: username.value,
        message: message.value,
        avatar: avatar.value,
      });
      message.value = "";
    }
  });

  /**
 * When a new message is posted, play a sound, update the newMessage 
 * element with the message/user info, and add the message to the 
 * database (we'll check server-side to make sure the message is only 
 * posted once, by checking the id of the user making the post)
 */

socket.on("new_message", (data) => {
    isTyping.innerText = "";
    messageAudio.play();
    let newMessage = document.createElement("p");
    newMessage.innerHTML = `<p><img id="avatar" height="30" src="${data.avatar}" alt=""> ${data.username}: ${data.message}</p>`;
    chatroom.prepend(newMessage);
    fetch("/chatroom", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        avatar: data.avatar,
        username: data.username,
        message: data.message,
      }),
    });
  });

  function getUserName() {
    fetch("/users/getName")
      .then((response) => {
      return response.json()
          .then((data) => {
        socket.emit("register-user", data);
      });
    });
  }
  
  getUserName();
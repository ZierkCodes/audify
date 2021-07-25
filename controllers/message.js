import { Message } from '../models/message.js'

export {
    chatRoom,
    postChat
}

function chatRoom(req, res) {
    Chat.find({})
    .sort({_id: -1})
    .limit(150)
    .then((chats) => {
        res.render('chatroom', {
            title: "Chat Room",
            user: req.user,
    })
  })
}

function postChat(req, res) {
    if (req.body.username === req.user.name) {
      Chat.create(req.body)
          .then(() => {
        res.status(201).send("Added");
      });
    } else {
      res.status(208).send("Already added");
    }
}
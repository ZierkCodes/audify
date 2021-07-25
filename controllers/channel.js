import { Message } from '../models/message.js'

export {
    chatRoom,
    postChat
}

function chatRoom(req, res) {
    Message.find({})
    .sort({_id: -1})
    .limit(150)
    .then((chats) => {
        res.render('channel', {
            title: "Chat Room",
            user: req.user,
            channel: req.params.channel,
            chats: chats
    })
  })
}

function postChat(req, res) {
    if (req.body.username === req.user.name) {
      Message.create(req.body)
          .then(() => {
        res.status(201).send("Added");
      });
    } else {
      res.status(208).send("Already added");
    }
}
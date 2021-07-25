import { User } from '../models/user.js'
import { Profile } from '../models/profile.js'
import { Message } from '../models/message.js'

export {
    chatRoom,
    postChat
}

function chatRoom(req, res) {
  console.log(req.user._id)
    Profile.findById(req.user.profile._id, (err, profile) => {
      console.log("USER PROFILE vvvvvvvvvvvvv")
      console.log(profile)
      Message.find({})
        .sort({_id: -1})
        .limit(150)
        .then((chats) => {
          console.log("CHAT:")
            res.render('channel', {
                title: "Chat Room",
                user: req.user,
                profile: profile,
                channel: req.params.channel,
                chats: chats
        })
      })
    })
}

function postChat(req, res) {
    if (req.body.username === req.user.profile.username) {
      Message.create(req.body)
          .then(() => {
        res.status(201).send("Added");
      });
    } else {
      res.status(208).send("Already added");
    }
}
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
      Message.find({'channel': req.params.channel})
        .sort({_id: 1})
        .limit(150)
        .then((chats) => {
          console.log("CHAT:")
          console.log(req.params.channel)
            res.render('channel', {
                title: "Chat Room",
                user: req.user,
                profile: profile,
                channel: req.params.channel,
                chats: chats,
                activeNav: ""
        })
      })
    })
}

function postChat(req, res) {
  console.log("controllers/channel.js >> Creating New Message with Body:")
  console.log(req.body)
  let message = new Message(req.body)
      message.save().then((msg) => {
        console.log("ADDED MESSAGE:")
        console.log(msg)
        res.status(201).send("Added")
  })
}
import mongoose from 'mongoose'
const Schema = mongoose.Schema

export {
  Message
}

const reactionSchema = new Schema({
    profile: {type: Schema.Types.ObjectId, ref: "Profile"},
    reaction: String
})

const messageSchema = new Schema({
    username: String,
    avatar: String, 
    message: String,
    songs: [{type: Schema.Types.ObjectId, ref: "Song"}],
    reactions: [{type: Schema.Types.ObjectId, ref: "Reaction"}]
}, {
  timestamps: true
})

const Message = mongoose.model('Message', messageSchema)
const Reaction = mongoose.model('Reaction', reactionSchema)
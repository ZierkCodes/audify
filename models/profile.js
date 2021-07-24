import mongoose from 'mongoose'
const Schema = mongoose.Schema

export {
  Profile
}

const moodSchema = new Schema({
    song: {type: Schema.Types.ObjectId, ref: "Song"}
}, {
    timestamps: true
})

const profileSchema = new Schema({
    name: String,
    username: String,
    avatar: String,
    friends: [{type: Schema.Types.ObjectId, ref: "Profile"}],
    moods: [{type: Schema.Types.ObjectId, ref: "Mood"}]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)
const Mood = mongoose.model('Mood', moodSchema)
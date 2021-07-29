import mongoose from 'mongoose'
const Schema = mongoose.Schema

export {
  Profile
}

const profileSchema = new Schema({
    name: String,
    username: String,
    avatar: String,
    verified_military: {type: Boolean, default: false},
    branch: String,
    friends: [{type: Schema.Types.ObjectId, ref: "Profile"}]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)
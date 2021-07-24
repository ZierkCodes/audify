import mongoose from 'mongoose'

export {
  User
}

const userSchema = new mongoose.Schema({
    spotify_id: String,
    profile: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"}
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

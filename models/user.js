import mongoose from 'mongoose'

export {
  User
}

const userSchema = new mongoose.Schema({
    google_id: String,
    email: String,
    profile: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"}
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

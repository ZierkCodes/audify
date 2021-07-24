import mongoose from 'mongoose'
const Schema = mongoose.Schema
export {
  Song
}

const songSchema = new Schema({
  uri: String,
  votes: Number,
})

const Song = mongoose.model('Song', songSchema)
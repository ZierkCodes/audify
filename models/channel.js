import mongoose from 'mongoose'
const Schema = mongoose.Schema;

export {
	Channel
}

const channelSchema = new Schema({
  name: String,
  members: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  songs: [{ type: Schema.Types.ObjectId, ref: "Song" }]
});

const Channel = mongoose.model("Channel", channelSchema);
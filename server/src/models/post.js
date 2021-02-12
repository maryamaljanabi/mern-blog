import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
});

export default mongoose.model("Post", postSchema);

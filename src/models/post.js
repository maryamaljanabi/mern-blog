import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = Schema({
  title: {
    type: String,
    required: [true, "Please enter the post's title"],
  },
  content: {
    type: String,
    required: [true, "Please enter the post's content"],
  },
  imagePath: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

export default mongoose.model("Post", postSchema);

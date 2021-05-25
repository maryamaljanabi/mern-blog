import mongoose from "mongoose";

var commentSchema = new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
});

export default mongoose.model("Comment", commentSchema);

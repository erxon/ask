import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    postId: { type: mongoose.Schema.ObjectId },
    content: String,
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    userName: { type: String, ref: "User" },
    likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    created: {
      type: Date,
      default: Date.now,
    },
    updated: Date,
  },
  {
    toJSON: { virtuals: true },
  }
);

const Comment = new mongoose.model("comment", CommentSchema);

export default Comment;

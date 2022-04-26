import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    postId: String,
    content: String,
    name: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
});

const Comment = new mongoose.model("comment", CommentSchema);

export default Comment;

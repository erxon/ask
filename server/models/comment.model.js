import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    postId: {type: mongoose.Schema.ObjectId, ref: "Question"},
    content: String,
    userId: {type: mongoose.Schema.ObjectId, ref: "User"},
    userName: {type: String, ref: "User"},
    likes: [{type: mongoose.Schema.ObjectId, ref: "User"}],
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
},
{
    toJSON: {virtuals: true}
}
);

CommentSchema.virtual("fromAnswers", {
    ref: "Answer",
    localField: "postId",
    foreignField: "_id",
    justOne: true
});

const Comment = new mongoose.model("comment", CommentSchema);

export default Comment;

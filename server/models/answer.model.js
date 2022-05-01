import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
    answerTitle: String,
    answerBody: String,
    user: {type: mongoose.Schema.ObjectId, ref: "User"},
    questionId: {type: mongoose.Schema.ObjectId, ref: "Question"},
    usersVoted: [{type: mongoose.Schema.ObjectId, ref: "User"}],
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
});

const Answer = new mongoose.model("Answer", AnswerSchema);

export default Answer;
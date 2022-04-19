import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
    answerTitle: String,
    answerBody: String,
    questionId: String,
    votes: {
        type: Number,
        default: 0,
        min: [0, "invalid"]
    },
    comments: [],
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    usersVoted: []
});

const Answer = new mongoose.model("Answer", AnswerSchema);

export default Answer;
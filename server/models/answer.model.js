import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
    answerTitle: String,
    answerBody: String,
    userId: String,
    questionId: String,
    usersVoted: [],
    comments: [],
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
});

const Answer = new mongoose.model("Answer", AnswerSchema);

export default Answer;
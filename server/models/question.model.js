import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    questionTitle: String,
    questionBody: String,
    userId: String,
    votes: {
        type: Number,
        default: 0,
        min: [0, "invalid"]
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    comments: [],
    usersVoted: []
})

const Question = new mongoose.model("Question", QuestionSchema);

export default Question;
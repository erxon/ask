import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    questionTitle: String,
    questionBody: String,
    userId: String,
    vote: Number,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    comments: []
})

const Question = new mongoose.model("Question", QuestionSchema);

export default Question;
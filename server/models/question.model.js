import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    questionTitle: String,
    questionBody: String,
    userId: String,
    usersVoted: [],
    comments: [],
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
})

const Question = new mongoose.model("Question", QuestionSchema);

export default Question;
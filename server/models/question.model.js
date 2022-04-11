import mongoose from "mongoose";

const QuestionSchema = {
    questionTitle: String,
    questionBody: String,
    userId: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    comments: []
}

const Question = mongoose.model("Question", QuestionSchema);

export default Question;
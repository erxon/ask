import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    questionTitle: String,
    questionBody: String,
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    usersVoted: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
})

const Question = new mongoose.model("Question", QuestionSchema);

export default Question;
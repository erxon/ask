import Question from "../models/question.model";
import errorHandler from "../helpers/dbErrorHandler";
import extend from "lodash/extend";
const create = async (req, res) => {
    const question = new Question(req.body);

    try {
        await question.save();
        return res.status(200).json({
            message: "question successfully posted"
        });
    } catch (err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const list = async (req, res) => {
    try{
        let questions = await Question.find();
        res.json(questions);
    } catch (err) {
        return res.status(400).res.json({
            error: errorHandler.getErrorMessage(err)
        });
    }
    
}

const questionByID = async (req, res, next) => {
    try{
        let findQuestion = await Question.findById(req.params.questionId)
        if (!findQuestion) {
            return res.status(400).json({
                error: "Question does not exist"
            })
        }
        req.question = findQuestion;
        next();
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

const read = async (req, res) => {
    return res.json(req.question);
}
const update = async (req, res) => {
    try{
        let edittedQuestion = req.question;
        edittedQuestion = extend(edittedQuestion, req.body);
        edittedQuestion.updated = Date.now();
        await edittedQuestion.save();
        res.json(edittedQuestion);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const remove = async (req, res) => {
    try{
        let questionToRemove = req.question;
        let removedQuestion = await questionToRemove.remove();
        res.json(removedQuestion)
    } catch (err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}


export default {create, list, read, update, remove, questionByID};
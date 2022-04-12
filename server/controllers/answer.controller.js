import Answer from "../models/answer.model";
import errorHandler from "../helpers/dbErrorHandler"; 
import extend from "lodash/extend";

const create = async (req, res) => {
    const answer = new Answer(req.body);
    try{
        await answer.save();
        return res.status(200).json({
            message: "Answer successfully posted"
        })
    } catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

const list = async (req, res) => {
    try{
        let answers = await Answer.find({"questionId": req.params.questionId});
        res.json(answers);
    } catch (err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

const answerByID = async (req, res, next) => {
    try{
        let foundAnswer = await Answer.findById(req.params.answerId);
        if(!foundAnswer){
            return res.status(400).json({
                message: "Answer does not exist"
            })
        }
        req.answer = foundAnswer;
    } catch(err){
        return res.json(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
    next();
}

const update = async (req, res) => {
    try{
        let answerToEdit = req.answer;
        answerToEdit = extend(answerToEdit, req.body);
        answerToEdit.updated = Date.now();

        await answerToEdit.save();

       res.json(answerToEdit);
    } catch(err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

const remove = async (req, res) => {
    try{
        let answer = req.answer;
        let answerRemoved = await answer.remove();
        return res.json(answerRemoved);
    } catch (err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

export default {create, list, answerByID, update, remove};
import Comment from "../models/comment.model";
import errorHandler from "../helpers/dbErrorHandler"; 
import extend from "lodash/extend";

const create = async (req, res) =>{
    const comment = new Comment(req.body);

    try {
        await comment.save();
        return res.status(200).json({
            message: "comment successfully posted"
        });
    } catch (err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const list = async (req, res) => {
    try{
        let comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        return res.status(400).res.json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const commentByID = async (req, res, next) => {
    try{
        let comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(400).json({
                error: "Comment does not exist"
            })
        }
        req.comment = comment;
        next();
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const read = (req, res) => {
    return res.json(req.comment);
};

const edit = async (req, res) => {
    try{
        let comment = req.comment;
        comment = extend(comment, req.body);
        comment.updated = Date.now();
        await comment.save();
        res.json(comment);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const remove = async (req, res) => {
    try{
        let comment = req.comment;
        let removeComment = await comment.remove();
        res.json(removeComment)
    } catch (err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

export default {
    create,
    list,
    read,
    edit,
    remove,
    commentByID
};
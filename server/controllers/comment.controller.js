import Comment from "../models/comment.model";
import errorHandler from "../helpers/dbErrorHandler";
import extend from "lodash/extend";

const create = async (req, res) => {
  const comment = new Comment(req.body);

  try {
    await comment.save();
    return res.json(comment);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    let comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    return res.status(400).res.json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const commentByID = async (req, res, next) => {
  try {
    let comment = await Comment.findById(req.params.commentId)
      .populate("user", "name")
      .exec();

    if (!comment) {
      return res.status(400).json({
        error: "Comment does not exist",
      });
    }

    req.commentFound = comment;
    next();
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const read = (req, res) => {
  return res.json(req.comment);
};

const edit = async (req, res) => {
  try {
    let comment = req.commentFound;
    comment = extend(comment, req.body);
    comment.updated = Date.now();
    await comment.save();
    res.json(comment);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let comment = req.commentFound;
    let removeComment = await comment.remove();
    res.json(removeComment);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const removeAll = async (req, res) => {
  try {
    let commentsRemove = await Comment.deleteMany({ user: req.params.userId });
    return commentsRemove;
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const like = async (req, res) => {
  try {
    let result = await Comment.findByIdAndUpdate(
      req.body.commentId,
      { $push: { likes: req.body.userId } },
      { new: true }
    );
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const unlike = async (req, res) => {
  try {
    let result = await Comment.findByIdAndUpdate(
      req.body.commentId,
      { $pull: { likes: req.body.userId } },
      { new: true }
    );
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
export default {
  create,
  list,
  read,
  edit,
  remove,
  commentByID,
  like,
  unlike,
  removeAll,
};

import Question from "../models/question.model";
import errorHandler from "../helpers/dbErrorHandler";
import extend from "lodash/extend";
import { questions } from "../../client/src/components/Home/api-question";

const create = async (req, res) => {
  const question = new Question(req.body);

  try {
    await question.save();
    return res.status(200).json(question);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    let questions = await Question.find();
    return res.json(questions);
  } catch (err) {
    return res.status(400).res.json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const questionByID = async (req, res, next) => {
  try {
    let findQuestion = await Question.findById(req.params.questionId)
      .populate("user", "name")
      .exec();
    if (!findQuestion) {
      return res.status(400).json({
        error: "Question does not exist",
      });
    }
    req.question = findQuestion;
    next();
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const read = (req, res) => {
  return res.json(req.question);
};

const update = async (req, res) => {
  try {
    let edittedQuestion = req.question;
    edittedQuestion = extend(edittedQuestion, req.body);
    edittedQuestion.updated = Date.now();
    await edittedQuestion.save();
    return res.json(edittedQuestion);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let questionToRemove = req.question;
    let removedQuestion = await questionToRemove.remove();
    return res.json(removedQuestion);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const removeAll = async (req, res) => {
  try {
    let removeQuestions = await Question.deleteMany({
      user: req.params.userId,
    });
    return res.json(removeQuestions);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const vote = async (req, res) => {
  try {
    let question = await Question.findByIdAndUpdate(
      req.body.questionId,
      { $push: { usersVoted: req.body.userId } },
      { new: true }
    );

    return res.json(question);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const unvote = async (req, res) => {
  try {
    let question = await Question.findByIdAndUpdate(
      req.body.questionId,
      { $pull: { usersVoted: req.body.userId } },
      { new: true }
    );

    return res.json(question);
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
  update,
  remove,
  questionByID,
  vote,
  unvote,
  removeAll,
};

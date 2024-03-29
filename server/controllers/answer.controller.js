import Answer from "../models/answer.model";
import errorHandler from "../helpers/dbErrorHandler";
import extend from "lodash/extend";

const create = async (req, res) => {
  const answer = new Answer(req.body);
  try {
    await answer.save();
    return res.status(200).json(answer);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const allAnswers = async (req, res) => {
  try {
    let answers = await Answer.find({});
    res.json(answers);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    let answers = await Answer.find({ questionId: req.params.questionId });
    res.json(answers);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const answerByID = async (req, res, next) => {
  try {
    let foundAnswer = await Answer.findById(req.params.answerId)
      .populate("user", "name")
      .exec();
    if (!foundAnswer) {
      return res.status(400).json({
        message: "Answer does not exist",
      });
    }
    req.answer = foundAnswer;
    next();
  } catch (err) {
    return res.json(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const read = (req, res) => {
  let answer = req.answer;
  return res.json(answer);
};

const update = async (req, res) => {
  try {
    let answer = req.answer;
    answer = extend(answer, req.body);
    answer.updated = Date.now();

    await answer.save();

    res.json(answer);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let answer = req.answer;
    let answerRemoved = await answer.remove();
    return res.json(answerRemoved);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const removeAll = async (req, res) => {
  try {
    let answersRemove = await Answer.deleteMany({ user: req.params.userId });
    return res.json(answersRemove);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const vote = async (req, res) => {
  try {
    let result = await Answer.findByIdAndUpdate(
      req.body.answerId,
      { $push: { usersVoted: req.body.userId } },
      { new: true }
    );
    // let answerToEdit = req.answer;
    // answerToEdit.usersVoted.push(req.body.userId);

    // await answerToEdit.save();
    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const unvote = async (req, res) => {
  try {
    let result = await Answer.findByIdAndUpdate(
      req.body.answerId,
      { $pull: { usersVoted: req.body.userId } },
      { new: true }
    );

    res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// const comment = async (req, res) => {
//     try{
//         let answerToEdit = req.answer;
//         answerToEdit.comments.push(req.body);

//         await answerToEdit.save();
//         res.json(answerToEdit);
//     } catch(err){
//         return res.status(400).json({
//             error: errorHandler.getErrorMessage(err)
//         });
//     }
// }

// const deleteComment = async (req, res) => {
//     try{
//         let answerToEdit = req.answer;
//         answerToEdit.comments = answerToEdit.comments.filter(
//             object => object.userId !== req.body.userId
//         );

//         await answerToEdit.save();
//         res.json(answerToEdit);
//     } catch(err){
//         return res.status(400).json({
//             error: errorHandler.getErrorMessage(err)
//         });
//     }
// }

export default {
  create,
  list,
  answerByID,
  read,
  update,
  remove,
  vote,
  unvote,
  allAnswers,
  removeAll,
};

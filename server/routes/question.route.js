import express from "express";
import questionCtrl from "../controllers/question.controller.js";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router
  .route("/api/questions")
  .get(questionCtrl.list)
  .post(authCtrl.requireSignin, questionCtrl.create);

router
  .route("/api/questions/vote")
  .put(authCtrl.requireSignin, questionCtrl.vote);

router
  .route("/api/questions/unvote")
  .put(authCtrl.requireSignin, questionCtrl.unvote);

router
  .route("/api/questions/:questionId")
  .get(questionCtrl.read)
  .put(authCtrl.requireSignin, questionCtrl.update)
  .delete(authCtrl.requireSignin, questionCtrl.remove);

router.route("/api/questions/user/:userId").delete(questionCtrl.removeAll);

router.param("questionId", questionCtrl.questionByID);

export default router;

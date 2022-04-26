import express from "express";
import answerCtrl from "../controllers/answer.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router.route("/api/answers")
    .post(authCtrl.requireSignin, answerCtrl.create);

router.route("/api/answers/list/:questionId")
    .get(answerCtrl.list);
    
router.route("/api/answers/:answerId")
    .get(answerCtrl.read)
    .put(authCtrl.requireSignin, answerCtrl.update)
    .delete(authCtrl.requireSignin, answerCtrl.remove);

router.route("/api/answers/vote/:answerId")
    .put(authCtrl.requireSignin, answerCtrl.vote);

router.route("/api/answers/unvote/:answerId")
    .put(authCtrl.requireSignin, answerCtrl.unvote);


router.param("answerId", answerCtrl.answerByID);

export default router;
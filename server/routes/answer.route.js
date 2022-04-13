import express from "express";
import answerCtrl from "../controllers/answer.controller.js";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router.route("/api/answers")
    .post(authCtrl.requireSignin, answerCtrl.create);

router.route("/api/answers/:questionId")
    .get(answerCtrl.list)
    
router.route("/api/answers/:answerId")
    .put(authCtrl.requireSignin, answerCtrl.update)
    .delete(authCtrl.requireSignin, answerCtrl.remove);

router.param("answerId", answerCtrl.answerByID);

export default router;
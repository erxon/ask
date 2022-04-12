import express from "express";
import answerCtrl from "../controllers/answer.controller.js";

const router = express.Router();

router.route("/api/answers")
    .post(answerCtrl.create);

router.route("/api/answers/:questionId")
    .get(answerCtrl.list)
    
router.route("/api/answers/:answerId")
    .put(answerCtrl.update)
    .delete(answerCtrl.remove);

router.param("answerId", answerCtrl.answerByID);

export default router;
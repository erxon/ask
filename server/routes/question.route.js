import express from "express";
import questionCtrl from "../controllers/question.controller.js";

const router = express.Router();

router.route("/api/questions")
    .get(questionCtrl.list)
    .post(questionCtrl.create);
    
router.route("/api/questions/:questionId")
    .get(questionCtrl.read)
    .put(questionCtrl.update)
    .delete(questionCtrl.remove);

router.param("questionId", questionCtrl.questionByID);

export default router;
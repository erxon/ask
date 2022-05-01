import express from "express";
import commentCtrl from "../controllers/comment.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router.route("/api/comments")
    .get(commentCtrl.list)
    .post(authCtrl.requireSignin, commentCtrl.create);

router.route('/api/comments/like')
  .put(authCtrl.requireSignin, commentCtrl.like);
router.route('/api/comments/unlike')
  .put(authCtrl.requireSignin, commentCtrl.unlike);

router.route("/api/comments/:commentId")
    .get(commentCtrl.read)
    .put(authCtrl.requireSignin, commentCtrl.edit)
    .delete(authCtrl.requireSignin, commentCtrl.remove);

router.param("commentId", commentCtrl.commentByID);

export default router;
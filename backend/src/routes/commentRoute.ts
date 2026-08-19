import express from "express";
import {
  createComment,
  deleteComment,
  getPostComments,
  updateComment,
} from "../controllers/commentController";
import { protect } from "../middleware/authMiddleware";
import { validateObjectId } from "../middleware/validateObjectId";
import { authCommentOwner } from "../middleware/authCommentOwner";

const router = express.Router();

router.post("/:postId/comments", protect, createComment);
router.get("/:postId/comments", getPostComments);
router.put(
  "/comments/:id/",
  protect,
  validateObjectId,
  authCommentOwner,
  updateComment,
);
router.delete(
  "/comments/:id/",
  protect,
  validateObjectId,
  authCommentOwner,
  deleteComment,
);
export default router;

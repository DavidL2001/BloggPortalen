import express from "express";
import {
  likePost,
  unlikePost,
  getPostLikes,
} from "../controllers/likeController";
import { protect, optionalAuth } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/:postId/like", protect, likePost);
router.delete("/:postId/like", protect, unlikePost);
router.get("/:postId/likes", optionalAuth, getPostLikes);

export default router;

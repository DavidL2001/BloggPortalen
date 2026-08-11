import express from "express";
import {
  likePost,
  unlikePost,
  getPostLikes
} from "../controllers/likeController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/:postId/like", protect, likePost);
router.delete("/:postId/like", protect, unlikePost);
router.get("/:postId/likes", protect, getPostLikes);

export default router;
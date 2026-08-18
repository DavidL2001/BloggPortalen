import express from "express";
import { uploadPostImage } from "../middleware/uploadMiddleware";
import { validateObjectId } from "../middleware/validateObjectId";
import { validateCategory } from "../middleware/validateCategory";
import { validatePostQuery } from "../middleware/validatePostQuery";
import { protect } from "../middleware/authMiddleware";
import { authPostOwner } from "../middleware/authPostOwner";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController";

const router = express.Router();

router.get("/", validatePostQuery, getPosts);
router.get("/:id", validateObjectId, getPostById);
router.post(
  "/",
  protect,
  uploadPostImage.single("image"),
  validateCategory,
  createPost,
);
router.put(
  "/:id",
  protect,
  validateObjectId,
  authPostOwner,
  uploadPostImage.single("image"),
  validateCategory,
  updatePost,
);
router.delete("/:id", protect, validateObjectId, authPostOwner, deletePost);

export default router;

import express from "express";
import { uploadPostImage } from "../middleware/uploadMiddleware";
import { validateObjectId } from "../middleware/validateObjectId";
import { validateCategory } from "../middleware/validateCategory";
import { validatePostQuery } from "../middleware/validatePostQuery";
import { 
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
 } from "../controllers/postController";

const router = express.Router();

router.get("/", validatePostQuery, getPosts);
router.get("/:id", validateObjectId, getPostById);
router.post("/", validateCategory, uploadPostImage.single("image"), createPost);
router.put("/:id", validateObjectId, validateCategory, uploadPostImage.single("image"), updatePost);
router.delete("/:id", validateObjectId, deletePost);

export default router;
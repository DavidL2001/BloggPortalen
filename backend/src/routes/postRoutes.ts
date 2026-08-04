import express from "express";
import { uploadPostImage } from "../middleware/uploadMiddleware";
import { 
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
 } from "../controllers/postController";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", uploadPostImage.single("image"), createPost);
router.put("/:id", uploadPostImage.single("image"), updatePost);
router.delete("/:id", deletePost);

export default router;
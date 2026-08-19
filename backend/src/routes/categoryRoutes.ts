import express from "express";
import {
  getCategories,
  getCategoryById,
  createCategory,
} from "../controllers/categoryController";
import { validateObjectId } from "../middleware/validateObjectId";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", validateObjectId, getCategoryById);
router.post("/", createCategory);

export default router;

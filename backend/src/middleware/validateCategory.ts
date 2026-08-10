import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { Category } from "../models/Category";

export const validateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId } = req.body;

  if (
    typeof categoryId !== "string" ||
    !Types.ObjectId.isValid(categoryId)
  ) {
    return res.status(400).json({
      message: "Ogiltigt kategori-ID",
    });
  }

  const categoryExists = await Category.exists({
    _id: categoryId,
  });

  if (!categoryExists) {
    return res.status(404).json({
      message: "Kategorin hittades inte",
    });
  }

  next();
};
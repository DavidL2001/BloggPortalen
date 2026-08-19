import { Request, Response, NextFunction } from "express";
import { Post } from "../models/Post";

export const authPostOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Inlägget hittades inte",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        message: "Du måste vara inloggad",
      });
    }

    if (post.authorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Du har inte behörighet att ändra detta inlägg",
      });
    }

    next();
  } catch (error) {
    console.error("Error checking post ownership:", error);

    return res.status(500).json({
      message: "Kunde inte kontrollera behörighet",
    });
  }
};
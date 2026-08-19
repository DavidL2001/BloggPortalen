import { Request, Response, NextFunction } from "express";
import { Comment } from "../models/Comment";

export const authCommentOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Kommentaren hittades inte"
      });
    }

    if (!req.user) {
      return res.status(401).json({
        message: "Du måste vara inloggad för att ändra en kommentar"
      });
    }

    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Du kan bara ändra eller ta bort en kommentar som tillhör dig"
      });
    }

    next();
  } catch (error) {
     return res.status(500).json({
      message: "Kunde inte kontrollera behörighet"
    });
  }
};
import { Request, Response } from "express";
import mongoose from "mongoose";
import { Comment } from "../models/Comment";
import { Post } from "../models/Post";

// Skapa en kommentar
export const createComment = async (req: Request, res: Response) => {
  try {
    const postId =
      typeof req.params.postId === "string" ? req.params.postId : undefined;

    const { content } = req.body;

    if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        message: "Ogiltigt inläggs-ID",
      });
    }

    if (!content || typeof content !== "string" || !content.trim()) {
      return res.status(400).json({
        message: "Kommentaren får inte vara tom",
      });
    }

    const postExists = await Post.exists({
      _id: postId,
    });

    if (!postExists) {
      return res.status(404).json({
        message: "Inlägget hittades inte",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        message: "Du måste vara inloggad för att lämna en kommentar",
      });
    }

    const comment = await Comment.create({
      content: content.trim(),
      userId: req.user._id,
      postId,
    });

    await comment.populate("userId", "username");
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({
      message: "Kunde inte skapa kommentaren",
    });
  }
};

// Hämta alla kommentarer för ett inlägg
export const getPostComments = async (req: Request, res: Response) => {
  try {
    const postId =
      typeof req.params.postId === "string" ? req.params.postId : undefined;

    if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        message: "Ogiltigt inläggs-ID",
      });
    }

    const postExists = await Post.exists({
      _id: postId,
    });

    if (!postExists) {
      return res.status(404).json({
        message: "Inlägget hittades inte",
      });
    }

    const comments = await Comment.find({ postId })
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      message: "Kunde inte hämta kommentarerna",
    });
  }
};

// Uppdatera en kommentar
export const updateComment = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;

    if (!content || typeof content !== "string" || !content.trim()) {
      return res.status(400).json({
        message: "Kommentaren får inte vara tom",
      });
    }

    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        content: content.trim(),
      },
      {
        new: true,
        runValidators: true,
      },
    ).populate("userId", "username");

    if (!comment) {
      return res.status(404).json({
        message: "Kommentaren hittades inte",
      });
    }

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({
      message: "Kunde inte uppdatera kommentaren",
    });
  }
};

// Ta bort en kommentar
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Kommentaren hittades inte",
      });
    }

    res.status(200).json({
      message: "Kommentaren har tagits bort",
    });
  } catch (error) {
    res.status(500).json({
      message: "Kunde inte ta bort kommentaren",
    });
  }
};

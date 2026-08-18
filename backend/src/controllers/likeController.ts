import { Request, Response } from "express";
import { Like } from "../models/Like";
import { Post } from "../models/Post";
import mongoose from "mongoose";

// Gilla ett inlägg
export const likePost = async (req: Request, res: Response) => {
  try {
    const postId =
      typeof req.params.postId === "string" ? req.params.postId : undefined;

    if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        message: "Ogiltigt inläggs-ID",
      });
    }

    const postExists = await Post.exists({ _id: postId });

    if (!postExists) {
      return res.status(404).json({
        message: "Inlägget hittades inte",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        message: "Du måste vara inloggad för att gilla ett inlägg",
      });
    }

    const like = await Like.create({
      userId: req.user._id,
      postId,
    });

    res.status(201).json({
      message: "Inlägget gillades",
      like,
    });
  } catch (error) {
    if (
      error instanceof mongoose.mongo.MongoServerError &&
      error.code === 11000
    ) {
      return res.status(400).json({
        message: "Du har redan gillat detta inlägg",
      });
    }

    console.error("Error liking post:", error); // Dessa errors syns inte för användaren utan loggas i serverns konsol för felsökning

    res.status(500).json({
      message: "Kunde inte gilla inlägget",
    });
  }
};

// Ta bort en like
export const unlikePost = async (req: Request, res: Response) => {
  try {
    const postId =
      typeof req.params.postId === "string" ? req.params.postId : undefined;

    if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        message: "Ogiltigt inläggs-ID",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        message: "Du måste vara inloggad för att ta bort en gilla-markering",
      });
    }

    const like = await Like.findOneAndDelete({
      userId: req.user._id,
      postId,
    });

    if (!like) {
      return res.status(404).json({
        message: "Du har inte gillat detta inlägg",
      });
    }

    res.status(200).json({
      message: "Du gillar inte inlägget längre",
    });
  } catch (error) {
    console.error("Error unliking post:", error);

    res.status(500).json({
      message: "Kunde inte ta bort gilla-markeringen",
    });
  }
};

// Hämtar antal likes och om den inloggade användaren har gillat inlägget
export const getPostLikes = async (req: Request, res: Response) => {
  try {
    const postId =
      typeof req.params.postId === "string" ? req.params.postId : undefined;

    if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        message: "Ogiltigt inläggs-ID",
      });
    }

    const postExists = await Post.exists({ _id: postId });

    if (!postExists) {
      return res.status(404).json({
        message: "Inlägget hittades inte",
      });
    }

    const count = await Like.countDocuments({ postId });

    const likedByUser = req.user
      ? Boolean(
          await Like.exists({
            postId,
            userId: req.user._id,
          }),
        )
      : false;

    res.status(200).json({
      count,
      likedByUser,
    });
  } catch (error) {
    console.error("Error fetching post likes:", error);

    res.status(500).json({
      message: "Kunde inte hämta gilla-markeringar",
    });
  }
};

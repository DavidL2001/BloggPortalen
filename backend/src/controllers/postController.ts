import { Request, Response } from "express";
import { Post } from "../models/Post";
import fs from "fs";
import path from "path";

// Hämta alla inlägg
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Could not fetch posts",
    });
  }
};

// Skapa ett nytt inlägg
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, authorId, categoryId } = req.body;

    const featuredImage = req.file ? `/uploads/posts/${req.file.filename}` : "";

    const post = await Post.create({
      title,
      content,
      authorId,
      categoryId,
      featuredImage,
    });

    res.status(201).json(post);
  } catch (error) {
      res.status(500).json({
      message: "Could not create post",
    });
  }
};

// Hämta ett inlägg med ID
export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      message: "Could not fetch post",
    });
  }
};

// Uppdatera ett inlägg (ändrar man bild tas den gamla bort och ersätts med den nya)
export const updatePost = async (req: Request, res: Response) => {
  try {
    const { title, content, categoryId } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    post.title = title;
    post.content = content;
    post.categoryId = categoryId;
    
    if (req.file) {
        if (post.featuredImage) {
            const oldImagePath = path.join(
                process.cwd(),
                "src",
                post.featuredImage.replace(/^\/+/, "")
    );

    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }
  }

  post.featuredImage = `/uploads/posts/${req.file.filename}`;
}

    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({
      message: "Could not update post",
    });
  }
};

// Ta bort ett inlägg (om ett inlägg har en bild så tas den bort också från systemet)
export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.featuredImage) {
      const imagePath = path.join(
        process.cwd(),
        "src",
        post.featuredImage.replace(/^\/+/, "")
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await post.deleteOne();

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not delete post",
    });
  }
};
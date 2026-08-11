import { Request, Response } from "express";
import { Types } from "mongoose";
import { Post, IPost } from "../models/Post";
import fs from "fs";
import path from "path";

// Typ för filter för sökning och kategorier
type PostFilter = {
  $or?: {
    title?: { $regex: string; $options: string };
    content?: { $regex: string; $options: string };
  }[];
  categoryId?: string | Types.ObjectId;
};

// Ser till att filer som laddas upp tas bort om något går fel i processen, t.ex. om det inte går att skapa ett inlägg.
const deleteImage = (imagePath: string) => {
  const fullPath = path.join(
    process.cwd(),
    "src",
    imagePath.replace(/^\/+/, "")
  );

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

// Hämta inlägg med sökning, kategorifiltrering, sortering och paginering
export const getPosts = async (req: Request, res: Response) => {
  try {
    const search =
      typeof req.query.search === "string"
        ? req.query.search
        : undefined;

    const category =
      typeof req.query.category === "string"
        ? req.query.category
        : undefined;

    const sort =
      typeof req.query.sort === "string"
        ? req.query.sort
        : undefined;

    const page =
      typeof req.query.page === "string"
        ? Number(req.query.page)
        : 1;

    const limit =
      typeof req.query.limit === "string"
        ? Number(req.query.limit)
        : 10;

    const filter: PostFilter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      filter.categoryId = category;
    }

    let sortOption: { createdAt: 1 | -1 } = {
      createdAt: -1,
    };

    if (sort === "oldest") {
      sortOption = {
        createdAt: 1,
      };
    }

    const skip = (page - 1) * limit;
    const totalPosts = await Post.countDocuments(filter);
    const posts = await Post.find(filter)
      .populate("authorId", "username")
      .populate("categoryId", "name description")
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      posts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
        totalPosts,
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
      res.status(500).json({
      message: "Kunde inte hämta inläggen"
    });
  }
};

// Skapa ett nytt inlägg
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, authorId, categoryId } = req.body;

    const featuredImage = req.file
      ? `/uploads/posts/${req.file.filename}`
      : "";

    const post = await Post.create({
      title,
      content,
      authorId,
      categoryId,
      featuredImage,
    });

    res.status(201).json(post);
  } catch (error) {
    if (req.file) {
      deleteImage(`/uploads/posts/${req.file.filename}`);
    }

    res.status(500).json({
      message: "Kunde inte skapa inlägget"
    });
  }
};

// Hämta ett inlägg med ID
export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("authorId", "username")
      .populate("categoryId", "name description");

    if (!post) {
      return res.status(404).json({
        message: "Inlägget hittades inte",
      });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);

    res.status(500).json({
      message: "Kunde inte hämta inlägget",
    });
  }
};

// Uppdatera ett inlägg (ändrar man bild tas den gamla bort och ersätts med den nya)
export const updatePost = async (req: Request, res: Response) => {
  let oldImage = "";

  try {
    const { title, content, categoryId } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      if (req.file) {
        deleteImage(`/uploads/posts/${req.file.filename}`);
      }

      return res.status(404).json({
        message: "Inlägget hittades inte"
      });
    }

    post.title = title;
    post.content = content;
    post.categoryId = categoryId;

    if (req.file) {
      oldImage = post.featuredImage;
      post.featuredImage = `/uploads/posts/${req.file.filename}`;
    }

    const updatedPost = await post.save();

    if (req.file && oldImage) {
      deleteImage(oldImage);
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    if (req.file) {
      deleteImage(`/uploads/posts/${req.file.filename}`);
    }

    res.status(500).json({
      message: "Kunde inte uppdatera inlägget"
    });
  }
};

// Ta bort ett inlägg (om ett inlägg har en bild så tas den bort också från systemet)
export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Inlägget hittades inte"
      });
    }

    const image = post.featuredImage;

    await post.deleteOne();

    if (image) {
      deleteImage(image);
    }

    res.status(200).json({
      message: "Inlägget har tagits bort"
    });
  } catch (error) {
    res.status(500).json({
      message: "Kunde inte ta bort inlägget"
    });
  }
};
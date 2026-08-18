import { Request, Response } from "express";
import { Category } from "../models/Category";
import mongoose from "mongoose";

// Hämta alla kategorier
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find().sort({ name: 1 });

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);

    res.status(500).json({
      message: "Kunde inte hämta kategorier",
    });
  }
};

// Hämta en kategori med ID
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Kategorin hittades inte",
      });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      message: "Kunde inte hämta kategorin",
    });
  }
};

// Skapa en ny kategori (inte för användare, utan för oss att kunna lägga till kategorier i Postman)
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const category = await Category.create({
      name,
      description,
    });

    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating category:", error);

    if (
      error instanceof mongoose.mongo.MongoServerError &&
      error.code === 11000
    ) {
      return res.status(400).json({
        message: "En kategori med det namnet finns redan",
      });
    }

    return res.status(500).json({
      message: "Kunde inte skapa kategorin",
    });
  }
};

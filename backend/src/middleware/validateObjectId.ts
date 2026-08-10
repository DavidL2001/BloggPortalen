//Ser till att id som skickas in är en giltig objectId. Om det inte är det, returnera ett felmeddelande med statuskod 400 (Bad Request).
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const validateObjectId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Ogiltigt ID"
    });
  }

  next();
};
import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

export const validatePostQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { category, sort, page, limit } = req.query;

  // Validerar kategorin om den finns
  if (
    category &&
    (typeof category !== "string" || !Types.ObjectId.isValid(category))
  ) {
    return res.status(400).json({
      message: "Invalid category ID"
    });
  }

  // Validerar sorteringen
  if (
    sort &&
    (typeof sort !== "string" ||
      (sort !== "newest" && sort !== "oldest"))
  ) {
    return res.status(400).json({
      message: "Sort must be 'newest' or 'oldest'"
    });
  }

// Validerar sidnumret
  if (
  page &&
  (typeof page !== "string" ||
    !Number.isInteger(Number(page)) ||
    Number(page) < 1)
) {
  return res.status(400).json({
    message: "Page must be a positive number"
  });
}

// Validerar limit
if (
  limit &&
  (typeof limit !== "string" ||
    !Number.isInteger(Number(limit)) ||
    Number(limit) < 1 ||
    Number(limit) > 50)
) {
  return res.status(400).json({
    message: "Limit must be an number between 1 and 50"
  });
}

  next();
};
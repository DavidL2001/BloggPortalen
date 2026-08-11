//Hanterar errors för Multer som t.ex för stora filer eller fel filtyp.
import { Request, Response, NextFunction } from "express";
import multer from "multer";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "Bilden är för stor. Maxstorlek är 5 MB"
      });
    }

    return res.status(400).json({
      message: error.message,
    });
  }

  if (error.message === "Bara bilder av typen JPEG, PNG och WebP är tillåtna") {
    return res.status(400).json({
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    message: "Intern serverfel. Vänligen försök igen.",
  });
};
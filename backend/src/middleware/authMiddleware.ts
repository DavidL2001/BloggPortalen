import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";

interface DecodedToken extends JwtPayload {
  id: string;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  let token: string | undefined;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as DecodedToken;

      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res
          .status(401)
          .json({ message: "Användaren finns inte längre" });
      }

      req.user = user;
      return next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Ej auktoriserad, ogiltig eller utgången token" });
    }
  }

  return res
    .status(401)
    .json({ message: "Ej auktoriserad, ingen token angiven" });
};

/* Katrina: Behövde tillägga optional auth för att kunna hämta likes utan att vara inloggad. 
Annars får man 401 Unauthorized */
export const optionalAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  if (!req.headers.authorization?.startsWith("Bearer")) {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as DecodedToken;

    const user = await User.findById(decoded.id).select("-password");

    if (user) {
      req.user = user;
    }
  } catch {}

  next();
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Du har inte behörighet för denna åtgärd" });
    }
    next();
  };
};

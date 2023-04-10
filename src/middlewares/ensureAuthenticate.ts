import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export async function ensureAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      message: "Token required",
    });
  }

  const [_, token] = authHeader.split(" ");

  try {
    const { sub } = verify(token, "minhachavesecreta");
    req.userId = sub as string;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.utils";

export const requireAuth = (
  req : Request,
  res : Response,
  next : NextFunction
) => {
  const token = req.cookies?.token;
  // console.log('Req:', req.cookies);
  // console.log("Token from cookie:", token);

  if (!token) {
    res.status(401).json({ message: "Saknas token" });
    return;
  }

  try {
    const payload = verifyToken(token);
    console.log("Decoded JWT payload:", payload);

    next();
  } catch {
    res.status(401).json({ message: "Ogiltig eller gammal token" });
  }
};
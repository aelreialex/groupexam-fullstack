import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.utils";
import type { JwtPayload } from "../types/types"

export const requireAdmin = (
  req : Request,
  res : Response,
  next : NextFunction
) => {
  const token = req.cookies?.token;
//   console.log('Req:', req.cookies);
//   console.log("Token from cookie:", token);

  if (!token) {
    res.status(401).json({ message: "Saknas token" });
    return;
  }

  try {
    const payload = verifyToken(token) as JwtPayload;
    console.log("Decoded JWT payload:", payload);

    if(typeof payload !== "object" || payload === null || payload.role !== 'admin'){
      res.status(403).json({ message: "Inte autentiserad för att använda denna funktion – endast admin kan skapa en ny användare i databasen."})
      return;
    };

    next();
  } catch {
    res.status(401).json({ message: "Ogiltig eller gammal token" });
  }
};
import { Request, Response, NextFunction } from "express";
import * as aiService from "../services/ai.service";

export interface ChatRequestBody {
  message: string;
}

export const chatWithAI = async (
  req: Request<{}, {}, ChatRequestBody>,
  res: Response,
) => {
  const result = await aiService.chatWithAI(req.body.message);

  res.status(201).json({
    result,
  });
};

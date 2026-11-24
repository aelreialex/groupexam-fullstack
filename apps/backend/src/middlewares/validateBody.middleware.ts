import { ZodError, type ZodType } from "zod";
import { type Request, type Response, type NextFunction } from "express";

type AppError = Error & { status?: number };

export const zodValidate =
  (schema: ZodType) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const body: unknown = req.body;
    try {
      const parsed = schema.parse(body);
      req.body = parsed;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const zodMessage = err.issues.map((issue) => issue.message).join(". ");
        const error: AppError = new Error(zodMessage || "Validation failed");
        error.status = 400;
        throw error;
      }

      throw err;
    }
  };
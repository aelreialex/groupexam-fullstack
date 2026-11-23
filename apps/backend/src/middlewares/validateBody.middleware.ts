import { ZodType } from "zod";
import { type Request, type Response, type NextFunction } from "express";

export const zodValidate =
	(schema: ZodType) =>
	(req: Request, _res: Response, next: NextFunction): void => {
		const body: unknown = req.body;
		schema.parse(body);
		next();
	};

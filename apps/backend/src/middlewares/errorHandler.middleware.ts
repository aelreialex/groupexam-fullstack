import type { Request, Response, NextFunction} from 'express'
import { ErrorType } from '../types/types';



export const errorHandler = (error: ErrorType, _req: Request, res: Response, _next: NextFunction) => {
	res.status(error.status || 500).json({
		success: false,
		message: error.message,
	});
};
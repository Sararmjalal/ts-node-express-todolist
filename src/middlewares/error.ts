import { AppError } from '../types/types';
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = (err as any).status || 500
  const message = (err as any).message || "Internal Server Error"
  console.error(err);
  res.status(status || 500).json({
    message: message || 'Internal Server Error',
  });
};
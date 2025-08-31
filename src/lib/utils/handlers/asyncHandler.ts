import { NextFunction, Request, Response } from "express";
import { asyncHandlerFn } from "../../../types/types";

export const asyncHandler = (fn: asyncHandlerFn) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next)
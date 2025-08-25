import { Request, Response } from "express";
import { ERRORS } from "../types/enums/errors";
import { getAllTodos, getSingleTodo } from "../models/todo";
import { errorResponse, requestPayload, successResponse } from "../lib/utils";

export const getTodos = async (_: Request, res: Response) => {
  try {
    const todos = await getAllTodos();
    res.status(200).json(successResponse(todos));
  } catch (err) {
    res.status(500).json(errorResponse(ERRORS.GET_TODOS));
  }
}

export const getTodo = async (req: Request, res: Response) => {
  try {
    const { id } = requestPayload<{ id: string }>(req)
    if (!id)
      res.status(400).json(errorResponse(ERRORS.BAD_REQUEST))
    const thisTodo = getSingleTodo(id)
    if (!thisTodo)
      res.status(404).json(errorResponse(ERRORS.TODO_NOT_FOUND))
    res.status(200).json(successResponse(thisTodo));
  } catch (err) {
    res.status(500).json(errorResponse(ERRORS.GET_TODO));
  }
}

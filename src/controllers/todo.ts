import { Request, Response, NextFunction } from "express"
import { ERRORS } from "../types/enums/errors"
import { MESSAGES } from "../types/enums/messages"
import { errorResponse, requestPayload, successResponse } from "../lib/utils"
import { createTodo, deleteTodo, getAllTodos, getSingleTodo, updateTodo } from "../models/todo"

export const getTodos = async (_: Request, res: Response) => {
  const todos = await getAllTodos()
  return res.status(200).json(successResponse(todos, MESSAGES.GET_TODOS))
}

export const getTodo = async (req: Request, res: Response) => {
  const { id } = requestPayload<{ id: string }>(req)
  if (!id) return res.status(400).json(errorResponse(ERRORS.BAD_REQUEST))

  const thisTodo = await getSingleTodo(id)
  if (!thisTodo) return res.status(404).json(errorResponse(ERRORS.TODO_NOT_FOUND))

  return res.status(200).json(successResponse(thisTodo, MESSAGES.GET_TODO))
}

export const addTodo = async (req: Request, res: Response) => {
  const { text } = requestPayload<{ text: string }>(req)
  if (!text) return res.status(400).json(errorResponse(ERRORS.BAD_REQUEST))

  const thisTodo = await createTodo(text)
  return res.status(200).json(successResponse(thisTodo, MESSAGES.ADD_TODO))
}

export const editTodo = async (req: Request, res: Response) => {
  const { id, text } = requestPayload<{ id: string; text: string }>(req)
  if (!id || !text) return res.status(400).json(errorResponse(ERRORS.BAD_REQUEST))

  const thisTodo = await updateTodo(id, text)
  if (!thisTodo) return res.status(404).json(errorResponse(ERRORS.TODO_NOT_FOUND))

  return res.status(200).json(successResponse(thisTodo, MESSAGES.EDIT_TODO))
}

export const removeTodo = async (req: Request, res: Response) => {
  const { id } = requestPayload<{ id: string }>(req)
  if (!id) return res.status(400).json(errorResponse(ERRORS.BAD_REQUEST))

  await deleteTodo(id)
  return res.status(200).json(successResponse(undefined, MESSAGES.REMOVE_TODO))
}
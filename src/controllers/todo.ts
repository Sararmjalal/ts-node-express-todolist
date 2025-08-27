import { Todo } from "../types/types"
import { Request, Response } from "express"
import { ERRORS } from "../types/enums/errors"
import { MESSAGES } from "../types/enums/messages"
import { errorResponse, requestPayload, successResponse } from "../lib/utils"
import { createTodo, deleteTodo, getAllTodos, getSingleTodo, updateTodo } from "../models/todo"
import { getSingleCategory } from "../models/category"

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
  const { text, categoryId } = requestPayload<{ text: string, categoryId: string }>(req)
  if (!text || !categoryId) return res.status(400).json(errorResponse(ERRORS.BAD_REQUEST))
  const thisCategory = await getSingleCategory(categoryId)
  if (!thisCategory) return res.status(404).json(errorResponse(ERRORS.CATEGORY_NOT_FOUND))
  const thisTodo = await createTodo(text, categoryId)
  return res.status(200).json(successResponse(thisTodo, MESSAGES.ADD_TODO))
}

export const editTodo = async (req: Request, res: Response) => {
  const { id, text, status, categoryId } = requestPayload<{ id: string; text: string; status?: Todo["status"]; categoryId?: string }>(req)
  if (!id || !text || (status && status !== "done" && status !== "pending"))
    return res.status(400).json(errorResponse(ERRORS.BAD_REQUEST))
  if (categoryId) {
    const thisCategory = await getSingleCategory(categoryId)
    if (!thisCategory) return res.status(404).json(errorResponse(ERRORS.CATEGORY_NOT_FOUND))
  }
  const thisTodo = await updateTodo(id, text, status, categoryId)
  if (!thisTodo) return res.status(404).json(errorResponse(ERRORS.TODO_NOT_FOUND))
  return res.status(200).json(successResponse(thisTodo, MESSAGES.EDIT_TODO))
}

export const removeTodo = async (req: Request, res: Response) => {
  const { id } = requestPayload<{ id: string }>(req)
  if (!id) return res.status(400).json(errorResponse(ERRORS.BAD_REQUEST))

  const thisTodo = await deleteTodo(id)
  if (!thisTodo) return res.status(404).json(errorResponse(ERRORS.TODO_NOT_FOUND))

  return res.status(200).json(successResponse(thisTodo, MESSAGES.REMOVE_TODO))
}
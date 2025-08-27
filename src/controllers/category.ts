import { Request, Response } from "express"
import { ERRORS } from "../types/enums/errors"
import { MESSAGES } from "../types/enums/messages"
import { errorResponse, requestPayload, successResponse } from "../lib/utils"
import { createCategory, deleteCategory, getAllCategories, getSingleCategory, updateCategory } from "../models/category"

export const getCategories = async (_: Request, res: Response) => {
  const categories = await getAllCategories()
  return res.status(200).json(successResponse(categories, MESSAGES.GET_CATEGORIES))
}

export const getCategory = async (req: Request, res: Response) => {
  const { id } = requestPayload<{ id: string }>(req)
  if (!id) return res.status(400).json(errorResponse(ERRORS.BAD_REQUEST))

  const thisCategory = await getSingleCategory(id)
  if (!thisCategory) return res.status(404).json(errorResponse(ERRORS.CATEGORY_NOT_FOUND))

  return res.status(200).json(successResponse(thisCategory, MESSAGES.GET_CATEGORY))
}

export const addCategory = async (req: Request, res: Response) => {
  const { text } = requestPayload<{ text: string }>(req)
  if (!text) return res.status(400).json(errorResponse(ERRORS.BAD_REQUEST))

  const thisCategory = await createCategory(text)
  return res.status(200).json(successResponse(thisCategory, MESSAGES.ADD_CATEGORY))
}

export const editCategory = async (req: Request, res: Response) => {
  const { id, text } = requestPayload<{ id: string; text: string }>(req)
  if (!id || !text) return res.status(400).json(errorResponse(ERRORS.BAD_REQUEST))
  const thisCategory = await updateCategory(id, text)
  if (!thisCategory) return res.status(404).json(errorResponse(ERRORS.CATEGORY_NOT_FOUND))
  return res.status(200).json(successResponse(thisCategory, MESSAGES.EDIT_CATEGORY))
}

export const removeCategory = async (req: Request, res: Response) => {
  const { id } = requestPayload<{ id: string }>(req)
  if (!id) return res.status(400).json(errorResponse(ERRORS.BAD_REQUEST))

  const thisCategory = await deleteCategory(id)
  if (!thisCategory) return res.status(404).json(errorResponse(ERRORS.CATEGORY_NOT_FOUND))

  return res.status(200).json(successResponse(thisCategory, MESSAGES.REMOVE_CATEGORY))
}
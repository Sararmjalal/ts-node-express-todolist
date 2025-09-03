import { Router } from "express"
import { asyncHandler } from "./asyncHandler"
import { asyncHandlerFn } from "../../../types/types"
import { ROUTES } from "../../../types/enums/routes"

type HandlerSet = {
  getAll: asyncHandlerFn
  create?: asyncHandlerFn
  update?: asyncHandlerFn
  getSingle?: asyncHandlerFn
  remove?: asyncHandlerFn
}

export function createRouter(handlers: HandlerSet) {
  const r = Router()
  r.get(ROUTES.GET_ALL, asyncHandler(handlers.getAll))
  if (handlers.create) r.post(ROUTES.ADD, asyncHandler(handlers.create))
  if (handlers.update) r.patch(ROUTES.EDIT, asyncHandler(handlers.update))
  if (handlers.remove) r.delete(ROUTES.REMOVE, asyncHandler(handlers.remove))
  if (handlers.getSingle) r.get(ROUTES.GET_SINGLE, asyncHandler(handlers.getSingle))
  return r
}
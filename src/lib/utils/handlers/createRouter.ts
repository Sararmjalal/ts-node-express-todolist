import { Router } from "express"
import { asyncHandler } from "./asyncHandler"
import { asyncHandlerFn } from "../../../types/types"
import { ROUTES } from "../../../types/enums/routes"

type HandlerSet = {
  getAll: asyncHandlerFn
  create: asyncHandlerFn
  update: asyncHandlerFn
  getSingle: asyncHandlerFn
  remove: asyncHandlerFn
}

export function createRouter(handlers: HandlerSet) {
  const r = Router()
  r.get(ROUTES.GET_ALL, asyncHandler(handlers.getAll))
  r.post(ROUTES.ADD, asyncHandler(handlers.create))
  r.patch(ROUTES.EDIT, asyncHandler(handlers.update))
  r.get(ROUTES.GET_SINGLE, asyncHandler(handlers.getSingle))
  r.delete(ROUTES.REMOVE, asyncHandler(handlers.remove))
  return r
}
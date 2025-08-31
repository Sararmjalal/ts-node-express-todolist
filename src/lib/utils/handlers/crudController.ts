import { Request, Response } from "express"
import { ERRORS } from "../../../types/enums/errors"
import { CRUDModel, DataCollection } from "../../../types/types"
import { CATEGORY_MESSAGES, TODO_MESSAGES } from "../../../types/enums/messages"
import { errorResponse, successResponse, requestPayload, applyListFilters } from "../"

const messagesByCollection = {
  todo: TODO_MESSAGES,
  category: CATEGORY_MESSAGES
}

export function crudController<T, K>(model: CRUDModel<T, K>, collection: DataCollection) {
  const messages = messagesByCollection[collection]
  return {
    getAll: async (req: Request, res: Response) => {
      let list = await model.getAll()
      const filters = req.query
      if (list && list.length > 1) {
        const filteredList = applyListFilters<T>(list, filters)
        if (!filteredList) return res.status(400).json(errorResponse(ERRORS.BAD_REQUEST))
        list = filteredList
      }
      return res.status(200).json(successResponse(list, messages.GET_ALL))
    },
    getSingle: async (req: Request, res: Response) => {
      const { id } = requestPayload<CRUDModel<T, K>["getSingle"]["arguments"]>(req)
      if (!id) return res.status(400).json(errorResponse(ERRORS.BAD_REQUEST))
      const item = await model.getSingle(id)
      if (!item) return res.status(404).json(errorResponse(`${collection} ${ERRORS.NOT_FOUND}`))
      return res.status(200).json(successResponse(item, messages.GET_ONE))
    },
    create: async (req: Request, res: Response) => {
      const item = await model.create(requestPayload<CRUDModel<T, K>["create"]["arguments"]>(req))
      if (!item) return res.status(400).json(errorResponse(ERRORS.BAD_REQUEST))
      return res.status(201).json(successResponse(item, messages.CREATE))
    },
    update: async (req: Request, res: Response) => {
      const { id, ...payload } = requestPayload<CRUDModel<T, K>["update"]["arguments"]>(req)
      if (!id) return res.status(400).json(errorResponse(ERRORS.BAD_REQUEST))
      const item = await model.update(id, payload)
      if (!item) return res.status(400).json(errorResponse(ERRORS.BAD_REQUEST))
      return res.status(200).json(successResponse(item, messages.UPDATE))
    },
    remove: async (req: Request, res: Response) => {
      const { id } = requestPayload<CRUDModel<T, K>["remove"]["arguments"]>(req)
      if (!id) return res.status(400).json(errorResponse(ERRORS.BAD_REQUEST))
      const item = await model.remove(id)
      if (!item) return res.status(404).json(errorResponse(`${collection} ${ERRORS.NOT_FOUND}`))
      return res.status(200).json(successResponse(item, messages.REMOVE))
    },
  }
}
import { Request, Response } from "express"
import { ERRORS } from "../../../types/enums/errors"
import { BaseItem, CRUDItem, CRUDModel, DataCollection } from "../../../types/types"
import { errorResponse, successResponse, requestPayload, applyListFilters } from "../"
import { CATEGORY_MESSAGES, COLOR_MESSAGES, TODO_MESSAGES } from "../../../types/enums/messages"

const messagesByCollection = {
  todo: TODO_MESSAGES,
  color: COLOR_MESSAGES,
  category: CATEGORY_MESSAGES,
}

type Functions<T, K> = {
  [K in keyof CRUDModel<T, K>]: (
    fn: Exclude<CRUDModel<T, K>[K], undefined>,
    req: Request,
    res: Response
  ) => Promise<Response>
}

export function crudController<T, K>(model: CRUDModel<T, K>, collection: DataCollection) {
  const messages = messagesByCollection[collection]
  const functionsKey = ["getAll", "getSingle", "create", "update", "remove"] as const

  const functions: Functions<T, K> = {
    getAll: async (getAll, req, res) => {
      let list = await getAll()
      const filters = req.query
      if (list && list.length > 1) {
        const filteredList = applyListFilters<T>(list, filters)
        if (!filteredList) return res.status(400).json(errorResponse(ERRORS.BAD_REQUEST))
        list = filteredList
      }
      return res.status(200).json(successResponse(list, messages.GET_ALL))
    },
    getSingle: async (getSingle, req, res) => {
      const { id } = requestPayload<typeof getSingle["arguments"]>(req)
      if (!id) return res.status(400).json(errorResponse(ERRORS.BAD_REQUEST))
      const item = await getSingle(id)
      if (!item) return res.status(404).json(errorResponse(`${collection} ${ERRORS.NOT_FOUND}`))
      return res.status(200).json(successResponse(item, messages.GET_ONE))
    },
    create: async (create, req, res) => {
      const item = await create(requestPayload<typeof create["arguments"]>(req))
      if (!item) return res.status(400).json(errorResponse(ERRORS.BAD_REQUEST))
      return res.status(201).json(successResponse(item, messages.CREATE))
    },
    update: async (update, req, res) => {
      const { id, ...payload } = requestPayload<typeof update["arguments"]>(req)
      if (!id) return res.status(400).json(errorResponse(ERRORS.BAD_REQUEST))
      const item = await update(id, payload)
      if (!item) return res.status(400).json(errorResponse(ERRORS.BAD_REQUEST))
      return res.status(200).json(successResponse(item, messages.UPDATE))
    },
    remove: async (remove, req, res) => {
      const { id } = requestPayload<typeof remove["arguments"]>(req)
      if (!id) return res.status(400).json(errorResponse(ERRORS.BAD_REQUEST))
      const item = await remove(id)
      if (!item) return res.status(404).json(errorResponse(`${collection} ${ERRORS.NOT_FOUND}`))
      return res.status(200).json(successResponse(item, messages.REMOVE))
    },
  }
  const thisController = {} as Record<typeof functionsKey[number], (req: Request, res: Response) => Promise<Response>>

  functionsKey.forEach(key => {
    const fn = model[key]
    if (!!fn) {
      const thisModel = fn as (...arg: any) => Promise<BaseItem<T>[] | null | undefined> & Promise<CRUDItem<T>>
      thisController[key] = (req: Request, res: Response) => functions[key]!(thisModel, req, res)
    }
  })
  return thisController
}
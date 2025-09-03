import { NextFunction, Request, Response } from "express";

export interface AppError extends Error {
  status?: number
}

export interface Config {
  port: number
  nodeEnv: string
  baseOfRoute: string
  allowedOrigins: string[]
}

export type DataCollection = "todo" | "category" | "color"

export type asyncHandlerFn = (req: Request, res: Response, next: NextFunction) => Promise<any>

export interface ApiResponse<T> {
  status: "success" | "error"
  message: string
  result?: {
    data: T
  }
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface Filters {
  toDate?: Date | null
  fromDate?: Date | null
  order?: "asc" | "desc"
  sort?: "createdAt" | "updatedAt"
}

export type BaseItem<T> = {
  _id: string
  createdAt: string
  updatedAt: string
} & T

export type TodoModel = {
  text: string
  categoryId: string
  status: "pending" | "done"
}

export type CategoryModel = {
  text: string
}

export type ColorModel = {
  text: string
  code: string
}

export type Todo = BaseItem<TodoModel>

export type Category = BaseItem<CategoryModel>

export type Color = BaseItem<ColorModel>

export type CRUDItem<T> = BaseItem<T> | null | undefined

export type CRUDModel<T, K> = {
  getAll: () => Promise<BaseItem<T>[] | undefined | null>
  create?: (payload: K) => Promise<CRUDItem<T>>
  remove?: (id: string) => Promise<CRUDItem<T>>
  getSingle?: (id: string) => Promise<CRUDItem<T>>
  update?: (id: string, payload: K) => Promise<CRUDItem<T>>
}


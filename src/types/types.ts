export interface AppError extends Error {
  status?: number
}

export type BaseItem<T> = {
  _id: string
  createdAt: string
  updatedAt: string
} & T

export interface Config {
  port: number
  nodeEnv: string
  baseOfRoute: string
  allowedOrigins: string[]
}

export type DataCollection = "todo" | "category"

export type Todo = BaseItem<{
  text: string
  categoryId: string
  status: "pending" | "done"
}>

export interface ApiResponse<T> {
  status: "success" | "error"
  message: string
  result?: {
    data: T
  }
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type Category = BaseItem<{
  text: string
}>

export interface Filters {
  toDate?: Date | null
  fromDate?: Date | null
  order?: "asc" | "desc"
  sort?: "createdAt" | "updatedAt"
}

export type ListItem<T> = BaseItem<T>

export type CRUDModel<T> = {
  getAll: () => Promise<BaseItem<T>[]>
  create: (payload: any) => Promise<BaseItem<T>>
  remove: (id: string) => Promise<BaseItem<T> | null>
  getSingle: (id: string) => Promise<BaseItem<T> | null>
  update: (id: string, payload: any) => Promise<BaseItem<T> | null>
}
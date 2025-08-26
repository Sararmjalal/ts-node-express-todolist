export interface AppError extends Error {
  status?: number
}

export interface Config {
  port: number
  nodeEnv: string
  baseOfRoute: string
  allowedOrigins: string[]
}

export type DataCollection = "todo"

export type Todo = {
  _id: string
  text: string
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  status: "success" | "error"
  message: string
  result?: {
    data: T
  }
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

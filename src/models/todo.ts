import path from "path"
import { CRUDItem, Todo, TodoModel } from "../types/types"
import { readdir, readFile, unlink } from "fs/promises"
import { getSingle as getSingleCategory } from "./category"
import { generateFilePath, generateUid, readDB, writeDB } from "../lib/utils"

const todosBasePath = generateFilePath("todo")

export const getAll = async () => {
  const files = await readdir(todosBasePath)
  const todos: Todo[] = []
  for (const file of files) {
    const filePath = path.join(todosBasePath, file)
    const content = await readFile(filePath, "utf-8")
    if (!content) continue
    todos.push(JSON.parse(content))
  }
  return todos
}

export const getSingle = async (_id: string) => {
  const thisPath = path.join(todosBasePath, _id + ".txt")
  try {
    const thisTodo: Todo = await readDB(thisPath)
    return thisTodo
  } catch (err) {
    const e = err as NodeJS.ErrnoException
    if (e.code === "ENOENT") return null
    throw err
  }
}

export const create = async (payload: TodoModel): Promise<CRUDItem<Todo>> => {
  const _id = generateUid("todo")
  const { categoryId, text } = payload
  try {
    const thisCategory = await getSingleCategory(categoryId)
    if (thisCategory) {
      const timestamp = new Date().toISOString()
      const newTodo: Todo = {
        _id,
        text,
        categoryId,
        status: "pending",
        createdAt: timestamp,
        updatedAt: timestamp,
      }
      const thisPath = path.join(todosBasePath, _id + ".txt")
      await writeDB(thisPath, newTodo)
      return newTodo
    }
  } catch (error) {
    const e = error as NodeJS.ErrnoException
    if (e.code === "ENOENT") return null
    throw error
  }
}

export const update = async (_id: string, payload: TodoModel) => {
  const { categoryId, text, status } = payload
  try {
    const thisTodo = await getSingle(_id)
    if (thisTodo) {
      thisTodo.text = text
      if (status) {
        if (status !== "done" && status !== "pending") return null
        thisTodo.status = status
      }
      if (categoryId) {
        const thisCategory = await getSingleCategory(categoryId)
        if (!thisCategory) return null
        thisTodo.categoryId = categoryId
      }
      thisTodo.updatedAt = new Date().toISOString()
      const thisPath = path.join(todosBasePath, _id + ".txt")
      await writeDB(thisPath, thisTodo)
      return thisTodo
    }
  } catch (err) {
    const e = err as NodeJS.ErrnoException
    if (e.code === "ENOENT") return null
    throw err
  }
}

export const remove = async (_id: string) => {
  try {
    const thisPath = path.join(todosBasePath, _id + ".txt")
    const thisTodo: Todo = await readDB(thisPath)
    await unlink(thisPath)
    return thisTodo
  } catch (err) {
    const e = err as NodeJS.ErrnoException
    if (e.code === "ENOENT") return null
    throw err
  }
}

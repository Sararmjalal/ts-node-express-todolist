import path from "path"
import { Todo } from "../types/types"
import { readdir, readFile, unlink } from "fs/promises"
import { generateFilePath, generateUid, readDB, writeDB } from "../lib/utils"

const todosBasePath = generateFilePath("todo")

export const getAllTodos = async () => {
  const files = await readdir(todosBasePath)
  const todos: Todo[] = []
  for (const file of files) {
    const filePath = path.join(todosBasePath, file)
    const content = await readFile(filePath, "utf-8")
    todos.push(JSON.parse(content))
  }
  return todos
}

export const getSingleTodo = async (_id: string) => {
  const thisPath = path.join(todosBasePath, _id + ".txt")
  const thisTodo: Todo = await readDB(thisPath)
  return thisTodo
}

export const createTodo = async (text: string): Promise<Todo> => {
  const _id = generateUid("todo")
  const timestamp = new Date().toISOString()
  const newTodo: Todo = {
    _id,
    text,
    createdAt: timestamp,
    updatedAt: timestamp,
  }
  const thisPath = path.join(todosBasePath, _id + ".txt")
  await writeDB(thisPath, newTodo)
  return newTodo
}

export const updateTodo = async (_id: string, text: string) => {
  const thisTodo = await getSingleTodo(_id)
  thisTodo.text = text
  thisTodo.updatedAt = new Date().toISOString()
  const thisPath = path.join(todosBasePath, _id + ".txt")
  await writeDB(thisPath, thisTodo)
  return thisTodo
}

export const deleteTodo = async (_id: string) => {
  const thisPath = path.join(todosBasePath, _id + ".txt")
  const thisTodo: Todo = await readDB(thisPath)
  await unlink(thisPath)
  return thisTodo
}

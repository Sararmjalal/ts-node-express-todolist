import path from "path"
import { Category } from "../types/types"
import { readdir, readFile, unlink } from "fs/promises"
import { generateFilePath, generateUid, readDB, writeDB } from "../lib/utils"

const categoriesBasePath = generateFilePath("category")

export const getAllCategories = async () => {
  const files = await readdir(categoriesBasePath)
  const categories: Category[] = []
  for (const file of files) {
    const filePath = path.join(categoriesBasePath, file)
    const content = await readFile(filePath, "utf-8")
    if (!content) continue
    categories.push(JSON.parse(content))
  }
  return categories
}

export const getSingleCategory = async (_id: string) => {
  const thisPath = path.join(categoriesBasePath, _id + ".txt")
  try {
    const thisCategory: Category = await readDB(thisPath)
    return thisCategory
  } catch (err) {
    const e = err as NodeJS.ErrnoException
    if (e.code === "ENOENT") return null
    throw err
  }
}

export const createCategory = async (text: string): Promise<Category> => {
  const _id = generateUid("category")
  const timestamp = new Date().toISOString()
  const newCategory: Category = {
    _id,
    text,
    createdAt: timestamp,
    updatedAt: timestamp,
  }
  const thisPath = path.join(categoriesBasePath, _id + ".txt")
  await writeDB(thisPath, newCategory)
  return newCategory
}

export const updateCategory = async (_id: string, text: string) => {
  try {
    const thisCategory = await getSingleCategory(_id)
    if (thisCategory) {
      thisCategory.text = text
      thisCategory.updatedAt = new Date().toISOString()
      const thisPath = path.join(categoriesBasePath, _id + ".txt")
      await writeDB(thisPath, thisCategory)
      return thisCategory
    }
  } catch (err) {
    const e = err as NodeJS.ErrnoException
    if (e.code === "ENOENT") return null
    throw err
  }
}

export const deleteCategory = async (_id: string) => {
  try {
    const thisPath = path.join(categoriesBasePath, _id + ".txt")
    const thisCategory: Category = await readDB(thisPath)
    await unlink(thisPath)
    return thisCategory
  } catch (err) {
    const e = err as NodeJS.ErrnoException
    if (e.code === "ENOENT") return null
    throw err
  }
}

import path from "path"
import { Color } from "../types/types"
import { readdir, readFile } from "fs/promises"
import { generateFilePath, readDB } from "../lib/utils"

const colorsBasePath = generateFilePath("color")

export const getAll = async () => {
  const files = await readdir(colorsBasePath)
  const colors: Color[] = []
  for (const file of files) {
    const filePath = path.join(colorsBasePath, file)
    const content = await readFile(filePath, "utf-8")
    if (!content) continue
    colors.push(JSON.parse(content))
  }
  return colors
}

export const getSingle = async (_id: string) => {
  const thisPath = path.join(colorsBasePath, _id + ".txt")
  try {
    const thisColor: Color = await readDB(thisPath)
    return thisColor
  } catch (err) {
    const e = err as NodeJS.ErrnoException
    if (e.code === "ENOENT") return null
    throw err
  }
}
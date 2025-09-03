import path from "path"
import { Color } from "../types/types"
import { readdir, readFile } from "fs/promises"
import { generateFilePath } from "../lib/utils"

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
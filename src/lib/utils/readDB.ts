import { readFile } from "node:fs/promises";

export const readDB = async (path: string) => {
  const data = await readFile(path, 'utf-8');
  return JSON.parse(data);
};
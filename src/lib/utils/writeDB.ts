import { writeFile } from "fs/promises";

export const writeDB = async (path: string, data: object) => {
  await writeFile(path, JSON.stringify(data, null, 2), 'utf-8');
};
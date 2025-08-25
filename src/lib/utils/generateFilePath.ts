import path from "path";
import { DataCollection } from "../../types/types";

export const generateFilePath = (collection: DataCollection) => {
  return path.join(process.cwd(), `src/lib/db/${collection}`);
}
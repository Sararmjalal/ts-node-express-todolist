export interface AppError extends Error {
  status?: number;
}

export interface Config {
  port: number;
  nodeEnv: string;
  allowedOrigins: string[];
}

export type DataCollection = "todo"
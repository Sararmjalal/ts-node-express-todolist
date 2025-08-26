import dotenv from 'dotenv';
import { Config } from '../types/types';

dotenv.config();

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  baseOfRoute: process.env.BASE_OF_ROUTE || "/api",
  allowedOrigins: (process.env.ALLOWED_ORIGINS || "").split(",")
};

export default config;
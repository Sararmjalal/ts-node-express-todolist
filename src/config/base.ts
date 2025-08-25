import dotenv from 'dotenv';
import { Config } from '../types/types';

dotenv.config();

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  allowedOrigins: (process.env.ALLOWED_ORIGINS || "").split(",")
};

export default config;
import { CorsOptions } from "cors"
import config from "./base"

export const options: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || config.allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
}
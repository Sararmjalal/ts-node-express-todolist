import cors from 'cors';
import path from "path";
import express from 'express';
import router from './routes';
import config from './config/base';
import { options } from './config/cors';
import { errorHandler } from './middlewares/error';

const app = express();

app.use(cors(options));

app.use(express.json());

app.use('/', express.static(path.join(__dirname, 'public')));

app.use(config.baseOfRoute, router)

app.use(errorHandler);

export default app;
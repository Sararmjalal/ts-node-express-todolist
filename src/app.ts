import cors from 'cors';
import path from "path";
import express from 'express';
import { options } from './config/cors';
import { errorHandler } from './middlewares/error';

const app = express();

app.use(cors(options));

app.use(express.json());

app.use(errorHandler);

app.use('/', express.static(path.join(__dirname, 'public')));

export default app;
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { router } from './routes';
import dbConnect from './config/db';

// initialize configuration
dotenv.config();

dbConnect();

// initialize app
const app = express();

app.use(express.static('../front/build'));

// app config
app.set('port', process.env.SERVER_PORT ?? '3011');

// app middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// define a route handler for the default home page
app.get('/', (req: Request, res: Response) => {
  res.send('Backend is working!');
});

app.use('/api', router);

export default app;

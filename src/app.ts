import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlwares/globalErrorHandler';
import notFound from './app/middlwares/notFound';
import cookieParser from 'cookie-parser';

const app: Application = express();

// 🔹 Global Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(cors({ origin: ["http://localhost:3000/api/v1"] }))

// 🔹 Application Routes
app.use('/api/v1', router);

// 🔹 Root Route (Health Check)
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'University server is running successfully 🚀',
  });
});

// 🔹 Global Error Handler
app.use(globalErrorHandler);

// 🔹 Not Found Handler (Last Middleware)
app.use(notFound);

export default app;

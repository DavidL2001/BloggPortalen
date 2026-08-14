import dns from 'dns';
import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { connectDB } from './config/db';
import { errorHandler } from './middleware/errorMiddleware';
import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';
import categoryRoutes from './routes/categoryRoutes';
import likeRoutes from './routes/likeRoutes';
import './models/User';
import commentRoutes from './routes/commentRoute';

/*
  Katrina: Löser DNS-problem vid anslutning till MongoDB Atlas.
  Sätt USE_GOOGLE_DNS=true i .env om ni får samma problem, annars behövs inget.
*/
if (process.env.USE_GOOGLE_DNS === 'true') {
  dns.setServers(['8.8.8.8']);
  console.log('Using Google DNS for MongoDB');
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  '/uploads',
  express.static(path.join(process.cwd(), 'src/uploads'))
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use("/api/posts", likeRoutes);
app.use('/api/posts', commentRoutes);
app.use('/api/categories', categoryRoutes);


app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// 404-hantering
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Endpoint hittades inte' });
});

// Global felhantering
app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Servern kör på port ${PORT}`);
  });
};

startServer();

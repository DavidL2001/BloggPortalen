import dns from 'dns';
import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';

/*Jag(Katrina) hade problem med att ansluta till MongoDB Atlas på grund av DNS-problem, så jag lade till en funktion för att använda Google DNS om det behövs.
Om ni får likadana problem så lägg till true i USE_GOOGLE_DNS i er .env-fil. Annars behöver ni inte göra något*/


if (process.env.USE_GOOGLE_DNS === 'true') {
  dns.setServers(['8.8.8.8']);
  console.log('Using Google DNS for MongoDB');
}

connectDB();

const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});


app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Endpoint hittades inte' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Serverfel', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servern kör på port ${PORT}`));

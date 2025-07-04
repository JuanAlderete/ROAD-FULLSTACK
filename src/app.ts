import express from 'express';
import cors from 'cors';
import userRoutes = require('./routes/user.routes');
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Ping para probar Prisma
app.get('/ping', async (_req, res) => {
  await prisma.$connect();
  res.send('Pong! Prisma conectado ✅');
});

export default app;

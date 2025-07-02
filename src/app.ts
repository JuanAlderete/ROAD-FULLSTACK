import express from 'express';
import cors from 'cors';
const userRoutes = require('./routes/user.routes');
const { errorHandler } = require('./middlewares/errorHandler');
const app = express();

app.use(cors());
app.use(express.json());

app.use(errorHandler);

// Aquí usarás tus rutas
app.use('/api/users', userRoutes);

export default app;
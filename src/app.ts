import express from 'express';
import cors from 'cors';
const userRoutes = require('./routes/user.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Aquí usarás tus rutas
app.use('/api/users', userRoutes);

export default app;
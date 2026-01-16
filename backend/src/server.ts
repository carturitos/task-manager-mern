import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ message: '¡Servidor funcionando correctamente!' });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

export default app;

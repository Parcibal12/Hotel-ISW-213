import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import pool from './config/supabase.js';
import servicioRoutes from './routes/servicioRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/servicios', servicioRoutes);

app.get('/', (req, res) => {
    res.json({ mensaje: 'Hotel API' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
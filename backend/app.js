import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import pool from './config/supabase.js';
import servicioRoutes from './routes/servicioRoutes.js';
import huespedRoutes from './routes/huespuedRoutes.js';
import reservaRoutes from './routes/reservarRoutes.js';
import habitacionRoutes from './routes/habitacionRoutes.js';
import checkinRoutes from './routes/checkinRoutes.js';
import servicioHotelRoutes from './routes/servicioHotelRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/servicios', servicioRoutes);
app.use('/api/huespedes', huespedRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/habitaciones', habitacionRoutes);
app.use('/api/checkin', checkinRoutes);
app.use('/api/servicios-hotel', servicioHotelRoutes);

app.get('/', (req, res) => {
    res.json({ mensaje: 'Hotel API' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
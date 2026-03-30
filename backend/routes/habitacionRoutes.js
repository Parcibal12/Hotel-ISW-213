import express from 'express';
import { getHabitaciones, getTiposHabitacion } from '../controllers/habitacionController.js';

const router = express.Router();

router.get('/tipos', getTiposHabitacion);
router.get('/', getHabitaciones);

export default router;
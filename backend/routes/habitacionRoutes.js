import express from 'express';
import { getHabitaciones } from '../controllers/habitacionController.js';

const router = express.Router();

router.get('/', getHabitaciones);

export default router;
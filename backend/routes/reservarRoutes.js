import express from 'express';
import { createReserva, getReservas } from '../controllers/reservaController.js';

const router = express.Router();

router.post('/', createReserva);
router.get('/', getReservas);

export default router;
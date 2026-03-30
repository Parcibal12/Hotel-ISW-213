import express from 'express';
import { createReserva, getReservas, actualizarEstadoReserva } from '../controllers/reservaController.js';

const router = express.Router();

router.post('/', createReserva);
router.get('/', getReservas);
router.patch('/:id/estado', actualizarEstadoReserva);

export default router;
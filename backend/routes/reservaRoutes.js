import express from 'express';
import { crearReserva, obtenerReservas, actualizarEstadoReserva } from '../controllers/reservaController.js';

const router = express.Router();

router.post('/', crearReserva);
router.get('/', obtenerReservas);
router.patch('/:id/estado', actualizarEstadoReserva);

export default router;
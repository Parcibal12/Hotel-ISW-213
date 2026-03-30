import express from 'express';
import { createServicio, getServicios } from '../controllers/servicioHotelController.js';

const router = express.Router();
router.post('/', createServicio);
router.get('/', getServicios);

export default router;
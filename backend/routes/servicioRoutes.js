import express from 'express';
import { getServicios } from '../controllers/servicioController.js';

const router = express.Router();

router.get('/', getServicios);

export default router;
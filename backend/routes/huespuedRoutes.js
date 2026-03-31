import express from 'express';
import { createHuesped, getHuesped, getHuespedes, getHuespedById } from '../controllers/huespedController.js';

const router = express.Router();

router.post('/', createHuesped);
router.get('/', getHuespedes);

router.get('/detalle/:id', getHuespedById);

router.get('/documento/:documento', getHuesped);

export default router;
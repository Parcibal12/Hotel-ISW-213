import express from 'express';
import { createHuesped, getHuesped, getHuespedes } from '../controllers/huespedController.js';

const router = express.Router();

router.post('/', createHuesped);
router.get('/:documento', getHuesped);
router.get('/', getHuespedes);

export default router;
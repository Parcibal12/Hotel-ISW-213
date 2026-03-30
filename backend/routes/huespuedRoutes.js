import express from 'express';
import { createHuesped, getHuesped } from '../controllers/huespedController.js';

const router = express.Router();

router.post('/', createHuesped);
router.get('/:documento', getHuesped);

export default router;
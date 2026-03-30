import express from 'express';
import { createHuesped } from '../controllers/huespedController.js';

const router = express.Router();

router.post('/', createHuesped);

export default router;
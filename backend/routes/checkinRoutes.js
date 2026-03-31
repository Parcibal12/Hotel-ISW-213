import express from 'express';
import { realizarCheckin } from '../controllers/checkinController.js';

const router = express.Router();

router.post('/', realizarCheckin);

export default router;
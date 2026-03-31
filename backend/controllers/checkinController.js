import { procesarCheckin } from '../services/checkinService.js';

export const realizarCheckin = async (req, res) => {
    try {
        const { reserva_id } = req.body;
        const resultado = await procesarCheckin(reserva_id);
        res.status(201).json({ mensaje: 'Check-in exitoso', checkin: resultado });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
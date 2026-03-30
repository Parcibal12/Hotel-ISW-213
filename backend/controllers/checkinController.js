import { registrarCheckin } from '../services/checkinService.js';

export const createCheckin = async (req, res) => {
    try {
        const nuevoCheckin = await registrarCheckin(req.body);
        res.status(201).json({ mensaje: 'Check-in realizado con éxito', checkin: nuevoCheckin });
    } catch (error) {
        if (error.message === 'Faltan datos para el check-in') {
            return res.status(400).json({ error: 'Faltan datos obligatorios (ID reserva, nombre o documento)' });
        }
        console.error('Error al registrar check-in:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
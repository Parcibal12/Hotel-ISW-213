import { registrarServicio, listarServicios } from '../services/servicioHotelService.js';

export const createServicio = async (req, res) => {
    try {
        const nuevoServicio = await registrarServicio(req.body);
        res.status(201).json(nuevoServicio);
    } catch (error) {
        if (error.message === 'Faltan datos del servicio') return res.status(400).json({ error: 'Faltan datos del servicio' });
        res.status(500).json({ error: 'Error interno' });
    }
};

export const getServicios = async (req, res) => {
    try {
        const servicios = await listarServicios();
        res.status(200).json(servicios);
    } catch (error) {
        res.status(500).json({ error: 'Error interno' });
    }
};
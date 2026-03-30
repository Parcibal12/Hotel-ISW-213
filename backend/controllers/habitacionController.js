import { listarHabitaciones, listarTiposHabitacion } from '../services/habitacionService.js';

export const getTiposHabitacion = async (req, res) => {
    try {
        const tipos = await listarTiposHabitacion();
        res.status(200).json(tipos);
    } catch (error) {
        res.status(404).json({ mensaje: error.message });
    }
};

export const getHabitaciones = async (req, res) => {
    try {
        const tipoId = req.query.tipo_id;
        const habitaciones = await listarHabitaciones(tipoId);
        res.status(200).json(habitaciones);
    } catch (error) {
        console.error('Error al obtener habitaciones:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
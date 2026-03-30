import { listarHabitaciones } from '../services/habitacionService.js';

export const getHabitaciones = async (req, res) => {
    try {
        const habitaciones = await listarHabitaciones();
        res.status(200).json(habitaciones);
    } catch (error) {
        if (error.message === 'No hay habitaciones') {
            return res.status(404).json({ mensaje: 'No hay habitaciones registradas en el sistema' });
        }
        console.error('Error al obtener habitaciones:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
import { obtenerTodasLasHabitaciones } from '../repositories/habitacionRepository.js';

export const listarHabitaciones = async () => {
    const habitaciones = await obtenerTodasLasHabitaciones();
    if (!habitaciones || habitaciones.length === 0) {
        throw new Error('No hay habitaciones');
    }
    return habitaciones;
};
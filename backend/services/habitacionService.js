import { obtenerTodasLasHabitaciones, obtenerTiposHabitacion } from '../repositories/habitacionRepository.js';

export const listarTiposHabitacion = async () => {
    const tipos = await obtenerTiposHabitacion();
    if (!tipos || tipos.length === 0) {
        throw new Error('No hay tipos de habitación registrados');
    }
    return tipos;
};


export const listarHabitaciones = async (tipoId) => {
    const habitaciones = await obtenerTodasLasHabitaciones(tipoId);

    return habitaciones;
};
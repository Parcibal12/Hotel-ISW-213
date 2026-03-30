import { crearCheckin } from '../repositories/checkinRepository.js';

export const registrarCheckin = async (datosCheckin) => {
    const { reserva_id, nombre_completo, documento_identidad } = datosCheckin;

    if (!reserva_id || !nombre_completo || !documento_identidad) {
        throw new Error('Faltan datos para el check-in');
    }

    return await crearCheckin(datosCheckin);
};
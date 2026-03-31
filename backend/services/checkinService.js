import { obtenerDatosReservaParaCheckin, registrarCheckinBD, marcarReservaEnCurso } from '../repositories/checkinRepository.js';

export const procesarCheckin = async (reservaId) => {
    if (!reservaId) throw new Error('ID de reserva no proporcionado');

    const reserva = await obtenerDatosReservaParaCheckin(reservaId);
    if (!reserva) throw new Error('La reserva no existe');

    if (reserva.estado === 'Cancelada' || reserva.estado === 'Finalizada') {
        throw new Error(`Operación denegada: La reserva está ${reserva.estado}`);
    }
    if (reserva.estado === 'EnCurso') {
        throw new Error('Doble Check-In denegado: El huésped ya está en el hotel');
    }

    const nuevoCheckin = await registrarCheckinBD(reserva.reserva_id, reserva.nombre_completo, reserva.documento_identidad);
    await marcarReservaEnCurso(reserva.reserva_id);

    return nuevoCheckin;
};
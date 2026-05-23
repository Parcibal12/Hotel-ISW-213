import { obtenerDatosReservaParaCheckin, registrarCheckinBD, marcarReservaEnCurso } from '../repositories/checkinRepository.js';

export const validarEstadoReserva = (reserva) => {
    if (reserva.estado === 'Cancelada' || reserva.estado === 'Finalizada') {
        throw new Error(`Operación denegada: La reserva está ${reserva.estado}`);
    }
    if (reserva.estado === 'EnCurso') {
        throw new Error('Doble Check in denegado: El huésped ya está en el hotel');
    }
};

export const procesarCheckin = async (reservaId) => {
    if (!reservaId) throw new Error('ID de reserva no proporcionado');
    const reserva = await obtenerDatosReservaParaCheckin(reservaId);
    if (!reserva) throw new Error('La reserva no existe');
    validarEstadoReserva(reserva);
    const nuevoCheckin = await registrarCheckinBD(reserva.reserva_id, reserva.nombre_completo, reserva.documento_identidad);
    await marcarReservaEnCurso(reserva.reserva_id);
    return nuevoCheckin;
};
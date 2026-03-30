import { crearReserva, obtenerTodasLasReservas, actualizarEstadoReserva, verificarDisponibilidad, obtenerCapacidadHabitacion } from "../repositories/reservaRepository.js";

export const registrarReserva = async (datosReserva) => {
    const { huesped_id, habitacion_id, fecha_ingreso, fecha_salida, cantidad_personas } = datosReserva;

    if (!huesped_id || !habitacion_id || !fecha_ingreso || !fecha_salida) {
        throw new Error('Todos los campos son obligatorios');
    }

    const ingreso = new Date(fecha_ingreso);
    const salida = new Date(fecha_salida);
    if (salida <= ingreso) {
        throw new Error('Fechas inválidas');
    }

    const capacidadMaxima = await obtenerCapacidadHabitacion(habitacion_id);
    if (!capacidadMaxima) {
        throw new Error('Habitación no existe');
    }
    const personas = cantidad_personas || 1;
    if (personas > capacidadMaxima) {
        throw new Error('Capacidad excedida');
    }

    const estaOcupada = await verificarDisponibilidad(habitacion_id, fecha_ingreso, fecha_salida);
    if (estaOcupada) {
        throw new Error('Habitación ocupada en esas fechas');
    }

    return await crearReserva(datosReserva);
};

export const listarReservas = async () => {
    const reservas = await obtenerTodasLasReservas();
    if (!reservas || reservas.length === 0) {
        throw new Error('No hay reservas');
    }

    return reservas;
};


export const cambiarEstadoReserva = async (id, nuevoEstado) => {
    const estadosPermitidos = ['Pendiente', 'Confirmada', 'Cancelada', 'EnCurso', 'Finalizada'];

    if (!estadosPermitidos.includes(nuevoEstado)) {
        throw new Error('Estado inválido');
    }

    const reservaActualizada = await actualizarEstadoReserva(id, nuevoEstado);

    if (!reservaActualizada) {
        throw new Error('Reserva no encontrada');
    }

    return reservaActualizada;
};

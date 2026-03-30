import { crearReserva, obtenerTodasLasReservas } from "../repositories/reservaRepository.js";

export const registrarReserva = async (datosReserva) => {
    const { huesped_id, habitacion_id, fecha_ingreso, fecha_salida } = datosReserva;

    if (!huesped_id || !habitacion_id || !fecha_ingreso || !fecha_salida) {
        throw new Error("Todos los campos son obligatorios");
    }


    const ingreso = new Date(fecha_ingreso);
    const salida = new Date(fecha_salida);


    if (salida <= ingreso) {
        throw new Error("Fechas inválidas");
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


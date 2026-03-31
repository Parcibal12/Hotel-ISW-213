import { buscarPorDocumento, crearHuesped, obtenerHuespedes, obtenerHuespedPorId } from "../repositories/huespedRepository.js";

export const registrarHuesped = async (datosHuesped) => {
    const { documento_identidad, nombre_completo, telefono, correo, tipo_documento_id } = datosHuesped;

    if (!documento_identidad || !nombre_completo || !telefono || !correo || !tipo_documento_id) {
        throw new Error('Faltan datos');
    }

    const huespedExistente = await buscarPorDocumento(documento_identidad);
    if (huespedExistente) {
        throw new Error('Documento duplicado');
    }

    const nuevoHuesped = await crearHuesped(datosHuesped);
    return nuevoHuesped;
};

export const obtenerHuespedPorDocumento = async (documento_identidad) => {
    if (!documento_identidad) {
        throw new Error('Falta documento');
    }

    const huesped = await buscarPorDocumento(documento_identidad);
    if (!huesped) {
        throw new Error('Huesped no encontrado');
    }

    return huesped;
};

export const listarHuespedes = async () => {
    return await obtenerHuespedes();
};

export const consultarHuesped = async (id) => {
    const huesped = await obtenerHuespedPorId(id);
    if (!huesped) {
        throw new Error('El huespued no existe en la base de datos');
    }
    return huesped;
}
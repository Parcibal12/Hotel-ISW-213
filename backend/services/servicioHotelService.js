import { crearServicio, obtenerServicios } from '../repositories/servicioHotelRepository.js';

export const registrarServicio = async (datosServicio) => {
    const { nombre_servicio, encargado, telefono } = datosServicio;
    if (!nombre_servicio || !encargado || !telefono) {
        throw new Error('Faltan datos del servicio');
    }
    return await crearServicio(datosServicio);
};

export const listarServicios = async () => {
    return await obtenerServicios();
};
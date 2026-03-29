import { obtenerTodosLosServicios } from '../repositories/servicioRepository.js';

export const listarServicios = async () => {
    const servicios = await obtenerTodosLosServicios();

    if (!servicios || servicios.length === 0) {
        throw new Error('No se encontraron servicios');
    }

    return servicios;
};
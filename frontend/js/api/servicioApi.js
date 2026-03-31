import { BASE_URL } from '../config.js';

export const getServicios = async () => {
    try {
        const respuesta = await fetch(`${BASE_URL}/servicios`);
        if (!respuesta.ok) return [];
        return await respuesta.json();
    } catch (error) {
        console.error("Error al obtener servicios:", error);
        return [];
    }
};
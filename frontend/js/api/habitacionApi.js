import { BASE_URL } from "../config.js";

export const getTiposHabitacion = async () => {
    try {
        const respuesta = await fetch(`${BASE_URL}/habitaciones/tipos`);

        if (!respuesta.ok) return [];
        return await respuesta.json();
    } catch (error) {
        console.error("Error al obtener tipo de habitación:", error);
        return [];
    }
};

export const getHabitacionesPorTipo = async (tipoId) => {
    try {
        const respuesta = await fetch(`${BASE_URL}/habitaciones?tipo_id=${tipoId}`);
        if (!respuesta.ok) return [];
        return await respuesta.json();
    } catch (error) {
        console.error("Error al obtener habitaciones:", error);
        return [];
    }
};
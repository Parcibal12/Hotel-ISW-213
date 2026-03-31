import { BASE_URL } from "../config.js";

export const getHuespedes = async () => {
    try {
        const respuesta = await fetch(`${BASE_URL}/huespedes`);
        if (!respuesta.ok) throw new Error('Error de red');
        return await respuesta.json();

    } catch (error) {
        console.error('Error al obtener huéspedes:', error);
        return [];
    }
};


export const crearHuesped = async (datos) => {
    const respuesta = await fetch(`${BASE_URL}/huespedes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });

    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error || 'Error al guardar');
    return data;
};

export const getHuespedById = async (id) => {
    try {
        const respuesta = await fetch(`${BASE_URL}/huespedes/detalle/${id}`);
        const data = await respuesta.json();

        if (!respuesta.ok) throw new Error(data.error || 'Error al obtener el huesped');
        return data;
    } catch (error) {
        throw error;
    }
};
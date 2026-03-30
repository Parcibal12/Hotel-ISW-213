import { BASE_URL } from "../config.js";

export const crearReserva = async (datos) => {
    const respuesta = await fetch(`${BASE_URL}/reservas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    });

    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error || 'Error al procesar la reserva');
    return data;
};

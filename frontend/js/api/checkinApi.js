import { BASE_URL } from '../config.js';

export const crearCheckin = async (reservaId) => {
    const respuesta = await fetch(`${BASE_URL}/checkin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reserva_id: reservaId })
    });
    const data = await respuesta.json();
    if (!respuesta.ok) throw new Error(data.error || 'Error al procesar el check-in');
    return data;
};
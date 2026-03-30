import pool from '../config/supabase.js';

export const obtenerTodasLasHabitaciones = async () => {
    const query = `
        SELECT h.id, h.numero_habitacion, h.piso, th.nombre_tipo, th.precio_referencial 
        FROM public.habitacion h
        JOIN public.tipo_habitacion th ON h.tipo_habitacion_id = th.id
        ORDER BY h.numero_habitacion ASC;
    `;
    const resultado = await pool.query(query);
    return resultado.rows || [];
};
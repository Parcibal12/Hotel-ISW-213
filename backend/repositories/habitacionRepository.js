import pool from '../config/supabase.js';

export const obtenerTiposHabitacion = async () => {
    const query = `
        SELECT id, nombre_tipo AS nombre, capacidad, precio_referencial AS precio_base, descripcion 
        FROM public.tipo_habitacion 
        ORDER BY id ASC;
    `;

    const resultado = await pool.query(query);
    return resultado.rows || [];
};


export const obtenerTodasLasHabitaciones = async (tipoId) => {
    let query = `
        SELECT h.id, h.numero_habitacion AS numero, h.piso, th.nombre_tipo, th.precio_referencial 
        FROM public.habitacion h
        JOIN public.tipo_habitacion th ON h.tipo_habitacion_id = th.id
    `;

    const params = [];

    if (tipoId) {
        query += ` WHERE h.tipo_habitacion_id = $1`;
        params.push(tipoId);
    }

    query += ` ORDER BY h.numero_habitacion ASC;`;

    const resultado = await pool.query(query, params);
    return resultado.rows || [];
};
import pool from '../config/supabase.js';

export const crearCheckin = async (datosCheckin) => {
    const query = `
        INSERT INTO public.checkin (reserva_id, nombre_completo, documento_identidad)
        VALUES ($1, $2, $3) RETURNING *;
    `;
    const valores = [
        datosCheckin.reserva_id,
        datosCheckin.nombre_completo,
        datosCheckin.documento_identidad
    ];

    const resultado = await pool.query(query, valores);

    if (resultado && resultado.rows && resultado.rows.length > 0) {
        return resultado.rows[0];
    }
    return datosCheckin;
};
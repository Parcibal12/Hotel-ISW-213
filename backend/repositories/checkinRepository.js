import pool from '../config/supabase.js';

export const obtenerDatosReservaParaCheckin = async (reservaId) => {
    const query = `
        SELECT r.id as reserva_id, r.estado, h.nombre_completo, h.documento_identidad
        FROM public.reserva r
        JOIN public.huesped h ON r.huesped_id = h.id
        WHERE r.id = $1;
    `;
    const { rows } = await pool.query(query, [reservaId]);
    return rows.length > 0 ? rows[0] : null;
};

export const registrarCheckinBD = async (reservaId, nombre, documento) => {
    const query = `
        INSERT INTO public.checkin (reserva_id, nombre_completo, documento_identidad)
        VALUES ($1, $2, $3) RETURNING *;
    `;
    const { rows } = await pool.query(query, [reservaId, nombre, documento]);
    return rows[0];
};

export const marcarReservaEnCurso = async (reservaId) => {
    const query = `
        UPDATE public.reserva 
        SET estado = 'EnCurso', fecha_hora_checkin = CURRENT_TIMESTAMP 
        WHERE id = $1 RETURNING *;
    `;
    const { rows } = await pool.query(query, [reservaId]);
    return rows[0];
};
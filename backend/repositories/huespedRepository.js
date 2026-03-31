import pool from "../config/supabase.js";
import HuespedModel from "../models/huespedModel.js";

export const buscarPorDocumento = async (documento_identidad) => {
    const query = `SELECT * FROM public.huesped WHERE documento_identidad = $1`;
    const { rows } = await pool.query(query, [documento_identidad]);
    return rows.length > 0 ? rows[0] : null;
};

export const crearHuesped = async (nuevoHuesped) => {
    const query = `
        INSERT INTO public.huesped (documento_identidad, nombre_completo, telefono, correo, tipo_documento_id)
        VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;

    const valores = [
        nuevoHuesped.documento_identidad,
        nuevoHuesped.nombre_completo,
        nuevoHuesped.telefono,
        nuevoHuesped.correo,
        nuevoHuesped.tipo_documento_id
    ];

    const resultado = await pool.query(query, valores);

    if (resultado && resultado.rows && resultado.rows.length > 0) {
        return resultado.rows[0];
    }

    return nuevoHuesped;
};

export const obtenerHuespedes = async () => {
    const query = `SELECT * FROM public.huesped ORDER BY id DESC;`;
    const resultado = await pool.query(query);
    return resultado.rows || [];
};

export const obtenerHuespedPorId = async (id) => {
    const query = `
        SELECT h.id, h.nombre_completo, h.documento_identidad, h.telefono, h.correo, td.nombre as tipo_documento
        FROM public.huesped h
        JOIN public.tipo_documento td ON h.tipo_documento_id = td.id
        WHERE h.id = $1;
    `;

    const resultado = await pool.query(query, [id]);
    return resultado.rows.length > 0 ? resultado.rows[0] : null;
}

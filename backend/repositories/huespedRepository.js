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

    const { rows } = await pool.query(query, valores);

    return new HuespedModel(
        rows[0].documento_identidad,
        rows[0].nombre_completo,
        rows[0].telefono,
        rows[0].correo,
        rows[0].tipo_documento_id
    );
}

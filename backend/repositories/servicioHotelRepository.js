import pool from '../config/supabase.js';

export const crearServicio = async (datosServicio) => {
    const query = `
        INSERT INTO public.servicio_hotel (nombre_servicio, encargado, telefono)
        VALUES ($1, $2, $3) RETURNING *;
    `;
    const valores = [datosServicio.nombre_servicio, datosServicio.encargado, datosServicio.telefono];
    const resultado = await pool.query(query, valores);

    if (resultado && resultado.rows && resultado.rows.length > 0) return resultado.rows[0];
    return datosServicio;
};

export const obtenerServicios = async () => {
    const query = 'SELECT * FROM public.servicio_hotel ORDER BY nombre_servicio ASC';
    const resultado = await pool.query(query);
    return resultado.rows || [];
};
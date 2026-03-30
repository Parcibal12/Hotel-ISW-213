import pool from "../config/supabase.js";
import reservaModel from "../models/reservaModel.js";

export const crearReserva = async (nuevaReserva) => {
    const query = `
        INSERT INTO public.reserva (huesped_id, habitacion_id, fecha_ingreso, fecha_salida, cantidad_personas, estado)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `;

    const valores = [
        nuevaReserva.huesped_id,
        nuevaReserva.habitacion_id,
        nuevaReserva.fecha_ingreso,
        nuevaReserva.fecha_salida,
        nuevaReserva.cantidad_personas || 1,
        nuevaReserva.estado || 'Pendiente'
    ];

    const resultado = await pool.query(query, valores);


    if (resultado && resultado.rows && resultado.rows.lenght > 0) {
        return resultado.rows[0];
    }
    return nuevaReserva;


};


export const obtenerTodasLasReservas = async () => {
    const query = 'SELECT * FROM public.reserva ORDER BY id DESC';

    const resultado = await pool.query(query);
    return resultado.rows;
};



export const actualizarEstadoReserva = async (id, nuevoEstado) => {
    const query = `
        UPDATE public.reserva 
        SET estado = $1 
        WHERE id = $2 
        RETURNING *;
    `;
    const resultado = await pool.query(query, [nuevoEstado, id]);

    if (resultado && resultado.rows && resultado.rows.length > 0) {
        return resultado.rows[0];
    }
    return null;
};

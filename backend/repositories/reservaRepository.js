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


    if (resultado && resultado.rows && resultado.rows.length > 0) {
        return resultado.rows[0];
    }
    return nuevaReserva;


};


export const obtenerTodasLasReservas = async () => {
    const query = `
        SELECT r.id, h.nombre_completo AS huesped, hab.numero_habitacion AS habitacion, 
               r.fecha_ingreso, r.fecha_salida, r.estado, r.cantidad_personas
        FROM public.reserva r
        JOIN public.huesped h ON r.huesped_id = h.id
        JOIN public.habitacion hab ON r.habitacion_id = hab.id
        ORDER BY r.fecha_ingreso ASC;
    `;

    const resultado = await pool.query(query);
    return resultado.rows || [];
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




export const verificarDisponibilidad = async (habitacion_id, fecha_ingreso, fecha_salida) => {
    const query = `
        SELECT id FROM public.reserva 
        WHERE habitacion_id = $1 
        AND estado NOT IN ('Cancelada', 'Finalizada')
        AND (fecha_ingreso < $3 AND fecha_salida > $2);
    `;
    const resultado = await pool.query(query, [habitacion_id, fecha_ingreso, fecha_salida]);
    return resultado.rows.length > 0;
};

export const obtenerCapacidadHabitacion = async (habitacion_id) => {
    const query = `
        SELECT th.capacidad 
        FROM public.habitacion h
        JOIN public.tipo_habitacion th ON h.tipo_habitacion_id = th.id
        WHERE h.id = $1;
    `;
    const resultado = await pool.query(query, [habitacion_id]);
    if (resultado && resultado.rows && resultado.rows.length > 0) {
        return resultado.rows[0].capacidad;
    }
    return null;
};

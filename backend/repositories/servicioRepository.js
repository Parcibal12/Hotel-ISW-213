import pool from '../config/supabase.js';
import Servicio from '../models/servicioModel.js';

export const obtenerTodosLosServicios = async () => {
    const query = 'SELECT nombre_servicio, encargado, telefono FROM public.servicio_hotel ORDER BY id ASC';
    const { rows } = await pool.query(query);

    return rows.map(row => new Servicio(row.nombre_servicio, row.encargado, row.telefono));
};
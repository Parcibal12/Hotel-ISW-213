import { registrarReserva, listarReservas, cambiarEstadoReserva } from "../services/reservaServices.js";


const MENSAJE_ERROR_500 = 'Error interno del servidor';

const MAPA_ERRORES_RESERVA = {
    'Todos los campos son obligatorios': { status: 400, msj: 'Faltan datos obligatorios (huésped, habitación o fechas)' },
    'Fechas inválidas': { status: 400, msj: 'La fecha de salida debe ser posterior a la fecha de ingreso' },
    'Habitación no existe': { status: 404, msj: 'La habitación solicitada no existe en el sistema' },
    'Capacidad excedida': { status: 400, msj: 'La cantidad de personas supera la capacidad máxima de la habitación' },
    'Habitación ocupada en esas fechas': { status: 409, msj: 'La habitación ya se encuentra reservada en las fechas seleccionadas' }
};

export const crearReserva = async (req, res) => {
    try {
        const nuevaReserva = await registrarReserva(req.body);
        res.status(201).json({ mensaje: 'Reserva creada con éxito', reserva: nuevaReserva });
    } catch (error) {
        const errorConocido = MAPA_ERRORES_RESERVA[error.message];
        if (errorConocido) {
            return res.status(errorConocido.status).json({ error: errorConocido.msj });
        }
        console.error('Error al crear reserva: ', error);
        res.status(500).json({ error: MENSAJE_ERROR_500 });
    }
};

export const obtenerReservas = async (req, res) => {
    try {
        const reservas = await listarReservas();
        res.status(200).json(reservas);
    } catch (error) {
        if (error.message === 'No hay reservas') {
            return res.status(404).json({ mensaje: 'No hay reservas en el sistema' });

        }

        res.status(500).json({ error: MENSAJE_ERROR_500 });

    }
};


export const actualizarEstadoReserva = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    try {
        const reserva = await cambiarEstadoReserva(id, estado);
        res.status(200).json({ mensaje: 'Estado actualizado', reserva });
    } catch (error) {
        if (error.message === 'Estado inválido') {
            return res.status(400).json({ error: 'El estado proporcionado no es válido' });
        }
        if (error.message === 'Reserva no encontrada') {
            return res.status(404).json({ error: 'No se encontró la reserva' });
        }
        console.error('Error al actualizar estado:', error);
        res.status(500).json({ error: MENSAJE_ERROR_500 });
    }
};
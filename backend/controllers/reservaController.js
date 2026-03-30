import { registrarReserva, listarReservas } from "../services/reservaServices.js";

export const createReserva = async (req, res) => {
    try {
        const nuevaReserva = await registrarReserva(req.body);
        res.status(201).json({ mensaje: 'Reserva creada con éxito', reserva: nuevaReserva });

    } catch (error) {
        if (error.message === 'Todos los campos son obligatorios') {
            return res.status(400).json({ error: 'Faltan datos obligatorios (huésped, habitación o fechas).' });
        }

        if (error.message === 'Fechas inválidas') {
            return res.status(400).json({ error: 'La fecha de salida debe ser posterior a la fecha de ingreso' });


        }

        console.error('Error al crear reserva: ', error);
        res.status(500).json({ error: 'Error interno del servidor' });

    }
};

export const getReservas = async (req, res) => {
    try {
        const reservas = await listarReservas();
        res.status(200).json(reservas);
    } catch (error) {
        if (error.message == 'No hay reservas') {
            return res.status(404).json({ mensaje: 'No hay reservas en el sistema' });

        }

        res.status(500).json({ error: 'Error interno del servidor' });

    }
}
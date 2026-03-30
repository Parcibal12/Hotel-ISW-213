import { registrarHuesped } from "../services/huespedService.js";

export const createHuesped = async (req, res) => {
    const datosCliente = req.body;

    try {
        const nuevoHuesped = await registrarHuesped(datosCliente);

        res.status(201).json({
            mensaje: 'Huesped registrado con éxito',
            huesped: nuevoHuesped
        })
    } catch (error) {
        if (error.message === "Faltan datos") {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });

        }

        if (error.message === "Documento duplicado") {
            return res.status(409).json({ error: 'Ya existe un huésped registrado con este documento de identidad' });
        }

        console.error('Error al registrar huésped:', error);
        res.status(500).json({ error: 'Error interno del servidor' });

    }
}

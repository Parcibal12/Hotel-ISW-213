import { registrarHuesped, obtenerHuespedPorDocumento, listarHuespedes } from "../services/huespedService.js";

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
};

export const getHuesped = async (req, res) => {
    const { documento } = req.params;

    try {
        const huesped = await obtenerHuespedPorDocumento(documento);
        res.status(200).json(huesped);
    } catch (error) {
        if (error.message === 'Falta documento') {
            return res.status(400).json({ error: 'Debe proporcionar un documento de identidad' });

        }

        if (error.message === 'Huesped no encontrado') {
            return res.status(404).json({ error: 'No se encontró ningún huésped con ese documento' });

        }

        console.error('Error al buscar huésped:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


export const getHuespedes = async (req, res) => {
    try {
        const huespedes = await listarHuespedes();
        res.status(200).json(huespedes);
    } catch (error) {
        console.error('Error al obtener huéspedes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

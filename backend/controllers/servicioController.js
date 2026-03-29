import { listarServicios } from '../services/servicioService.js';

export const getServicios = async (req, res) => {
    try {
        const servicios = await listarServicios();
        res.status(200).json(servicios);
    } catch (error) {
        if (error.message === 'No se encontraron servicios') {
            return res.status(404).json({ mensaje: 'No hay servicios disponibles' });
        }
        console.error('Error en el controlador:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};
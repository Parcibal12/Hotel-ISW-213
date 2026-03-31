import { getServicios } from '../api/servicioApi.js';
import { generarHtmlServicios } from '../views/servicioView.js';

export const cargarControladorServicios = async (contenedor) => {
    const servicios = await getServicios();

    contenedor.innerHTML = generarHtmlServicios(servicios);
};
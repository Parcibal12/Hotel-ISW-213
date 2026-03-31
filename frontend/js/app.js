import { cargarControladorHuespedes } from './controllers/huespedController.js';
import { cargarControladorReservas } from './controllers/reservaController.js';
import { cargarControladorServicios } from './controllers/servicioController.js';

const appDiv = document.getElementById('app');

const routes = {
    '/huespedes': cargarControladorHuespedes,
    '/reservas': cargarControladorReservas,
};

const router = async () => {
    const hash = window.location.hash || '#/huespedes';
    const contenedor = document.getElementById('app');

    contenedor.innerHTML = '';

    switch (hash) {
        case '#/huespedes':
            await cargarControladorHuespedes(contenedor);
            break;
        case '#/habitaciones':
            break;
        case '#/reservas':
            await cargarControladorReservas(contenedor);
            break;
        case '#/servicios':
            await cargarControladorServicios(contenedor);
            break;
        default:
            contenedor.innerHTML = '<h1>Página no encontrada</h1>';
    }
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
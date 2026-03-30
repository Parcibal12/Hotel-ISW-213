import { cargarControladorHuespedes } from './controllers/huespedController.js';
import { cargarControladorReservas } from './controllers/reservaController.js';

const appDiv = document.getElementById('app');

const routes = {
    '/huespedes': cargarControladorHuespedes,
    '/reservas': cargarControladorReservas,
};

const router = async () => {
    const path = window.location.hash.slice(1) || '/huespedes';
    const controlador = routes[path];

    if (controlador) {
        await controlador(appDiv);
    } else {
        appDiv.innerHTML = `<h2>Error 404: Página no encontrada</h2>`;
    }


};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
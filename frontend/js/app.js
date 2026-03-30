import { generarHtmlHuespedes } from './views/huespedView.js';
import { renderReservas } from './views/reservasView.js';
import { cargarControladorHuespedes } from './controllers/huespedController.js';

const appDiv = document.getElementById('app');

const routes = {
    '/huespedes': cargarControladorHuespedes,
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
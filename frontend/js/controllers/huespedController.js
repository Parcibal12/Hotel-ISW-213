import { getHuespedes, crearHuesped } from "../api/huespedApi.js";
import { generarHtmlHuespedes } from "../views/huespedView.js";

export const cargarControladorHuespedes = async (contenedor) => {
    const huespedes = await getHuespedes();

    contenedor.innerHTML = generarHtmlHuespedes(huespedes);

    const form = document.getElementById('form-huesped');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nuevoHuesped = {
            nombre_completo: document.getElementById('nombre').value,
            documento_identidad: document.getElementById('documento').value,
            correo: document.getElementById('correo').value,
            telefono: document.getElementById('telefono').value,
            tipo_documento_id: document.getElementById('tipo_doc').value
        }

        try {
            await crearHuesped(nuevoHuesped);
            Swal.fire({
                title: 'Registrado',
                text: 'Huésped guardado correctamente',
                icon: 'success',
                confirmButtonColor: '#365CF5'
            });

            form.reset();
            await cargarControladorHuespedes(contenedor);

        } catch (error) {
            Swal.fire({
                title: 'No se pudo guardar',
                text: error.message,
                icon: 'error',
                confirmButtonColor: '#d33'
            });
        }
    });

};
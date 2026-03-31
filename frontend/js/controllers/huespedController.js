import { getHuespedes, crearHuesped, getHuespedById } from "../api/huespedApi.js";
import { generarHtmlHuespedes, generarHtmlDetalleHuesped } from "../views/huespedView.js";

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
        };

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

    contenedor.addEventListener('click', async (e) => {
        const btnVer = e.target.closest('.btn-ver-huesped');

        if (btnVer) {
            const huespedId = btnVer.getAttribute('data-id');

            try {
                const huesped = await getHuespedById(huespedId);

                Swal.fire({
                    title: '<h4 class="text-primary">Información del huésped</h4>',
                    html: generarHtmlDetalleHuesped(huesped),
                    confirmButtonText: 'Cerrar',
                    confirmButtonColor: '#365CF5',
                    width: '500px'
                });

            } catch (error) {
                Swal.fire('Error en la consulta', error.message, 'warning');
            }
        }
    });
};
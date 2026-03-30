import { getHuespedes } from '../api/huespedApi.js';
import { getHabitacionesPorTipo, getTiposHabitacion } from '../api/habitacionApi.js';
import { crearReserva } from '../api/reservaApi.js';
import { generarHtmlReservas } from '../views/reservasView.js';

export const cargarControladorReservas = async (contenedor) => {
    const [huespedes, tiposHabitacion] = await Promise.all([
        getHuespedes(),
        getTiposHabitacion()
    ]);

    contenedor.innerHTML = generarHtmlReservas(huespedes, tiposHabitacion);

    const hoy = new Date().toISOString().split('T')[0];

    document.getElementById('fecha_ingreso').setAttribute('min', hoy);
    document.getElementById('fecha_salida').setAttribute('min', hoy);

    const form = document.getElementById('form-reserva');
    const selectTipo = document.getElementById('tipo_habitacion_id');
    const selectHabitacion = document.getElementById('habitacion_id');
    const tarjetaDetalles = document.getElementById('tarjeta-detalles');
    const infoHabitacion = document.getElementById('info-habitacion');
    const inputPersonas = document.getElementById('cantidad_personas');

    selectTipo.addEventListener('change', async (e) => {
        const optionSeleccionada = e.target.options[e.target.selectedIndex];
        const tipoId = e.target.value;

        if (!tipoId) {
            tarjetaDetalles.style.display = 'none';
            selectHabitacion.innerHTML = '<option value="">Primero elija un tipo...</option>';
            selectHabitacion.disabled = true;
            return;
        }

        const capacidad = optionSeleccionada.getAttribute('data-capacidad');
        const precio = optionSeleccionada.getAttribute('data-precio');
        const desc = optionSeleccionada.getAttribute('data-desc');

        infoHabitacion.innerHTML = `
            <p><strong>Capacidad Máxima:</strong> ${capacidad} personas</p>
            <p><strong>Precio Referencial:</strong> $${precio} / noche</p>
            <p class="text-sm mt-2 text-muted">${desc}</p>
        `;
        tarjetaDetalles.style.display = 'block';

        inputPersonas.max = capacidad;

        const habitaciones = await getHabitacionesPorTipo(tipoId);
        selectHabitacion.innerHTML = '<option value="">Seleccione habitación disponible...</option>' +
            habitaciones.map(h => `<option value="${h.id}">Habitación ${h.numero}</option>`).join('');
        selectHabitacion.disabled = false;
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fechaIngreso = document.getElementById('fecha_ingreso').value;
        const fechaSalida = document.getElementById('fecha_salida').value;

        if (new Date(fechaSalida) <= new Date(fechaIngreso)) {
            return Swal.fire('Error de Fechas', 'La fecha de salida debe ser posterior a la fecha de ingreso', 'warning');
        }

        const nuevaReserva = {
            huesped_id: document.getElementById('huesped_id').value,
            habitacion_id: document.getElementById('habitacion_id').value,
            fecha_ingreso: fechaIngreso,
            fecha_salida: fechaSalida,
            cantidad_personas: document.getElementById('cantidad_personas').value
        };

        try {
            await crearReserva(nuevaReserva);
            Swal.fire('Éxito', 'Reserva registrada correctamente', 'success');
            form.reset();
            tarjetaDetalles.style.display = 'none';
            selectHabitacion.disabled = true;
        } catch (error) {
            Swal.fire('No se pudo reservar', error.message, 'error');
        }
    });
};
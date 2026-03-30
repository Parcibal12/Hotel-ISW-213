export const generarHtmlReservas = (huespedes, tiposHabitacion) => {
    const opcionesHuespedes = huespedes.map(h =>
        `<option value="${h.id}">${h.nombre_completo} (${h.documento_identidad})</option>`
    ).join('');

    const opcionesTipos = tiposHabitacion.map(t =>
        `<option value="${t.id}" data-capacidad="${t.capacidad}" data-precio="${t.precio_base}" data-desc="${t.descripcion}">
            ${t.nombre}
        </option>`
    ).join('');

    return `
        <div class="title-wrapper pt-30">
            <div class="row align-items-center">
                <div class="col-md-6"><div class="title mb-30"><h2>Control de Reservas</h2></div></div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-8">
                <div class="card-style mb-30">
                    <h6 class="mb-25">Registrar Nueva Reserva</h6>
                    <form id="form-reserva">
                        <div class="row">
                            <div class="col-12 mb-3">
                                <div class="select-style-1">
                                    <label>Huésped</label>
                                    <div class="select-position">
                                        <select id="huesped_id" required>
                                            <option value="">Seleccione un huésped...</option>
                                            ${opcionesHuespedes}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-md-6 mb-3">
                                <div class="select-style-1">
                                    <label>Tipo de Habitación (Variación)</label>
                                    <div class="select-position">
                                        <select id="tipo_habitacion_id" required>
                                            <option value="">Seleccione un tipo...</option>
                                            ${opcionesTipos}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6 mb-3">
                                <div class="select-style-1">
                                    <label>Habitación Específica</label>
                                    <div class="select-position">
                                        <select id="habitacion_id" required disabled>
                                            <option value="">Primero elija un tipo...</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4 mb-3">
                                <div class="input-style-1">
                                    <label>Fecha de Ingreso</label>
                                    <input type="date" id="fecha_ingreso" required />
                                </div>
                            </div>
                            
                            <div class="col-md-4 mb-3">
                                <div class="input-style-1">
                                    <label>Fecha de Salida</label>
                                    <input type="date" id="fecha_salida" required />
                                </div>
                            </div>

                            <div class="col-md-4 mb-3">
                                <div class="input-style-1">
                                    <label>Cant. Personas</label>
                                    <input type="number" id="cantidad_personas" min="1" required />
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="main-btn primary-btn btn-hover mt-3">Confirmar Reserva</button>
                    </form>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="card-style mb-30" id="tarjeta-detalles" style="display: none; background-color: #f8f9fa;">
                    <h6 class="mb-25 text-primary">Detalles de la Variación</h6>
                    <div id="info-habitacion">
                        </div>
                </div>
            </div>
        </div>
    `;
};
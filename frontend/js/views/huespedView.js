export const generarHtmlHuespedes = (huespedes) => {
    const filas = huespedes.map(h => `
        <tr>
            <td><p class="text-sm">${h.nombre_completo}</p></td>
            <td><p class="text-sm">${h.documento_identidad}</p></td>
            <td><p class="text-sm">${h.correo}</p></td>
            <td><p class="text-sm">${h.telefono}</p></td>
            <td>
                <button class="main-btn primary-btn btn-hover btn-sm btn-ver-huesped" data-id="${h.id}">
                    Ver Perfil
                </button>
            </td>
        </tr>
    `).join('');

    return `
        <div class="title-wrapper pt-30">
            <div class="row align-items-center">
                <div class="col-md-6"><div class="title mb-30"><h2>Gestión de Huéspedes</h2></div></div>
            </div>
        </div>

        <div class="card-style mb-30">
            <h6 class="mb-25">Registrar Nuevo Huésped</h6>
            <form id="form-huesped">
                <div class="row">
                    <div class="col-md-6">
                        <div class="input-style-1"><label>Nombre Completo</label><input type="text" id="nombre" required /></div>
                    </div>
                    <div class="col-md-6">
                        <div class="input-style-1"><label>Documento de Identidad</label><input type="text" id="documento" required /></div>
                    </div>
                    <div class="col-md-6">
                        <div class="input-style-1"><label>Correo</label><input type="email" id="correo" required /></div>
                    </div>
                    <div class="col-md-6">
                        <div class="input-style-1"><label>Teléfono</label><input type="text" id="telefono" required /></div>
                    </div>
                    <input type="hidden" id="tipo_doc" value="1" />
                </div>
                <button type="submit" class="main-btn primary-btn btn-hover">Guardar Huésped</button>
            </form>
        </div>

        <div class="card-style mb-30">
            <h6 class="mb-25">Lista de Huéspedes</h6>
            <div class="table-wrapper table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Documento</th>
                            <th>Correo</th>
                            <th>Teléfono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>${filas.length > 0 ? filas : '<tr><td colspan="5" class="text-center text-muted">No hay huéspedes registrados</td></tr>'}</tbody>
                </table>
            </div>
        </div>
    `;
};

export const generarHtmlDetalleHuesped = (huesped) => {
    return `
        <div class="table-wrapper table-responsive mt-3">
            <table class="table table-striped" style="text-align: left;">
                <tbody>
                    <tr>
                        <th><h6 class="text-sm text-medium">Nombre:</h6></th>
                        <td><p class="text-sm">${huesped.nombre_completo}</p></td>
                    </tr>
                    <tr>
                        <th><h6 class="text-sm text-medium">Documento:</h6></th>
                        <td><p class="text-sm">${huesped.tipo_documento} - ${huesped.documento_identidad}</p></td>
                    </tr>
                    <tr>
                        <th><h6 class="text-sm text-medium">Teléfono:</h6></th>
                        <td><p class="text-sm">${huesped.telefono}</p></td>
                    </tr>
                    <tr>
                        <th><h6 class="text-sm text-medium">Correo:</h6></th>
                        <td><p class="text-sm">${huesped.correo}</p></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
};
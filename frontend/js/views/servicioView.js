export const generarHtmlServicios = (servicios = []) => {
    const filas = servicios.length > 0
        ? servicios.map(s => `
            <tr>
                <td><p class="text-sm"><strong>${s.nombre_servicio}</strong></p></td>
                <td><p class="text-sm">${s.encargado}</p></td>
                <td><p class="text-sm">${s.telefono}</p></td>
            </tr>
        `).join('')
        : '<tr><td colspan="3" class="text-center text-muted py-4">No hay servicios registrados en el hotel.</td></tr>';

    return `
        <div class="title-wrapper pt-30">
            <div class="row align-items-center">
                <div class="col-md-6"><div class="title mb-30"><h2>Directorio de Servicios</h2></div></div>
            </div>
        </div>

        <div class="card-style mb-30">
            <h6 class="mb-25">Contactos Internos del Hotel</h6>
            <p class="text-sm mb-20 text-muted">Listado de servicios de referencia para atención a los huéspedes</p>
            
            <div class="table-wrapper table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th><h6>Servicio</h6></th>
                            <th><h6>Persona encargada</h6></th>
                            <th><h6>Teléfono de contacto</h6></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filas}
                    </tbody>
                </table>
            </div>
        </div>
    `;
};
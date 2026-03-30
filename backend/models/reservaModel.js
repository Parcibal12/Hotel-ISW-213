export default class reservaModel {
    constructor(huesped_id, habitacion_id, fecha_ingreso, fecha_salida, cantidad_personas, estado) {
        this.huesped_id = huesped_id;
        this.habitacion_id = habitacion_id;
        this.fecha_ingreso = fecha_ingreso;
        this.fecha_salida = fecha_salida;
        this.cantidad_personas = cantidad_personas || 1;
        this.estado = estado || 'Pendiente';
    }
}
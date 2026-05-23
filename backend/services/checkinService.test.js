import { validarEstadoReserva } from './checkinService.js';

test('Debe lanzar error si la reserva está Cancelada', () => {
    const reserva = { estado: 'Cancelada' };

    expect(() => validarEstadoReserva(reserva))
        .toThrow('Operación denegada: La reserva está Cancelada');
});

test('Debe lanzar error si la reserva está Finalizada', () => {
    const reserva = { estado: 'Finalizada' };

    expect(() => validarEstadoReserva(reserva))
        .toThrow('Operación denegada: La reserva está Finalizada');
});

test('Debe lanzar error si el huésped ya está en el hotel (EnCurso)', () => {
    const reserva = { estado: 'EnCurso' };

    expect(() => validarEstadoReserva(reserva))
        .toThrow('Doble Check in denegado: El huésped ya está en el hotel');});

test('No debe lanzar error si la reserva está Pendiente', () => {
    const reserva = { estado: 'Pendiente' };

    expect(() => validarEstadoReserva(reserva)).not.toThrow();
});
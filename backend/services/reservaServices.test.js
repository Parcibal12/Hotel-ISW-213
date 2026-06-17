import { jest } from '@jest/globals';

const mockObtenerCapacidadHabitacion = jest.fn();
const mockVerificarDisponibilidad = jest.fn();
const mockCrearReserva = jest.fn();
const mockObtenerTodasLasReservas = jest.fn(); 
const mockActualizarEstadoReserva = jest.fn();

jest.unstable_mockModule('../repositories/reservaRepository.js', () => ({
    obtenerCapacidadHabitacion: mockObtenerCapacidadHabitacion,
    verificarDisponibilidad: mockVerificarDisponibilidad,
    crearReserva: mockCrearReserva,
    obtenerTodasLasReservas: mockObtenerTodasLasReservas,
    actualizarEstadoReserva: mockActualizarEstadoReserva
}));

const { registrarReserva, listarReservas } = await import('./reservaServices.js');

describe('HU-02: Crear reserva de habitación', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('CA 1: Debe registrar correctamente si los datos son válidos', async () => {
        const reserva = { huesped_id: 1, habitacion_id: 101, fecha_ingreso: '2026-06-01', fecha_salida: '2026-06-05', cantidad_personas: 2 };
        
        mockObtenerCapacidadHabitacion.mockResolvedValue(4);
        mockVerificarDisponibilidad.mockResolvedValue(false);
        mockCrearReserva.mockResolvedValue({ id: 1, ...reserva });

        const resultado = await registrarReserva(reserva);
        expect(resultado).toBeDefined();
        expect(resultado.id).toBe(1);
    });

    test('CA 2: Debe impedir el registro si la fecha de salida no es posterior al ingreso', async () => {
        const reserva = { huesped_id: 1, habitacion_id: 101, fecha_ingreso: '2026-06-05', fecha_salida: '2026-06-01', cantidad_personas: 2 }; 
        
        await expect(registrarReserva(reserva)).rejects.toThrow('Fechas inválidas');
    });

    test('CA 3: Debe impedir el solapamiento si la habitación ya está reservada en esas fechas', async () => {
        const reserva = { huesped_id: 1, habitacion_id: 101, fecha_ingreso: '2026-06-10', fecha_salida: '2026-06-15', cantidad_personas: 2 };
        
        mockObtenerCapacidadHabitacion.mockResolvedValue(4);
        mockVerificarDisponibilidad.mockResolvedValue(true); 
        
        await expect(registrarReserva(reserva)).rejects.toThrow('Habitación ocupada en esas fechas');
    });

    test('CA 4: Debe rechazar la operación si la cantidad de personas supera la capacidad', async () => {
        const reserva = { huesped_id: 1, habitacion_id: 101, fecha_ingreso: '2026-06-01', fecha_salida: '2026-06-05', cantidad_personas: 5 }; 
        
        mockObtenerCapacidadHabitacion.mockResolvedValue(2); 
        
        await expect(registrarReserva(reserva)).rejects.toThrow('Capacidad excedida');
    });

    test('CA 4: Debe rechazar la reserva si la cantidad de personas es cero o negativa', async () => {
        const reservaInvalida = { 
            huesped_id: 1, 
            habitacion_id: 101, 
            fecha_ingreso: '2026-06-01', 
            fecha_salida: '2026-06-05', 
            cantidad_personas: -2 
        };
        
        mockObtenerCapacidadHabitacion.mockResolvedValue(4);
        mockVerificarDisponibilidad.mockResolvedValue(false);

        await expect(registrarReserva(reservaInvalida)).rejects.toThrow('Cantidad de personas inválida');
    });
});


describe('HU-03: consultar reservas activas y futuras', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('CA 2: Debe devolver las reservas ordenadas cronológicamente por fecha de ingreso', async () => {
        const reservasDesordenadas = [
            { id: 1, fecha_ingreso: '2026-12-10T00:00:00Z' },
            { id: 2, fecha_ingreso: '2026-01-05T00:00:00Z' }
        ];        
        mockObtenerTodasLasReservas.mockResolvedValue(reservasDesordenadas);
        const resultado = await listarReservas();

        expect(resultado[0].id).toBe(2);
        expect(resultado[1].id).toBe(1);

    });
});
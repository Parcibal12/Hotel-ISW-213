import { jest } from '@jest/globals';

// 1. Declarar TODOS los mocks ANTES de importar el servicio
const mockObtenerCapacidadHabitacion = jest.fn();
const mockVerificarDisponibilidad = jest.fn();
const mockCrearReserva = jest.fn();
const mockObtenerTodasLasReservas = jest.fn(); // Agregado para calmar a Jest
const mockActualizarEstadoReserva = jest.fn(); // Agregado para calmar a Jest

// 2. Mockear el módulo completo
jest.unstable_mockModule('../repositories/reservaRepository.js', () => ({
    obtenerCapacidadHabitacion: mockObtenerCapacidadHabitacion,
    verificarDisponibilidad: mockVerificarDisponibilidad,
    crearReserva: mockCrearReserva,
    obtenerTodasLasReservas: mockObtenerTodasLasReservas,
    actualizarEstadoReserva: mockActualizarEstadoReserva
}));

// 3. Importar dinámicamente el servicio a probar
const { registrarReserva } = await import('./reservaServices.js');

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
});
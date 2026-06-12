import { jest } from '@jest/globals';

const mockObtenerHuespedPorId = jest.fn();
const mockBuscarPorDocumento = jest.fn();
const mockCrearHuesped = jest.fn();
const mockObtenerHuespedes = jest.fn();

jest.unstable_mockModule('../repositories/huespedRepository.js', () => ({
    obtenerHuespedPorId: mockObtenerHuespedPorId,
    buscarPorDocumento: mockBuscarPorDocumento,
    crearHuesped: mockCrearHuesped,
    obtenerHuespedes: mockObtenerHuespedes
}));

const { consultarHuesped } = await import('./huespedService.js');

describe('HU-10: Consultar información de un huésped', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    

    test('CA 4: Debe responder con error controlado si el ID está vacío antes de consultar la BD', async () => {
        mockObtenerHuespedPorId.mockResolvedValue(null);
        await expect(consultarHuesped(null)).rejects.toThrow('Se requiere un ID válido');
        expect(mockObtenerHuespedPorId).not.toHaveBeenCalled();
    });
});
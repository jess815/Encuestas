using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.Flujo
{
    public interface IBitacoraFlujo
    {
        Task<IEnumerable<BitacoraResponse>> Obtener();

        Task<BitacoraResponse> Obtener(int IdBitacora);

        Task<int> Agregar(BitacoraRequest bitacora);
    }
}
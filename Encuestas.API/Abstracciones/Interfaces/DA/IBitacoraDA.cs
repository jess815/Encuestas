using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.DA
{
    public interface IBitacoraDA
    {
        Task<IEnumerable<BitacoraResponse>> Obtener();

        Task<BitacoraResponse> Obtener(int IdBitacora);

        Task<int> Agregar(BitacoraRequest bitacora);
    }
}
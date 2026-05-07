using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.DA
{
    public interface IEncuestaDA
    {
        Task<IEnumerable<AreaResponse>> Obtener();

        Task<AreaResponse> Obtener(int IdArea);

        Task<int> Agregar(AreaRequest area);

        Task<int> Editar(int IdArea, AreaRequest area);

        Task<int> Eliminar(int IdArea);
    }
}
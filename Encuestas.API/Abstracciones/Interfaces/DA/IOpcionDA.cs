using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.DA
{
    public interface IOpcionDA
    {
        Task<IEnumerable<OpcionResponse>> Obtener();

        Task<OpcionResponse> Obtener(int IdOpcion);

        Task<int> Agregar(OpcionRequest opcion);

        Task<int> Editar(int IdOpcion, OpcionRequest opcion);

        Task<int> Eliminar(int IdOpcion);
    }
}
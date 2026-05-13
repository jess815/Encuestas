using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.DA
{
    public interface ICorreoAreaDA
    {
        Task<IEnumerable<CorreoAreaResponse>> Obtener();

        Task<CorreoAreaResponse> Obtener(int IdCorreoArea);

        Task<int> Agregar(CorreoAreaRequest correoArea);

        Task<int> Editar(int IdCorreoArea, CorreoAreaRequest correoArea);

        Task<int> Eliminar(int IdCorreoArea);
    }
}
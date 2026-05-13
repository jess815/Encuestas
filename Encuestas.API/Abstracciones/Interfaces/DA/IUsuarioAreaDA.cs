using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.DA
{
    public interface IUsuarioAreaDA
    {
        Task<IEnumerable<UsuarioAreaResponse>> Obtener();

        Task<UsuarioAreaResponse> Obtener(int IdUsuarioArea);

        Task<int> Agregar(UsuarioAreaRequest usuarioArea);

        Task<int> Editar(int IdUsuarioArea, UsuarioAreaRequest usuarioArea);

        Task<int> Eliminar(int IdUsuarioArea);
    }
}
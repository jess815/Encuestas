using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.Flujo
{
    public interface IUsuarioAreaFlujo
    {
        Task<IEnumerable<UsuarioAreaResponse>> Obtener();

        Task<UsuarioAreaResponse> Obtener(int IdUsuarioArea);

        Task<int> Agregar(UsuarioAreaRequest usuarioArea);

        Task<int> Editar(int IdUsuarioArea, UsuarioAreaRequest usuarioArea);

        Task<int> Eliminar(int IdUsuarioArea);
    }
}
using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.DA
{
    public interface IUsuarioDA
    {
        Task<IEnumerable<UsuarioResponse>> Obtener();

        Task<UsuarioResponse> Obtener(int IdUsuario);

        Task<int> Agregar(UsuarioRequest usuario);

        Task<int> Editar(int IdUsuario, UsuarioRequest usuario);

        Task<int> Eliminar(int IdUsuario);

        Task<UsuarioResponse> Login(LoginRequest login);
    }
}
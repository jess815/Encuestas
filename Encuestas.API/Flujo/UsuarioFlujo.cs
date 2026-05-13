using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;

namespace Flujo
{
    public class UsuarioFlujo : IUsuarioFlujo
    {
        private IUsuarioDA _usuarioDA;

        public UsuarioFlujo(IUsuarioDA usuarioDA)
        {
            _usuarioDA = usuarioDA;
        }

        public async Task<int> Agregar(UsuarioRequest usuario)
        {
            return await _usuarioDA.Agregar(usuario);
        }

        public async Task<int> Editar(int IdUsuario, UsuarioRequest usuario)
        {
            return await _usuarioDA.Editar(IdUsuario, usuario);
        }

        public async Task<int> Eliminar(int IdUsuario)
        {
            return await _usuarioDA.Eliminar(IdUsuario);
        }

        public async Task<IEnumerable<UsuarioResponse>> Obtener()
        {
            return await _usuarioDA.Obtener();
        }

        public async Task<UsuarioResponse> Obtener(int IdUsuario)
        {
            return await _usuarioDA.Obtener(IdUsuario);
        }

        public async Task<UsuarioResponse> Login(LoginRequest login)
        {
            return await _usuarioDA.Login(login);
        }
    }
}
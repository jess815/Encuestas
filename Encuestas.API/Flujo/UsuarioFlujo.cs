using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;

namespace Flujo
{
    public class UsuarioFlujo : IUsuarioFlujo
    {
        private IUsuarioDA _usuarioDA;
        private IBitacoraDA _bitacoraDA;

        public UsuarioFlujo(
            IUsuarioDA usuarioDA,
            IBitacoraDA bitacoraDA)
        {
            _usuarioDA = usuarioDA;
            _bitacoraDA = bitacoraDA;
        }

        public async Task<int> Agregar(UsuarioRequest usuario)
        {
            var resultado = await _usuarioDA.Agregar(usuario);

            await _bitacoraDA.Agregar(new BitacoraRequest
            {
                IdUsuario = 1,
                Modulo = "Usuarios",
                Accion = "Creación de usuario",
                Detalle = $"Se creó el usuario: {usuario.Usuario}"
            });

            return resultado;
        }

        public async Task<int> Editar(int IdUsuario, UsuarioRequest usuario)
        {
            var resultado = await _usuarioDA.Editar(IdUsuario, usuario);

            await _bitacoraDA.Agregar(new BitacoraRequest
            {
                IdUsuario = 1,
                Modulo = "Usuarios",
                Accion = "Edición de usuario",
                Detalle = $"Se editó el usuario: {usuario.Usuario}"
            });

            return resultado;
        }

        public async Task<int> Eliminar(int IdUsuario)
        {
            var resultado = await _usuarioDA.Eliminar(IdUsuario);

            await _bitacoraDA.Agregar(new BitacoraRequest
            {
                IdUsuario = 1,
                Modulo = "Usuarios",
                Accion = "Eliminación de usuario",
                Detalle = $"Se eliminó el usuario #{IdUsuario}"
            });

            return resultado;
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
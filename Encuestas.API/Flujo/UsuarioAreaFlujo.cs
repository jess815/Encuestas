using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;

namespace Flujo
{
    public class UsuarioAreaFlujo : IUsuarioAreaFlujo
    {
        private IUsuarioAreaDA _usuarioAreaDA;

        public UsuarioAreaFlujo(IUsuarioAreaDA usuarioAreaDA)
        {
            _usuarioAreaDA = usuarioAreaDA;
        }

        public async Task<int> Agregar(UsuarioAreaRequest usuarioArea)
        {
            return await _usuarioAreaDA.Agregar(usuarioArea);
        }

        public async Task<int> Editar(int IdUsuarioArea, UsuarioAreaRequest usuarioArea)
        {
            return await _usuarioAreaDA.Editar(IdUsuarioArea, usuarioArea);
        }

        public async Task<int> Eliminar(int IdUsuarioArea)
        {
            return await _usuarioAreaDA.Eliminar(IdUsuarioArea);
        }

        public async Task<IEnumerable<UsuarioAreaResponse>> Obtener()
        {
            return await _usuarioAreaDA.Obtener();
        }

        public async Task<UsuarioAreaResponse> Obtener(int IdUsuarioArea)
        {
            return await _usuarioAreaDA.Obtener(IdUsuarioArea);
        }
    }
}
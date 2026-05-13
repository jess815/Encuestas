using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;

namespace Flujo
{
    public class SeguimientoComentarioFlujo : ISeguimientoComentarioFlujo
    {
        private ISeguimientoComentarioDA _seguimientoComentarioDA;

        public SeguimientoComentarioFlujo(
            ISeguimientoComentarioDA seguimientoComentarioDA)
        {
            _seguimientoComentarioDA = seguimientoComentarioDA;
        }

        public async Task<int> Agregar(SeguimientoComentarioRequest comentario)
        {
            return await _seguimientoComentarioDA.Agregar(comentario);
        }

        public async Task<int> Editar(
            int IdSeguimientoComentario,
            SeguimientoComentarioRequest comentario)
        {
            return await _seguimientoComentarioDA.Editar(
                IdSeguimientoComentario,
                comentario);
        }

        public async Task<int> Eliminar(int IdSeguimientoComentario)
        {
            return await _seguimientoComentarioDA.Eliminar(IdSeguimientoComentario);
        }

        public async Task<IEnumerable<SeguimientoComentarioResponse>> Obtener()
        {
            return await _seguimientoComentarioDA.Obtener();
        }

        public async Task<SeguimientoComentarioResponse> Obtener(int IdSeguimientoComentario)
        {
            return await _seguimientoComentarioDA.Obtener(IdSeguimientoComentario);
        }
    }
}
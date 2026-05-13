using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;

namespace Flujo
{
    public class SeguimientoComentarioFlujo : ISeguimientoComentarioFlujo
    {
        private ISeguimientoComentarioDA _seguimientoComentarioDA;
        private IBitacoraDA _bitacoraDA;

        public SeguimientoComentarioFlujo(
            ISeguimientoComentarioDA seguimientoComentarioDA,
            IBitacoraDA bitacoraDA)
        {
            _seguimientoComentarioDA = seguimientoComentarioDA;
            _bitacoraDA = bitacoraDA;
        }

        public async Task<int> Agregar(
            SeguimientoComentarioRequest seguimientoComentario)
        {
            var resultado =
                await _seguimientoComentarioDA.Agregar(seguimientoComentario);

            await _bitacoraDA.Agregar(new BitacoraRequest
            {
                IdUsuario = 1,
                Modulo = "SeguimientoComentarios",
                Accion = "Creación de comentario",
                Detalle =
                    $"Se agregó comentario al seguimiento #{seguimientoComentario.IdSeguimiento}"
            });

            return resultado;
        }

        public async Task<int> Editar(
            int IdSeguimientoComentario,
            SeguimientoComentarioRequest seguimientoComentario)
        {
            var resultado =
                await _seguimientoComentarioDA.Editar(
                    IdSeguimientoComentario,
                    seguimientoComentario);

            await _bitacoraDA.Agregar(new BitacoraRequest
            {
                IdUsuario = 1,
                Modulo = "SeguimientoComentarios",
                Accion = "Edición de comentario",
                Detalle =
                    $"Se editó comentario #{IdSeguimientoComentario}"
            });

            return resultado;
        }

        public async Task<int> Eliminar(int IdSeguimientoComentario)
        {
            var resultado =
                await _seguimientoComentarioDA.Eliminar(IdSeguimientoComentario);

            await _bitacoraDA.Agregar(new BitacoraRequest
            {
                IdUsuario = 1,
                Modulo = "SeguimientoComentarios",
                Accion = "Eliminación de comentario",
                Detalle =
                    $"Se eliminó comentario #{IdSeguimientoComentario}"
            });

            return resultado;
        }

        public async Task<IEnumerable<SeguimientoComentarioResponse>> Obtener()
        {
            return await _seguimientoComentarioDA.Obtener();
        }

        public async Task<SeguimientoComentarioResponse> Obtener(
            int IdSeguimientoComentario)
        {
            return await _seguimientoComentarioDA.Obtener(
                IdSeguimientoComentario);
        }
    }
}
using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;

namespace Flujo
{
    public class SeguimientoFlujo : ISeguimientoFlujo
    {
        private ISeguimientoDA _seguimientoDA;
        private IBitacoraDA _bitacoraDA;

        public SeguimientoFlujo(
            ISeguimientoDA seguimientoDA,
            IBitacoraDA bitacoraDA)
        {
            _seguimientoDA = seguimientoDA;
            _bitacoraDA = bitacoraDA;
        }

        public async Task<int> Agregar(SeguimientoRequest seguimiento)
        {
            var resultado = await _seguimientoDA.Agregar(seguimiento);

            await _bitacoraDA.Agregar(new BitacoraRequest
            {
                IdUsuario = 1,
                Modulo = "Seguimientos",
                Accion = "Creación de seguimiento",
                Detalle = $"Se creó seguimiento para respuesta #{seguimiento.IdRespuesta}"
            });

            return resultado;
        }

        public async Task<int> Editar(int IdSeguimiento, SeguimientoRequest seguimiento)
        {
            var resultado = await _seguimientoDA.Editar(IdSeguimiento, seguimiento);

            await _bitacoraDA.Agregar(new BitacoraRequest
            {
                IdUsuario = 1,
                Modulo = "Seguimientos",
                Accion = "Edición de seguimiento",
                Detalle = $"Se editó seguimiento #{IdSeguimiento}"
            });

            return resultado;
        }

        public async Task<int> Eliminar(int IdSeguimiento)
        {
            var resultado = await _seguimientoDA.Eliminar(IdSeguimiento);

            await _bitacoraDA.Agregar(new BitacoraRequest
            {
                IdUsuario = 1,
                Modulo = "Seguimientos",
                Accion = "Eliminación de seguimiento",
                Detalle = $"Se eliminó seguimiento #{IdSeguimiento}"
            });

            return resultado;
        }

        public async Task<IEnumerable<SeguimientoResponse>> Obtener()
        {
            return await _seguimientoDA.Obtener();
        }

        public async Task<SeguimientoResponse> Obtener(int IdSeguimiento)
        {
            return await _seguimientoDA.Obtener(IdSeguimiento);
        }
    }
}
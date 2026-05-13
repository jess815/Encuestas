using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;

namespace Flujo
{
    public class RespuestaFlujo : IRespuestaFlujo
    {
        private IRespuestaDA _respuestaDA;
        private IBitacoraDA _bitacoraDA;

        public RespuestaFlujo(
            IRespuestaDA respuestaDA,
            IBitacoraDA bitacoraDA)
        {
            _respuestaDA = respuestaDA;
            _bitacoraDA = bitacoraDA;
        }

        public async Task<int> Agregar(RespuestaRequest respuesta)
        {
            var resultado = await _respuestaDA.Agregar(respuesta);

            await _bitacoraDA.Agregar(new BitacoraRequest
            {
                IdUsuario = 1,
                Modulo = "Encuestas",
                Accion = "Registro de encuesta",
                Detalle =
                    $"Se registró una encuesta para el área #{respuesta.IdArea}"
            });

            return resultado;
        }

        public async Task<int> Editar(int IdRespuesta, RespuestaRequest respuesta)
        {
            var resultado =
                await _respuestaDA.Editar(IdRespuesta, respuesta);

            await _bitacoraDA.Agregar(new BitacoraRequest
            {
                IdUsuario = 1,
                Modulo = "Encuestas",
                Accion = "Edición de encuesta",
                Detalle =
                    $"Se editó la encuesta #{IdRespuesta}"
            });

            return resultado;
        }

        public async Task<int> Eliminar(int IdRespuesta)
        {
            var resultado =
                await _respuestaDA.Eliminar(IdRespuesta);

            await _bitacoraDA.Agregar(new BitacoraRequest
            {
                IdUsuario = 1,
                Modulo = "Encuestas",
                Accion = "Eliminación de encuesta",
                Detalle =
                    $"Se eliminó la encuesta #{IdRespuesta}"
            });

            return resultado;
        }

        public async Task<IEnumerable<RespuestaResponse>> Obtener()
        {
            return await _respuestaDA.Obtener();
        }

        public async Task<RespuestaResponse> Obtener(int IdRespuesta)
        {
            return await _respuestaDA.Obtener(IdRespuesta);
        }
    }
}
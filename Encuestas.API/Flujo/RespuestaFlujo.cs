using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;

namespace Flujo
{
    public class RespuestaFlujo : IRespuestaFlujo
    {
        private IRespuestaDA _respuestaDA;

        public RespuestaFlujo(IRespuestaDA respuestaDA)
        {
            _respuestaDA = respuestaDA;
        }

        public async Task<int> Agregar(RespuestaRequest respuesta)
        {
            return await _respuestaDA.Agregar(respuesta);
        }

        public async Task<int> Editar(int IdRespuesta, RespuestaRequest respuesta)
        {
            return await _respuestaDA.Editar(IdRespuesta, respuesta);
        }

        public async Task<int> Eliminar(int IdRespuesta)
        {
            return await _respuestaDA.Eliminar(IdRespuesta);
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
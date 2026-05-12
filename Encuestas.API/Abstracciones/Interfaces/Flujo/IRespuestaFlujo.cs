using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.Flujo
{
    public interface IRespuestaFlujo
    {
        Task<IEnumerable<RespuestaResponse>> Obtener();

        Task<RespuestaResponse> Obtener(int IdRespuesta);

        Task<int> Agregar(RespuestaRequest respuesta);

        Task<int> Editar(int IdRespuesta, RespuestaRequest respuesta);

        Task<int> Eliminar(int IdRespuesta);
    }
}
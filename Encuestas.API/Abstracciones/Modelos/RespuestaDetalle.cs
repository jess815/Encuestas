using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstracciones.Modelos
{
    public class RespuestaDetalleBase
    {
        public int IdPregunta { get; set; }

        public int IdOpcion { get; set; }

        public int ValorCalculado { get; set; }
    }

    public class RespuestaDetalleRequest : RespuestaDetalleBase
    {

    }
    public class RespuestaDetalleResponse : RespuestaDetalleBase
    {
        public int IdRespuestaDetalle { get; set; }

        public string TextoPregunta { get; set; } = string.Empty;

        public string TextoOpcion { get; set; } = string.Empty;
    }
}
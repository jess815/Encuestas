using System.ComponentModel.DataAnnotations;

namespace Abstracciones.Modelos
{
    public class RespuestaBase
    {
        [Required(ErrorMessage = "El IdArea es requerido")]
        public int IdArea { get; set; }

        [StringLength(150)]
        public string? NombreSocio { get; set; }

        public string? Evento { get; set; }

        public DateTime? FechaEvento { get; set; }

        public string? Comentario { get; set; }

        public decimal? NotaGeneral { get; set; }

        public bool Alerta { get; set; }
    }

    public class RespuestaRequest : RespuestaBase
    {
        public List<RespuestaDetalleRequest>? DetalleRespuestas { get; set; }
    }

    public class RespuestaResponse : RespuestaBase
    {
        public int IdRespuesta { get; set; }

        public string NombreArea { get; set; } = string.Empty;

        public DateTime FechaRespuesta { get; set; }

        public List<RespuestaDetalleResponse>? DetalleRespuestas { get; set; }
    }
}
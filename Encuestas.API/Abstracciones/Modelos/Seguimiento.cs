using System.ComponentModel.DataAnnotations;

namespace Abstracciones.Modelos
{
    public class SeguimientoBase
    {
        [Required(ErrorMessage = "El IdRespuesta es requerido")]
        public int IdRespuesta { get; set; }

        [Required(ErrorMessage = "El estado es requerido")]
        [StringLength(30)]
        public string Estado { get; set; } = string.Empty;
    }

    public class SeguimientoRequest : SeguimientoBase
    {

    }
    public class SeguimientoResponse : SeguimientoBase
    {
        public int IdSeguimiento { get; set; }

        public DateTime FechaCreacion { get; set; }

        public DateTime? FechaResolucion { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace Abstracciones.Modelos
{
    public class BitacoraBase
    {
        [Required(ErrorMessage = "El IdUsuario es requerido")]
        public int IdUsuario { get; set; }

        [Required(ErrorMessage = "El módulo es requerido")]
        [StringLength(100)]
        public string Modulo { get; set; } = string.Empty;

        [Required(ErrorMessage = "La acción es requerida")]
        [StringLength(200)]
        public string Accion { get; set; } = string.Empty;

        public string? Detalle { get; set; }
    }

    public class BitacoraRequest : BitacoraBase
    {

    }

    public class BitacoraResponse : BitacoraBase
    {
        public int IdBitacora { get; set; }

        public string NombreUsuario { get; set; } = string.Empty;

        public DateTime FechaAccion { get; set; }
    }
}
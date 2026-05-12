using System.ComponentModel.DataAnnotations;

namespace Abstracciones.Modelos
{
    public class SeguimientoComentarioBase
    {
        [Required(ErrorMessage = "El IdSeguimiento es requerido")]
        public int IdSeguimiento { get; set; }

        [Required(ErrorMessage = "El IdUsuario es requerido")]
        public int IdUsuario { get; set; }

        [Required(ErrorMessage = "El comentario es requerido")]
        public string Comentario { get; set; } = string.Empty;
    }

    public class SeguimientoComentarioRequest : SeguimientoComentarioBase
    {

    }

    public class SeguimientoComentarioResponse : SeguimientoComentarioBase
    {
        public int IdSeguimientoComentario { get; set; }

        public DateTime FechaComentario { get; set; }
    }
}
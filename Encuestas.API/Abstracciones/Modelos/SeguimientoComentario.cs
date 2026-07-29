using System.ComponentModel.DataAnnotations;

namespace Abstracciones.Modelos
{
    // contiene la informacion basica de un comentario de seguimiento
    public class SeguimientoComentarioBase
    {
        // identifica el seguimiento al que pertenece el comentario
        [Required(ErrorMessage = "El IdSeguimiento es requerido")]
        public int IdSeguimiento { get; set; }

        // identifica el usuario que realizo el comentario
        [Required(ErrorMessage = "El IdUsuario es requerido")]
        public int IdUsuario { get; set; }

        // almacena el comentario realizado
        [Required(ErrorMessage = "El comentario es requerido")]
        public string Comentario { get; set; } = string.Empty;
    }

    // representa la informacion necesaria para registrar un comentario
    public class SeguimientoComentarioRequest : SeguimientoComentarioBase
    {

    }

    // representa la informacion que se devuelve al consultar comentarios
    public class SeguimientoComentarioResponse : SeguimientoComentarioBase
    {
        // identifica el comentario
        public int IdSeguimientoComentario { get; set; }

        // almacena el nombre del usuario que realizo el comentario
        public string NombreUsuario { get; set; } = string.Empty;

        // almacena la fecha en que se registro el comentario
        public DateTime FechaComentario { get; set; }
    }
}
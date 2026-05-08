using System.ComponentModel.DataAnnotations;

namespace Abstracciones.Modelos
{
    public class PreguntaBase
    {
        [Required(ErrorMessage = "El IdArea es requerido")]
        public int IdArea { get; set; }

        [Required(ErrorMessage = "El texto es requerido")]
        [StringLength(300)]
        public string Texto { get; set; } = string.Empty;

        [Required(ErrorMessage = "El orden de la pregunta es requerido")]
        public int OrdenPregunta { get; set; }

        public bool Activo { get; set; }
    }

    public class PreguntaRequest : PreguntaBase
    {

    }

    public class PreguntaResponse : PreguntaBase
    {
        public int IdPregunta { get; set; }

        public string NombreArea { get; set; } = string.Empty;
    }
}
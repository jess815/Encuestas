using System.ComponentModel.DataAnnotations;

namespace Abstracciones.Modelos
{
    public class CorreoAreaBase
    {
        [Required(ErrorMessage = "El IdArea es requerido")]
        public int IdArea { get; set; }

        [Required(ErrorMessage = "El correo es requerido")]
        [EmailAddress]
        [StringLength(150)]
        public string Correo { get; set; } = string.Empty;

        public bool Activo { get; set; }
    }

    public class CorreoAreaRequest : CorreoAreaBase
    {

    }

    public class CorreoAreaResponse : CorreoAreaBase
    {
        public int IdCorreoArea { get; set; }

        public string NombreArea { get; set; } = string.Empty;
    }
}
using System.ComponentModel.DataAnnotations;

namespace Abstracciones.Modelos
{
    public class UsuarioAreaBase
    {
        [Required(ErrorMessage = "El IdUsuario es requerido")]
        public int IdUsuario { get; set; }

        [Required(ErrorMessage = "El IdArea es requerido")]
        public int IdArea { get; set; }

        public bool VerArea { get; set; }
    }

    public class UsuarioAreaRequest : UsuarioAreaBase
    {

    }

    public class UsuarioAreaResponse : UsuarioAreaBase
    {
        public int IdUsuarioArea { get; set; }

        public string NombreUsuario { get; set; } = string.Empty;

        public string NombreArea { get; set; } = string.Empty;
    }
}
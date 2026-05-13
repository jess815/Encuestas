using System.ComponentModel.DataAnnotations;

namespace Abstracciones.Modelos
{
    public class UsuarioBase
    {
        [Required(ErrorMessage = "El nombre es requerido")]
        [StringLength(150)]
        public string Nombre { get; set; } = string.Empty;

        [Required(ErrorMessage = "El usuario es requerido")]
        [StringLength(50)]
        public string Usuario { get; set; } = string.Empty;

        [Required(ErrorMessage = "La contraseña es requerida")]
        [StringLength(255)]
        public string PasswordHash { get; set; } = string.Empty;

        public bool Administrador { get; set; }

        public bool EditaEncuesta { get; set; }

        public bool ExportaExcel { get; set; }

        public bool Activo { get; set; }
    }

    public class UsuarioRequest : UsuarioBase
    {

    }

    public class UsuarioResponse
    {
        public int IdUsuario { get; set; }

        public string Nombre { get; set; } = string.Empty;

        public string Usuario { get; set; } = string.Empty;

        public bool Administrador { get; set; }

        public bool EditaEncuesta { get; set; }

        public bool ExportaExcel { get; set; }

        public bool Activo { get; set; }
    }

    public class LoginRequest
    {
        [Required(ErrorMessage = "El usuario es requerido")]
        public string Usuario { get; set; } = string.Empty;

        [Required(ErrorMessage = "La contraseña es requerida")]
        public string Password { get; set; } = string.Empty;
    }
}
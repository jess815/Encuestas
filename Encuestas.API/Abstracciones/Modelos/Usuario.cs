using System.ComponentModel.DataAnnotations;

namespace Abstracciones.Modelos
{
    public class UsuarioBase
    {
        [Required]
        [StringLength(150)]
        public string Nombre { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Usuario { get; set; } = string.Empty;

        [Required]
        [StringLength(255)]
        public string PasswordHash { get; set; } = string.Empty;

        // permisos generales del usuario
        public bool Administrador { get; set; }

        public bool EditaEncuesta { get; set; }

        public bool ExportaExcel { get; set; }

        // areas que puede ver el usuario
        public bool Ceibo { get; set; }

        public bool Faroles { get; set; }

        public bool Hoyo19 { get; set; }

        public bool PinRojo { get; set; }

        public bool CanaBrava { get; set; }

        public bool Eventos { get; set; }

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

        // permisos generales del usuario
        public bool Administrador { get; set; }

        public bool EditaEncuesta { get; set; }

        public bool ExportaExcel { get; set; }

        // areas que puede ver el usuario
        public bool Ceibo { get; set; }

        public bool Faroles { get; set; }

        public bool Hoyo19 { get; set; }

        public bool PinRojo { get; set; }

        public bool CanaBrava { get; set; }

        public bool Eventos { get; set; }

        public bool Activo { get; set; }
    }

    public class LoginRequest
    {
        [Required]
        public string Usuario { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }
}
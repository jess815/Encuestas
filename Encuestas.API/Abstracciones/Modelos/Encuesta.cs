using System.ComponentModel.DataAnnotations;

namespace Abstracciones.Modelos
{
    public class AreaBase
    {
        [Required(ErrorMessage = "El nombre es requerido")]
        [StringLength(100)]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "El tipo es requerido")]
        [StringLength(20)]
        public string Tipo { get; set; }

        public bool Activo { get; set; }
    }

    public class AreaRequest : AreaBase
    {

    }

    public class AreaResponse : AreaBase
    {
        public int IdArea { get; set; }
    }
}
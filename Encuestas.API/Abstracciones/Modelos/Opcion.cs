using System.ComponentModel.DataAnnotations;

namespace Abstracciones.Modelos
{
    public class OpcionBase
    {
        [Required(ErrorMessage = "El texto es requerido")]
        [StringLength(50)]
        public string Texto { get; set; } = string.Empty;

        [Required(ErrorMessage = "El valor es requerido")]
        public int Valor { get; set; }

        [Required(ErrorMessage = "El orden visual es requerido")]
        public int OrdenVisual { get; set; }

        public bool Activo { get; set; }
    }

    public class OpcionRequest : OpcionBase
    {

    }

    public class OpcionResponse : OpcionBase
    {
        public int IdOpcion { get; set; }
    }
}
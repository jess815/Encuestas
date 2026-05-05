using System.ComponentModel.DataAnnotations;

namespace Abstracciones.Modelos
{
    //implementamos las validaciones de los modelos para validar las entradas con el required
    public class VehiculoBase
    {
        [Required(ErrorMessage ="La propiedad placa es requerida")]
        [RegularExpression(@"[A-Za-z]{3}-[0-9]{3}", ErrorMessage = "El formato de la placa debe ser AAA-###")]
        public string Placa { get; set; }

        [Required(ErrorMessage = "La propiedad color es requerida")]
        [StringLength(40, ErrorMessage ="La propiedad color debe ser mayor a 4 caracteres y menos de 40", MinimumLength =4)]
        public string Color { get; set; }

        [Required(ErrorMessage = "La propiedad año es requerida")]
        [RegularExpression(@"(19|20\d\d)", ErrorMessage = "El formato del año no es válido")]
        public int Anio { get; set; }

        [Required(ErrorMessage = "La propiedad precio es requerida")]
        public Decimal Precio { get; set; }

        [Required(ErrorMessage = "La propiedad correo es requerida")]
        [EmailAddress]
        public string CorreoPropietario { get; set; }

        [Required(ErrorMessage = "La propiedad telefono es requerida")]
        [Phone]
        public string TelefonoPropietario { get; set; } 

    }
    //hacemos una clase heredada de vehiculo base

    public class VehiculoRequest : VehiculoBase
    {
        public Guid IdModelo { get; set; }
    }
    public class VehiculoResponse : VehiculoBase
    {
        public Guid Id { get; set; }
        public string Modelo { get; set; }
        public string Marca { get; set; }
    }

}

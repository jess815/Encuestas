using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace Abstracciones.Interfaces.API
{
    public interface IEncuestaController
    {
        Task<IActionResult> Obtener();
        Task<IActionResult> Obtener(Guid Id);
        Task<IActionResult> Agregar(EncuestaRequest vehiculo);
        Task<IActionResult> Editar(Guid Id, EncuestaRequest vehiculo);
        Task<IActionResult> Eliminar(Guid Id);
    }
}

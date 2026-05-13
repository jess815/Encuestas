using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace Abstracciones.Interfaces.API
{
    public interface ICorreoAreaController
    {
        Task<IActionResult> Obtener();

        Task<IActionResult> Obtener(int IdCorreoArea);

        Task<IActionResult> Agregar(CorreoAreaRequest correoArea);

        Task<IActionResult> Editar(int IdCorreoArea, CorreoAreaRequest correoArea);

        Task<IActionResult> Eliminar(int IdCorreoArea);
    }
}
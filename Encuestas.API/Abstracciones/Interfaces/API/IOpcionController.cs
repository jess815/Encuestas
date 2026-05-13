using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace Abstracciones.Interfaces.API
{
    public interface IOpcionController
    {
        Task<IActionResult> Obtener();

        Task<IActionResult> Obtener(int IdOpcion);

        Task<IActionResult> Agregar(OpcionRequest opcion);

        Task<IActionResult> Editar(int IdOpcion, OpcionRequest opcion);

        Task<IActionResult> Eliminar(int IdOpcion);
    }
}
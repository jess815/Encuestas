using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace Abstracciones.Interfaces.API
{
    public interface IEncuestaController
    {
        Task<IActionResult> Obtener();

        Task<IActionResult> Obtener(int IdArea);

        Task<IActionResult> Agregar(AreaRequest area);

        Task<IActionResult> Editar(int IdArea, AreaRequest area);

        Task<IActionResult> Eliminar(int IdArea);
    }
}
using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace Abstracciones.Interfaces.API
{
    public interface ISeguimientoController
    {
        Task<IActionResult> Obtener();

        Task<IActionResult> Obtener(int IdSeguimiento);

        Task<IActionResult> Agregar(SeguimientoRequest seguimiento);

        Task<IActionResult> Editar(int IdSeguimiento, SeguimientoRequest seguimiento);

        Task<IActionResult> Eliminar(int IdSeguimiento);
    }
}
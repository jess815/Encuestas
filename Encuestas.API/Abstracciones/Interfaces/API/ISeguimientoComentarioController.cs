using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace Abstracciones.Interfaces.API
{
    public interface ISeguimientoComentarioController
    {
        Task<IActionResult> Obtener();

        Task<IActionResult> Obtener(int IdSeguimientoComentario);

        Task<IActionResult> Agregar(SeguimientoComentarioRequest comentario);

        Task<IActionResult> Editar(int IdSeguimientoComentario, SeguimientoComentarioRequest comentario);

        Task<IActionResult> Eliminar(int IdSeguimientoComentario);
    }
}
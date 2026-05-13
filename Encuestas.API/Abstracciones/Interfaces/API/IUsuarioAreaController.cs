using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace Abstracciones.Interfaces.API
{
    public interface IUsuarioAreaController
    {
        Task<IActionResult> Obtener();

        Task<IActionResult> Obtener(int IdUsuarioArea);

        Task<IActionResult> Agregar(UsuarioAreaRequest usuarioArea);

        Task<IActionResult> Editar(int IdUsuarioArea, UsuarioAreaRequest usuarioArea);

        Task<IActionResult> Eliminar(int IdUsuarioArea);
    }
}
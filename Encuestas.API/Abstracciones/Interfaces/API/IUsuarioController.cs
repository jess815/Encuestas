using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace Abstracciones.Interfaces.API
{
    public interface IUsuarioController
    {
        Task<IActionResult> Obtener();

        Task<IActionResult> Obtener(int IdUsuario);

        Task<IActionResult> Agregar(UsuarioRequest usuario);

        Task<IActionResult> Editar(int IdUsuario, UsuarioRequest usuario);

        Task<IActionResult> Eliminar(int IdUsuario);

        Task<IActionResult> Login(LoginRequest login);
    }
}
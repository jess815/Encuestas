using Microsoft.AspNetCore.Mvc;

namespace Abstracciones.Interfaces.API
{
    public interface IDashboardController
    {
        Task<IActionResult> ObtenerDashboard(int idUsuario);
    }
}
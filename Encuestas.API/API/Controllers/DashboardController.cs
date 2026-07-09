using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.Flujo;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase, IDashboardController
    {
        private IDashboardFlujo _dashboardFlujo;
        private ILogger<DashboardController> _logger;

        public DashboardController(
            IDashboardFlujo dashboardFlujo,
            ILogger<DashboardController> logger)
        {
            _dashboardFlujo = dashboardFlujo;
            _logger = logger;
        }

        // obtiene el dashboard segun las areas del usuario
        [HttpGet]
        public async Task<IActionResult> ObtenerDashboard(
            [FromQuery] int idUsuario)
        {
            var resultado =
                await _dashboardFlujo.ObtenerDashboard(idUsuario);

            return Ok(resultado);
        }
    }
}
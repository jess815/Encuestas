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

        [HttpGet]
        public async Task<IActionResult> ObtenerDashboard()
        {
            var resultado = await _dashboardFlujo.ObtenerDashboard();

            return Ok(resultado);
        }
    }
}
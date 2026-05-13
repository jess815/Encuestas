using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BitacoraController : ControllerBase, IBitacoraController
    {
        private IBitacoraFlujo _bitacoraFlujo;
        private ILogger<BitacoraController> _logger;

        public BitacoraController(
            IBitacoraFlujo bitacoraFlujo,
            ILogger<BitacoraController> logger)
        {
            _bitacoraFlujo = bitacoraFlujo;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> Agregar(
            [FromBody] BitacoraRequest bitacora)
        {
            var resultado = await _bitacoraFlujo.Agregar(bitacora);

            return CreatedAtAction(
                nameof(Obtener),
                new { IdBitacora = resultado },
                null);
        }

        [HttpGet]
        public async Task<IActionResult> Obtener()
        {
            var resultado = await _bitacoraFlujo.Obtener();

            if (!resultado.Any())
            {
                return NoContent();
            }

            return Ok(resultado);
        }

        [HttpGet("{IdBitacora}")]
        public async Task<IActionResult> Obtener(
            [FromRoute] int IdBitacora)
        {
            var resultado =
                await _bitacoraFlujo.Obtener(IdBitacora);

            if (resultado == null)
            {
                return NotFound("La bitácora no existe");
            }

            return Ok(resultado);
        }
    }
}
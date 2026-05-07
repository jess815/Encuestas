using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EncuestaController : ControllerBase, IEncuestaController
    {
        private IEncuestaFlujo _encuestaFlujo;
        private ILogger<EncuestaController> _logger;

        public EncuestaController(IEncuestaFlujo encuestaFlujo, ILogger<EncuestaController> logger)
        {
            _encuestaFlujo = encuestaFlujo;
            _logger = logger;
        }

        #region Operaciones CRUD

        [HttpPost]
        public async Task<IActionResult> Agregar([FromBody] AreaRequest area)
        {
            var resultado = await _encuestaFlujo.Agregar(area);

            return CreatedAtAction(nameof(Obtener), new { IdArea = resultado }, null);
        }

        [HttpPut("{IdArea}")]
        public async Task<IActionResult> Editar([FromRoute] int IdArea, [FromBody] AreaRequest area)
        {
            if (!await VerificarAreaExiste(IdArea))
            {
                return NotFound("El área no existe");
            }

            var resultado = await _encuestaFlujo.Editar(IdArea, area);

            return Ok(resultado);
        }

        [HttpDelete("{IdArea}")]
        public async Task<IActionResult> Eliminar([FromRoute] int IdArea)
        {
            if (!await VerificarAreaExiste(IdArea))
            {
                return NotFound("El área no existe");
            }

            await _encuestaFlujo.Eliminar(IdArea);

            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> Obtener()
        {
            var resultado = await _encuestaFlujo.Obtener();

            if (!resultado.Any())
            {
                return NoContent();
            }

            return Ok(resultado);
        }

        [HttpGet("{IdArea}")]
        public async Task<IActionResult> Obtener([FromRoute] int IdArea)
        {
            var resultado = await _encuestaFlujo.Obtener(IdArea);

            if (resultado == null)
            {
                return NotFound("El área no existe");
            }

            return Ok(resultado);
        }

        #endregion

        #region Helpers

        private async Task<bool> VerificarAreaExiste(int IdArea)
        {
            var resultadoArea = await _encuestaFlujo.Obtener(IdArea);

            return resultadoArea != null;
        }

        #endregion
    }
}
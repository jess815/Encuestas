using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CorreoAreaController : ControllerBase, ICorreoAreaController
    {
        private ICorreoAreaFlujo _correoAreaFlujo;
        private ILogger<CorreoAreaController> _logger;

        public CorreoAreaController(
            ICorreoAreaFlujo correoAreaFlujo,
            ILogger<CorreoAreaController> logger)
        {
            _correoAreaFlujo = correoAreaFlujo;
            _logger = logger;
        }

        #region Operaciones CRUD

        [HttpPost]
        public async Task<IActionResult> Agregar(
            [FromBody] CorreoAreaRequest correoArea)
        {
            var resultado = await _correoAreaFlujo.Agregar(correoArea);

            return CreatedAtAction(
                nameof(Obtener),
                new { IdCorreoArea = resultado },
                null);
        }

        [HttpPut("{IdCorreoArea}")]
        public async Task<IActionResult> Editar(
            [FromRoute] int IdCorreoArea,
            [FromBody] CorreoAreaRequest correoArea)
        {
            if (!await VerificarCorreoAreaExiste(IdCorreoArea))
            {
                return NotFound("El correo del área no existe");
            }

            var resultado = await _correoAreaFlujo.Editar(
                IdCorreoArea,
                correoArea);

            return Ok(resultado);
        }

        [HttpDelete("{IdCorreoArea}")]
        public async Task<IActionResult> Eliminar(
            [FromRoute] int IdCorreoArea)
        {
            if (!await VerificarCorreoAreaExiste(IdCorreoArea))
            {
                return NotFound("El correo del área no existe");
            }

            await _correoAreaFlujo.Eliminar(IdCorreoArea);

            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> Obtener()
        {
            var resultado = await _correoAreaFlujo.Obtener();

            if (!resultado.Any())
            {
                return NoContent();
            }

            return Ok(resultado);
        }

        [HttpGet("{IdCorreoArea}")]
        public async Task<IActionResult> Obtener(
            [FromRoute] int IdCorreoArea)
        {
            var resultado =
                await _correoAreaFlujo.Obtener(IdCorreoArea);

            if (resultado == null)
            {
                return NotFound("El correo del área no existe");
            }

            return Ok(resultado);
        }

        #endregion

        #region Helpers

        private async Task<bool> VerificarCorreoAreaExiste(int IdCorreoArea)
        {
            var resultadoCorreoArea =
                await _correoAreaFlujo.Obtener(IdCorreoArea);

            return resultadoCorreoArea != null;
        }

        #endregion
    }
}
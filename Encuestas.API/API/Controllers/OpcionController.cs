using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OpcionController : ControllerBase, IOpcionController
    {
        private IOpcionFlujo _opcionFlujo;
        private ILogger<OpcionController> _logger;

        public OpcionController(
            IOpcionFlujo opcionFlujo,
            ILogger<OpcionController> logger)
        {
            _opcionFlujo = opcionFlujo;
            _logger = logger;
        }

        #region Operaciones CRUD

        [HttpPost]
        public async Task<IActionResult> Agregar([FromBody] OpcionRequest opcion)
        {
            var resultado = await _opcionFlujo.Agregar(opcion);

            return CreatedAtAction(nameof(Obtener), new { IdOpcion = resultado }, null);
        }

        [HttpPut("{IdOpcion}")]
        public async Task<IActionResult> Editar(
            [FromRoute] int IdOpcion,
            [FromBody] OpcionRequest opcion)
        {
            if (!await VerificarOpcionExiste(IdOpcion))
            {
                return NotFound("La opción no existe");
            }

            var resultado = await _opcionFlujo.Editar(IdOpcion, opcion);

            return Ok(resultado);
        }

        [HttpDelete("{IdOpcion}")]
        public async Task<IActionResult> Eliminar([FromRoute] int IdOpcion)
        {
            if (!await VerificarOpcionExiste(IdOpcion))
            {
                return NotFound("La opción no existe");
            }

            await _opcionFlujo.Eliminar(IdOpcion);

            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> Obtener()
        {
            var resultado = await _opcionFlujo.Obtener();

            if (!resultado.Any())
            {
                return NoContent();
            }

            return Ok(resultado);
        }

        [HttpGet("{IdOpcion}")]
        public async Task<IActionResult> Obtener([FromRoute] int IdOpcion)
        {
            var resultado = await _opcionFlujo.Obtener(IdOpcion);

            if (resultado == null)
            {
                return NotFound("La opción no existe");
            }

            return Ok(resultado);
        }

        #endregion

        #region Helpers

        private async Task<bool> VerificarOpcionExiste(int IdOpcion)
        {
            var resultadoOpcion = await _opcionFlujo.Obtener(IdOpcion);

            return resultadoOpcion != null;
        }

        #endregion
    }
}
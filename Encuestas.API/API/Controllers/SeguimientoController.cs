using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeguimientoController : ControllerBase, ISeguimientoController
    {
        private ISeguimientoFlujo _seguimientoFlujo;
        private ILogger<SeguimientoController> _logger;

        public SeguimientoController(
            ISeguimientoFlujo seguimientoFlujo,
            ILogger<SeguimientoController> logger)
        {
            _seguimientoFlujo = seguimientoFlujo;
            _logger = logger;
        }

        #region Operaciones CRUD

        [HttpPost]
        public async Task<IActionResult> Agregar([FromBody] SeguimientoRequest seguimiento)
        {
            var resultado = await _seguimientoFlujo.Agregar(seguimiento);

            return CreatedAtAction(nameof(Obtener), new { IdSeguimiento = resultado }, null);
        }

        [HttpPut("{IdSeguimiento}")]
        public async Task<IActionResult> Editar(
            [FromRoute] int IdSeguimiento,
            [FromBody] SeguimientoRequest seguimiento)
        {
            if (!await VerificarSeguimientoExiste(IdSeguimiento))
            {
                return NotFound("El seguimiento no existe");
            }

            var resultado = await _seguimientoFlujo.Editar(IdSeguimiento, seguimiento);

            return Ok(resultado);
        }

        [HttpDelete("{IdSeguimiento}")]
        public async Task<IActionResult> Eliminar([FromRoute] int IdSeguimiento)
        {
            if (!await VerificarSeguimientoExiste(IdSeguimiento))
            {
                return NotFound("El seguimiento no existe");
            }

            await _seguimientoFlujo.Eliminar(IdSeguimiento);

            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> Obtener()
        {
            var resultado = await _seguimientoFlujo.Obtener();

            if (!resultado.Any())
            {
                return NoContent();
            }

            return Ok(resultado);
        }

        [HttpGet("{IdSeguimiento}")]
        public async Task<IActionResult> Obtener([FromRoute] int IdSeguimiento)
        {
            var resultado = await _seguimientoFlujo.Obtener(IdSeguimiento);

            if (resultado == null)
            {
                return NotFound("El seguimiento no existe");
            }

            return Ok(resultado);
        }

        #endregion

        #region Helpers

        private async Task<bool> VerificarSeguimientoExiste(int IdSeguimiento)
        {
            var resultadoSeguimiento = await _seguimientoFlujo.Obtener(IdSeguimiento);

            return resultadoSeguimiento != null;
        }

        #endregion
    }
}
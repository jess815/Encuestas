using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeguimientoComentarioController : ControllerBase, ISeguimientoComentarioController
    {
        private ISeguimientoComentarioFlujo _seguimientoComentarioFlujo;
        private ILogger<SeguimientoComentarioController> _logger;

        public SeguimientoComentarioController(
            ISeguimientoComentarioFlujo seguimientoComentarioFlujo,
            ILogger<SeguimientoComentarioController> logger)
        {
            _seguimientoComentarioFlujo = seguimientoComentarioFlujo;
            _logger = logger;
        }

        #region Operaciones CRUD

        [HttpPost]
        public async Task<IActionResult> Agregar(
            [FromBody] SeguimientoComentarioRequest comentario)
        {
            var resultado = await _seguimientoComentarioFlujo.Agregar(comentario);

            return CreatedAtAction(
                nameof(Obtener),
                new { IdSeguimientoComentario = resultado },
                null);
        }

        [HttpPut("{IdSeguimientoComentario}")]
        public async Task<IActionResult> Editar(
            [FromRoute] int IdSeguimientoComentario,
            [FromBody] SeguimientoComentarioRequest comentario)
        {
            if (!await VerificarComentarioExiste(IdSeguimientoComentario))
            {
                return NotFound("El comentario no existe");
            }

            var resultado = await _seguimientoComentarioFlujo.Editar(
                IdSeguimientoComentario,
                comentario);

            return Ok(resultado);
        }

        [HttpDelete("{IdSeguimientoComentario}")]
        public async Task<IActionResult> Eliminar(
            [FromRoute] int IdSeguimientoComentario)
        {
            if (!await VerificarComentarioExiste(IdSeguimientoComentario))
            {
                return NotFound("El comentario no existe");
            }

            await _seguimientoComentarioFlujo.Eliminar(IdSeguimientoComentario);

            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> Obtener()
        {
            var resultado = await _seguimientoComentarioFlujo.Obtener();

            if (!resultado.Any())
            {
                return NoContent();
            }

            return Ok(resultado);
        }

        [HttpGet("{IdSeguimientoComentario}")]
        public async Task<IActionResult> Obtener(
            [FromRoute] int IdSeguimientoComentario)
        {
            var resultado = await _seguimientoComentarioFlujo.Obtener(IdSeguimientoComentario);

            if (resultado == null)
            {
                return NotFound("El comentario no existe");
            }

            return Ok(resultado);
        }

        #endregion

        #region Helpers

        private async Task<bool> VerificarComentarioExiste(int IdSeguimientoComentario)
        {
            var resultadoComentario =
                await _seguimientoComentarioFlujo.Obtener(IdSeguimientoComentario);

            return resultadoComentario != null;
        }

        #endregion
    }
}
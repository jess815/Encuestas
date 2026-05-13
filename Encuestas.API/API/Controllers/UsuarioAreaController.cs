using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioAreaController : ControllerBase, IUsuarioAreaController
    {
        private IUsuarioAreaFlujo _usuarioAreaFlujo;
        private ILogger<UsuarioAreaController> _logger;

        public UsuarioAreaController(
            IUsuarioAreaFlujo usuarioAreaFlujo,
            ILogger<UsuarioAreaController> logger)
        {
            _usuarioAreaFlujo = usuarioAreaFlujo;
            _logger = logger;
        }

        #region Operaciones CRUD

        [HttpPost]
        public async Task<IActionResult> Agregar(
            [FromBody] UsuarioAreaRequest usuarioArea)
        {
            var resultado = await _usuarioAreaFlujo.Agregar(usuarioArea);

            return CreatedAtAction(
                nameof(Obtener),
                new { IdUsuarioArea = resultado },
                null);
        }

        [HttpPut("{IdUsuarioArea}")]
        public async Task<IActionResult> Editar(
            [FromRoute] int IdUsuarioArea,
            [FromBody] UsuarioAreaRequest usuarioArea)
        {
            if (!await VerificarUsuarioAreaExiste(IdUsuarioArea))
            {
                return NotFound("La relación usuario área no existe");
            }

            var resultado = await _usuarioAreaFlujo.Editar(
                IdUsuarioArea,
                usuarioArea);

            return Ok(resultado);
        }

        [HttpDelete("{IdUsuarioArea}")]
        public async Task<IActionResult> Eliminar(
            [FromRoute] int IdUsuarioArea)
        {
            if (!await VerificarUsuarioAreaExiste(IdUsuarioArea))
            {
                return NotFound("La relación usuario área no existe");
            }

            await _usuarioAreaFlujo.Eliminar(IdUsuarioArea);

            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> Obtener()
        {
            var resultado = await _usuarioAreaFlujo.Obtener();

            if (!resultado.Any())
            {
                return NoContent();
            }

            return Ok(resultado);
        }

        [HttpGet("{IdUsuarioArea}")]
        public async Task<IActionResult> Obtener(
            [FromRoute] int IdUsuarioArea)
        {
            var resultado =
                await _usuarioAreaFlujo.Obtener(IdUsuarioArea);

            if (resultado == null)
            {
                return NotFound("La relación usuario área no existe");
            }

            return Ok(resultado);
        }

        #endregion

        #region Helpers

        private async Task<bool> VerificarUsuarioAreaExiste(int IdUsuarioArea)
        {
            var resultadoUsuarioArea =
                await _usuarioAreaFlujo.Obtener(IdUsuarioArea);

            return resultadoUsuarioArea != null;
        }

        #endregion
    }
}
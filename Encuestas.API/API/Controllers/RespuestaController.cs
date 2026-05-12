using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RespuestaController : ControllerBase, IRespuestaController
    {
        private IRespuestaFlujo _respuestaFlujo;
        private ILogger<RespuestaController> _logger;

        public RespuestaController(IRespuestaFlujo respuestaFlujo, ILogger<RespuestaController> logger)
        {
            _respuestaFlujo = respuestaFlujo;
            _logger = logger;
        }

        #region Operaciones CRUD

        [HttpPost]
        public async Task<IActionResult> Agregar([FromBody] RespuestaRequest respuesta)
        {
            var resultado = await _respuestaFlujo.Agregar(respuesta);

            return CreatedAtAction(nameof(Obtener), new { IdRespuesta = resultado }, null);
        }

        [HttpPut("{IdRespuesta}")]
        public async Task<IActionResult> Editar([FromRoute] int IdRespuesta, [FromBody] RespuestaRequest respuesta)
        {
            if (!await VerificarRespuestaExiste(IdRespuesta))
            {
                return NotFound("La respuesta no existe");
            }

            var resultado = await _respuestaFlujo.Editar(IdRespuesta, respuesta);

            return Ok(resultado);
        }

        [HttpDelete("{IdRespuesta}")]
        public async Task<IActionResult> Eliminar([FromRoute] int IdRespuesta)
        {
            if (!await VerificarRespuestaExiste(IdRespuesta))
            {
                return NotFound("La respuesta no existe");
            }

            await _respuestaFlujo.Eliminar(IdRespuesta);

            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> Obtener()
        {
            var resultado = await _respuestaFlujo.Obtener();

            if (!resultado.Any())
            {
                return NoContent();
            }

            return Ok(resultado);
        }

        [HttpGet("{IdRespuesta}")]
        public async Task<IActionResult> Obtener([FromRoute] int IdRespuesta)
        {
            var resultado = await _respuestaFlujo.Obtener(IdRespuesta);

            if (resultado == null)
            {
                return NotFound("La respuesta no existe");
            }

            return Ok(resultado);
        }

        #endregion

        #region Helpers

        private async Task<bool> VerificarRespuestaExiste(int IdRespuesta)
        {
            var resultadoRespuesta = await _respuestaFlujo.Obtener(IdRespuesta);

            return resultadoRespuesta != null;
        }

        #endregion
    }
}
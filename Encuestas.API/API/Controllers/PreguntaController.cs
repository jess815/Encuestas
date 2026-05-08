using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PreguntaController : ControllerBase, IPreguntaController
    {
        private IPreguntaFlujo _preguntaFlujo;
        private ILogger<PreguntaController> _logger;

        public PreguntaController(IPreguntaFlujo preguntaFlujo, ILogger<PreguntaController> logger)
        {
            _preguntaFlujo = preguntaFlujo;
            _logger = logger;
        }

        #region Operaciones CRUD

        [HttpPost]
        public async Task<IActionResult> Agregar([FromBody] PreguntaRequest pregunta)
        {
            var resultado = await _preguntaFlujo.Agregar(pregunta);

            return CreatedAtAction(nameof(Obtener), new { IdPregunta = resultado }, null);
        }

        [HttpPut("{IdPregunta}")]
        public async Task<IActionResult> Editar([FromRoute] int IdPregunta, [FromBody] PreguntaRequest pregunta)
        {
            if (!await VerificarPreguntaExiste(IdPregunta))
            {
                return NotFound("La pregunta no existe");
            }

            var resultado = await _preguntaFlujo.Editar(IdPregunta, pregunta);

            return Ok(resultado);
        }

        [HttpDelete("{IdPregunta}")]
        public async Task<IActionResult> Eliminar([FromRoute] int IdPregunta)
        {
            if (!await VerificarPreguntaExiste(IdPregunta))
            {
                return NotFound("La pregunta no existe");
            }

            await _preguntaFlujo.Eliminar(IdPregunta);

            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> Obtener()
        {
            var resultado = await _preguntaFlujo.Obtener();

            if (!resultado.Any())
            {
                return NoContent();
            }

            return Ok(resultado);
        }

        [HttpGet("{IdPregunta}")]
        public async Task<IActionResult> Obtener([FromRoute] int IdPregunta)
        {
            var resultado = await _preguntaFlujo.Obtener(IdPregunta);

            if (resultado == null)
            {
                return NotFound("La pregunta no existe");
            }

            return Ok(resultado);
        }

        #endregion

        #region Helpers

        private async Task<bool> VerificarPreguntaExiste(int IdPregunta)
        {
            var resultadoPregunta = await _preguntaFlujo.Obtener(IdPregunta);

            return resultadoPregunta != null;
        }

        #endregion
    }
}
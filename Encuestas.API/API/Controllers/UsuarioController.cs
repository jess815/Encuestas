using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase, IUsuarioController
    {
        private IUsuarioFlujo _usuarioFlujo;
        private ILogger<UsuarioController> _logger;

        public UsuarioController(
            IUsuarioFlujo usuarioFlujo,
            ILogger<UsuarioController> logger)
        {
            _usuarioFlujo = usuarioFlujo;
            _logger = logger;
        }

        #region Operaciones CRUD

        [HttpPost]
        public async Task<IActionResult> Agregar(
            [FromBody] UsuarioRequest usuario)
        {
            var resultado = await _usuarioFlujo.Agregar(usuario);

            return CreatedAtAction(
                nameof(Obtener),
                new { IdUsuario = resultado },
                null);
        }

        [HttpPut("{IdUsuario}")]
        public async Task<IActionResult> Editar(
            [FromRoute] int IdUsuario,
            [FromBody] UsuarioRequest usuario)
        {
            if (!await VerificarUsuarioExiste(IdUsuario))
            {
                return NotFound("El usuario no existe");
            }

            var resultado = await _usuarioFlujo.Editar(
                IdUsuario,
                usuario);

            return Ok(resultado);
        }

        [HttpDelete("{IdUsuario}")]
        public async Task<IActionResult> Eliminar(
            [FromRoute] int IdUsuario)
        {
            if (!await VerificarUsuarioExiste(IdUsuario))
            {
                return NotFound("El usuario no existe");
            }

            await _usuarioFlujo.Eliminar(IdUsuario);

            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> Obtener()
        {
            var resultado = await _usuarioFlujo.Obtener();

            if (!resultado.Any())
            {
                return NoContent();
            }

            return Ok(resultado);
        }

        [HttpGet("{IdUsuario}")]
        public async Task<IActionResult> Obtener(
            [FromRoute] int IdUsuario)
        {
            var resultado =
                await _usuarioFlujo.Obtener(IdUsuario);

            if (resultado == null)
            {
                return NotFound("El usuario no existe");
            }

            return Ok(resultado);
        }

        #endregion

        #region Login

        [HttpPost("Login")]
        public async Task<IActionResult> Login(
            [FromBody] LoginRequest login)
        {
            var resultado = await _usuarioFlujo.Login(login);

            if (resultado == null)
            {
                return Unauthorized("Usuario o contraseña incorrectos");
            }

            return Ok(resultado);
        }

        #endregion

        #region Helpers

        private async Task<bool> VerificarUsuarioExiste(int IdUsuario)
        {
            var resultadoUsuario =
                await _usuarioFlujo.Obtener(IdUsuario);

            return resultadoUsuario != null;
        }

        #endregion
    }
}
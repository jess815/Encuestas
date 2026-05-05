using Abstracciones.Interfaces.API;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    //por cada metodo tenemois un route
    [Route("api/[controller]")]
    [ApiController]
    public class EncuestaController : ControllerBase, IEncuestaController
    //hereda de ControllerBase e implementa IVehiculoController
    {
        private IEncuestaFlujo _vehiculoFlujo;
        private ILogger<EncuestaController> _logger;
        //inyectamos las interfaces que utilizo en las capas en el program.cs
        public EncuestaController(IEncuestaFlujo vehiculoFlujo, ILogger<EncuestaController> logger)
        {
            _vehiculoFlujo = vehiculoFlujo;
            _logger = logger;
        }

        #region Operaciones/CRUD
        //la respuetsa del protocolo http sin exepciones es un codigo numerico
        //que metodo http es y que ruta va a tener (agregar)

        //no se pueden hacer return directamente, porque el tipo de datos que devolvemos en un api
        //es un action result que va de la mano con http, entonces creamos una variable para capturar el resultado
        //no olvidar poner los async en c/u

        [HttpPost]
        //en el postman se hace el post con el body (recordar ponerlo en body-raw)
        public async Task<IActionResult> Agregar([FromBody] EncuestaRequest vehiculo)
        {
            var resultado = await _vehiculoFlujo.Agregar(vehiculo);
            return CreatedAtAction(nameof(Obtener), new { Id = resultado }, null);
            //201
        }

        [HttpPut("{Id}")]

        //lo que especificamos que nos de el route, en este caso es el id que nos va a pedir
        //podemos especificar los diferentes url que puede tener un metodo
        public async Task<IActionResult> Editar([FromRoute] Guid Id, [FromBody] EncuestaRequest vehiculo)
        //aqui se puede usar Editar([FromRoute]... y funciona igual
        //si usamos Editar([FromQuery].. al ejecutarlo va a venir un id vacio, en el url se cambia para indicar que
        //viene vacio, en la url seria api/vehiculo ?= y el id pero este va a servir solo si quitamos el route que esta en HttpPut

        //aqui implementamos una validacion para saber que el vehiculo que queremos editar existe
        {
            if (!await VerificarVehiculoExiste(Id))
                return NotFound("El vehiculo no existe");
            var resultado = await _vehiculoFlujo.Editar(Id, vehiculo);
            return Ok(resultado);
            //200
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> Eliminar([FromRoute] Guid Id)
        {
            if (!await VerificarVehiculoExiste(Id))
                return NotFound("El vehiculo no existe");
            var resultado = await _vehiculoFlujo.Eliminar(Id);
            return NoContent();
            //204
        }

        //por medio del route le puedo cambiar el nombre, documentar mejor los endpoint, por ejemplo
        //[HttpGet("ObtenerTodos")] ahora la ruta seríahttps://localhost:7281/api/Vehiculo/ObtenerTodos
        //[HttpGet("/ObtenerTodos")] ahora la ruta seríahttps://localhost:7281/ObtenerTodos

        //obtener todos
        [HttpGet]
        public async Task<IActionResult> Obtener()
        {
            var resultado = await _vehiculoFlujo.Obtener();
            if (!resultado.Any())
                return NoContent();
            return Ok(resultado);
            //204 si no hay nada
            //lo ejecuto y copio el url y al pegarlo en postman deberia darme el mismo resultado
        }
        //se modifican porque tienen que tener parametros para poder diferencialo

        [HttpGet("{Id}")]
        public async Task<IActionResult> Obtener([FromRoute] Guid Id)
        {
            var resultado = await _vehiculoFlujo.Obtener(Id);
            return Ok(resultado);
        }
        //podemos ver todos estos endpoints en vista>otras ventanas> explorador de puntos de conexion
        #endregion Operaciones/CRUD

        #region Helpers
        private async Task<bool> VerificarVehiculoExiste(Guid Id)
        {
            var resultadoValidacion = false;
            var resultadoVehiculoExiste = await _vehiculoFlujo.Obtener(Id);
            if (resultadoVehiculoExiste != null)
                resultadoValidacion = true;
            return resultadoValidacion;
        }

        #endregion 
    }
}

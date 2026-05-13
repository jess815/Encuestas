using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;

namespace Flujo
{
    public class PreguntaFlujo : IPreguntaFlujo
    {
        private IPreguntaDA _preguntaDA;
        private IBitacoraDA _bitacoraDA;

        public PreguntaFlujo(
            IPreguntaDA preguntaDA,
            IBitacoraDA bitacoraDA)
        {
            _preguntaDA = preguntaDA;
            _bitacoraDA = bitacoraDA;
        }

        public async Task<int> Agregar(PreguntaRequest pregunta)
        {
            var resultado = await _preguntaDA.Agregar(pregunta);

            await _bitacoraDA.Agregar(new BitacoraRequest
            {
                IdUsuario = 1,
                Modulo = "Preguntas",
                Accion = "Creación de pregunta",
                Detalle = $"Se creó la pregunta: {pregunta.Texto}"
            });

            return resultado;
        }

        public async Task<int> Editar(int IdPregunta, PreguntaRequest pregunta)
        {
            var resultado =
                await _preguntaDA.Editar(IdPregunta, pregunta);

            await _bitacoraDA.Agregar(new BitacoraRequest
            {
                IdUsuario = 1,
                Modulo = "Preguntas",
                Accion = "Edición de pregunta",
                Detalle = $"Se editó la pregunta #{IdPregunta}"
            });

            return resultado;
        }

        public async Task<int> Eliminar(int IdPregunta)
        {
            var resultado =
                await _preguntaDA.Eliminar(IdPregunta);

            await _bitacoraDA.Agregar(new BitacoraRequest
            {
                IdUsuario = 1,
                Modulo = "Preguntas",
                Accion = "Eliminación de pregunta",
                Detalle = $"Se eliminó la pregunta #{IdPregunta}"
            });

            return resultado;
        }

        public async Task<IEnumerable<PreguntaResponse>> Obtener()
        {
            return await _preguntaDA.Obtener();
        }

        public async Task<PreguntaResponse> Obtener(int IdPregunta)
        {
            return await _preguntaDA.Obtener(IdPregunta);
        }
    }
}
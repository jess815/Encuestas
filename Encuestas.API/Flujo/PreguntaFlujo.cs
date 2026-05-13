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
            return await _preguntaDA.Editar(IdPregunta, pregunta);
        }

        public async Task<int> Eliminar(int IdPregunta)
        {
            return await _preguntaDA.Eliminar(IdPregunta);
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
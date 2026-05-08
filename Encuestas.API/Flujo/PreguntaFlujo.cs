using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;

namespace Flujo
{
    public class PreguntaFlujo : IPreguntaFlujo
    {
        private IPreguntaDA _preguntaDA;

        public PreguntaFlujo(IPreguntaDA preguntaDA)
        {
            _preguntaDA = preguntaDA;
        }

        public async Task<int> Agregar(PreguntaRequest pregunta)
        {
            return await _preguntaDA.Agregar(pregunta);
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
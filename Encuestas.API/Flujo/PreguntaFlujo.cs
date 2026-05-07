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

        public Task<int> Agregar(PreguntaRequest pregunta)
        {
            return _preguntaDA.Agregar(pregunta);
        }

        public Task<int> Editar(int IdPregunta, PreguntaRequest pregunta)
        {
            return _preguntaDA.Editar(IdPregunta, pregunta);
        }

        public Task<int> Eliminar(int IdPregunta)
        {
            return _preguntaDA.Eliminar(IdPregunta);
        }

        public Task<IEnumerable<PreguntaResponse>> Obtener()
        {
            return _preguntaDA.Obtener();
        }

        public Task<PreguntaResponse> Obtener(int IdPregunta)
        {
            return _preguntaDA.Obtener(IdPregunta);
        }
    }
}
using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.Flujo
{
    public interface IPreguntaFlujo
    {
        Task<IEnumerable<PreguntaResponse>> Obtener();

        Task<PreguntaResponse> Obtener(int IdPregunta);

        Task<int> Agregar(PreguntaRequest pregunta);

        Task<int> Editar(int IdPregunta, PreguntaRequest pregunta);

        Task<int> Eliminar(int IdPregunta);
    }
}
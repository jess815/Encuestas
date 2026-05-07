using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace Abstracciones.Interfaces.API
{
    public interface IPreguntaController
    {
        Task<IActionResult> Obtener();

        Task<IActionResult> Obtener(int IdPregunta);

        Task<IActionResult> Agregar(PreguntaRequest pregunta);

        Task<IActionResult> Editar(int IdPregunta, PreguntaRequest pregunta);

        Task<IActionResult> Eliminar(int IdPregunta);
    }
}
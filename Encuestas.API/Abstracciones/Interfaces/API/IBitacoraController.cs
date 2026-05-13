using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace Abstracciones.Interfaces.API
{
    public interface IBitacoraController
    {
        Task<IActionResult> Obtener();

        Task<IActionResult> Obtener(int IdBitacora);

        Task<IActionResult> Agregar(BitacoraRequest bitacora);
    }
}
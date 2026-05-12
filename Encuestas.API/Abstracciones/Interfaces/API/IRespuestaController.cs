using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abstracciones.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace Abstracciones.Interfaces.API
{
    public interface IRespuestaController
    {
        Task<IActionResult> Obtener();

        Task<IActionResult> Obtener(int IdRespuesta);

        Task<IActionResult> Agregar(RespuestaRequest respuesta);

        Task<IActionResult> Editar(int IdRespuesta, RespuestaRequest respuesta);

        Task<IActionResult> Eliminar(int IdRespuesta);
    }
}
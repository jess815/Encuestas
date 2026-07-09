using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.DA
{
    public interface IDashboardDA
    {
        Task<DashboardResponse> ObtenerDashboard(int idUsuario);
    }
}
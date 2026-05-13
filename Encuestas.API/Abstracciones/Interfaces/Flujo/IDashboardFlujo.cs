using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.Flujo
{
    public interface IDashboardFlujo
    {
        Task<DashboardResponse> ObtenerDashboard();
    }
}
using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;

namespace Flujo
{
    public class DashboardFlujo : IDashboardFlujo
    {
        private IDashboardDA _dashboardDA;

        public DashboardFlujo(IDashboardDA dashboardDA)
        {
            _dashboardDA = dashboardDA;
        }

        public async Task<DashboardResponse> ObtenerDashboard()
        {
            return await _dashboardDA.ObtenerDashboard();
        }
    }
}
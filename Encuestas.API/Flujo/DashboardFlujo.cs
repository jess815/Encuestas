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

        // obtiene los datos del dashboard segun el usuario
        public async Task<DashboardResponse> ObtenerDashboard(int idUsuario)
        {
            return await _dashboardDA.ObtenerDashboard(idUsuario);
        }
    }
}
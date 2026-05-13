using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Dapper;
using Microsoft.Data.SqlClient;

namespace DA
{
    public class DashboardDA : IDashboardDA
    {
        private IEncuestaDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public DashboardDA(IEncuestaDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }

        public async Task<DashboardResponse> ObtenerDashboard()
        {
            string query = @"SELECT
                                COUNT(*) AS CantidadEncuestas,
                                ISNULL(AVG(NotaGeneral), 0) AS PromedioGeneral,
                                SUM(CASE WHEN Alerta = 1 THEN 1 ELSE 0 END) AS CantidadAlertas,
                                SUM(CASE WHEN Comentario IS NOT NULL 
                                          AND Comentario <> '' 
                                         THEN 1 ELSE 0 END) AS CantidadComentarios
                            FROM Respuestas";

            var resultadoConsulta =
                await _sqlConnection.QueryFirstOrDefaultAsync<DashboardResponse>(query);

            return resultadoConsulta;
        }
    }
}
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

        // calcula el dashboard con las areas que puede ver el usuario
        public async Task<DashboardResponse> ObtenerDashboard(int idUsuario)
        {
            string query = @"
                SELECT
                    COUNT(*) AS CantidadEncuestas,
                    ISNULL(AVG(R.NotaGeneral), 0) AS PromedioGeneral,
                    ISNULL(
                        SUM(
                            CASE 
                                WHEN R.Alerta = 1 THEN 1 
                                ELSE 0 
                            END
                        ), 
                        0
                    ) AS CantidadAlertas,
                    ISNULL(
                        SUM(
                            CASE 
                                WHEN R.Comentario IS NOT NULL
                                     AND R.Comentario <> ''
                                THEN 1
                                ELSE 0
                            END
                        ),
                        0
                    ) AS CantidadComentarios
                FROM Respuestas R
                WHERE
                    EXISTS
                    (
                        SELECT 1
                        FROM Usuarios U
                        WHERE U.IdUsuario = @IdUsuario
                        AND U.Administrador = 1
                    )
                    OR
                    EXISTS
                    (
                        SELECT 1
                        FROM UsuarioArea UA
                        WHERE UA.IdUsuario = @IdUsuario
                        AND UA.IdArea = R.IdArea
                        AND UA.VerArea = 1
                    );";

            // envia el usuario para aplicar el filtro de areas
            var parametros = new
            {
                IdUsuario = idUsuario
            };

            var resultadoConsulta =
                await _sqlConnection
                    .QueryFirstOrDefaultAsync<DashboardResponse>(
                        query,
                        parametros
                    );

            return resultadoConsulta ?? new DashboardResponse();
        }
    }
}
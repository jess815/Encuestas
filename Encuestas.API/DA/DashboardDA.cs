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

        // calcula el dashboard segun las areas que tiene activas el usuario
        public async Task<DashboardResponse> ObtenerDashboard(int idUsuario)
        {
            string query = @"
                SELECT
                    COUNT(R.IdRespuesta) AS CantidadEncuestas,

                    ISNULL(
                        AVG(R.NotaGeneral),
                        0
                    ) AS PromedioGeneral,

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
                INNER JOIN Areas A
                    ON A.IdArea = R.IdArea
                INNER JOIN Usuarios U
                    ON U.IdUsuario = @IdUsuario
                WHERE
                    U.Activo = 1
                    AND
                    (
                        U.Administrador = 1

                        OR
                        (
                            A.Nombre = 'El Ceibo'
                            AND U.Ceibo = 1
                        )

                        OR
                        (
                            A.Nombre = 'Faroles'
                            AND U.Faroles = 1
                        )

                        OR
                        (
                            A.Nombre = 'Hoyo 19'
                            AND U.Hoyo19 = 1
                        )

                        OR
                        (
                            A.Nombre = 'Pin Rojo'
                            AND U.PinRojo = 1
                        )

                        OR
                        (
                            A.Nombre = 'Caña Brava'
                            AND U.CanaBrava = 1
                        )

                        OR
                        (
                            A.Nombre = 'Eventos'
                            AND U.Eventos = 1
                        )
                    );";

            // envia el usuario para aplicar sus permisos de areas
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
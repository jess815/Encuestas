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

        // obtiene la informacion general del dashboard
        public async Task<DashboardResponse> ObtenerDashboard(
            int idUsuario)
        {
            // consulta los datos principales del dashboard
            string queryResumen = @"
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

            // consulta las encuestas agrupadas por mes
            string queryEncuestasPorMes = @"
                SELECT
                    FORMAT(
                        R.FechaRespuesta,
                        'MMM yyyy',
                        'es-ES'
                    ) AS Mes,

                    COUNT(R.IdRespuesta) AS Cantidad

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
                    )

                GROUP BY
                    YEAR(R.FechaRespuesta),
                    MONTH(R.FechaRespuesta),
                    FORMAT(
                        R.FechaRespuesta,
                        'MMM yyyy',
                        'es-ES'
                    )

                ORDER BY
                    YEAR(R.FechaRespuesta),
                    MONTH(R.FechaRespuesta);";

            // consulta las cinco alertas mas recientes
            string queryUltimasAlertas = @"
                SELECT TOP 5
                    A.Nombre AS Area,
                    ISNULL(R.NotaGeneral, 0) AS Nota,
                    ISNULL(R.Comentario, '') AS Comentario,
                    R.FechaRespuesta AS Fecha

                FROM Respuestas R

                INNER JOIN Areas A
                    ON A.IdArea = R.IdArea

                INNER JOIN Usuarios U
                    ON U.IdUsuario = @IdUsuario

                WHERE
                    U.Activo = 1
                    AND R.Alerta = 1

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
                    )

                ORDER BY
                    R.FechaRespuesta DESC;";

            // envia el usuario para aplicar sus permisos
            var parametros = new
            {
                IdUsuario = idUsuario
            };

            // obtiene los datos principales
            var dashboard =
                await _sqlConnection
                    .QueryFirstOrDefaultAsync<DashboardResponse>(
                        queryResumen,
                        parametros
                    );

            // crea una respuesta vacia si no existen datos
            dashboard ??= new DashboardResponse();

            // obtiene la informacion del grafico por mes
            var encuestasPorMes =
                await _sqlConnection
                    .QueryAsync<DashboardMesResponse>(
                        queryEncuestasPorMes,
                        parametros
                    );

            // obtiene las alertas mas recientes
            var ultimasAlertas =
                await _sqlConnection
                    .QueryAsync<DashboardAlertaResponse>(
                        queryUltimasAlertas,
                        parametros
                    );

            // agrega las listas al resultado del dashboard
            dashboard.EncuestasPorMes =
                encuestasPorMes.ToList();

            dashboard.UltimasAlertas =
                ultimasAlertas.ToList();

            return dashboard;
        }
    }
}
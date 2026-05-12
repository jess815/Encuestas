using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Dapper;
using Microsoft.Data.SqlClient;

namespace DA
{
    public class RespuestaDA : IRespuestaDA
    {
        private IEncuestaDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public RespuestaDA(IEncuestaDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }

        public async Task<int> Agregar(RespuestaRequest respuesta)
        {
            string queryRespuesta = @"INSERT INTO Respuestas
                                    (IdArea, NombreSocio, Evento, FechaEvento,
                                     Comentario, NotaGeneral, Alerta)
                                    VALUES
                                    (@IdArea, @NombreSocio, @Evento, @FechaEvento,
                                     @Comentario, @NotaGeneral, @Alerta);

                                    SELECT CAST(SCOPE_IDENTITY() as int);";

            decimal notaGeneral = 0;
            bool alerta = false;

            if (respuesta.DetalleRespuestas != null && respuesta.DetalleRespuestas.Any())
            {
                notaGeneral = Convert.ToDecimal(
                    respuesta.DetalleRespuestas.Average(x => x.ValorCalculado));

                alerta = respuesta.DetalleRespuestas.Any(x =>
                    x.ValorCalculado <= 25);
            }

            if (!string.IsNullOrWhiteSpace(respuesta.Comentario))
            {
                alerta = true;
            }

            int idRespuesta = await _sqlConnection.ExecuteScalarAsync<int>(queryRespuesta, new
            {
                respuesta.IdArea,
                respuesta.NombreSocio,
                respuesta.Evento,
                respuesta.FechaEvento,
                respuesta.Comentario,
                NotaGeneral = notaGeneral,
                Alerta = alerta
            });

            if (respuesta.DetalleRespuestas != null)
            {
                foreach (var detalle in respuesta.DetalleRespuestas)
                {
                    string queryDetalle = @"INSERT INTO RespuestaDetalle
                                           (IdRespuesta, IdPregunta, IdOpcion, ValorCalculado)
                                           VALUES
                                           (@IdRespuesta, @IdPregunta, @IdOpcion, @ValorCalculado)";

                    await _sqlConnection.ExecuteAsync(queryDetalle, new
                    {
                        IdRespuesta = idRespuesta,
                        detalle.IdPregunta,
                        detalle.IdOpcion,
                        detalle.ValorCalculado
                    });
                }
            }

            return idRespuesta;
        }

        public async Task<int> Editar(int IdRespuesta, RespuestaRequest respuesta)
        {
            await verificarRespuestaExiste(IdRespuesta);

            string query = @"UPDATE Respuestas
                            SET IdArea = @IdArea,
                                NombreSocio = @NombreSocio,
                                Evento = @Evento,
                                FechaEvento = @FechaEvento,
                                Comentario = @Comentario,
                                NotaGeneral = @NotaGeneral,
                                Alerta = @Alerta
                            WHERE IdRespuesta = @IdRespuesta";

            await _sqlConnection.ExecuteAsync(query, new
            {
                IdRespuesta,
                respuesta.IdArea,
                respuesta.NombreSocio,
                respuesta.Evento,
                respuesta.FechaEvento,
                respuesta.Comentario,
                respuesta.NotaGeneral,
                respuesta.Alerta
            });

            return IdRespuesta;
        }

        public async Task<int> Eliminar(int IdRespuesta)
        {
            await verificarRespuestaExiste(IdRespuesta);

            string queryDetalle = @"DELETE FROM RespuestaDetalle
                                   WHERE IdRespuesta = @IdRespuesta";

            await _sqlConnection.ExecuteAsync(queryDetalle, new
            {
                IdRespuesta
            });

            string queryRespuesta = @"DELETE FROM Respuestas
                                     WHERE IdRespuesta = @IdRespuesta";

            await _sqlConnection.ExecuteAsync(queryRespuesta, new
            {
                IdRespuesta
            });

            return IdRespuesta;
        }

        public async Task<IEnumerable<RespuestaResponse>> Obtener()
        {
            string query = @"SELECT
                                r.IdRespuesta,
                                r.IdArea,
                                a.Nombre AS NombreArea,
                                r.NombreSocio,
                                r.Evento,
                                r.FechaEvento,
                                r.Comentario,
                                r.NotaGeneral,
                                r.Alerta,
                                r.FechaRespuesta
                            FROM Respuestas r
                            INNER JOIN Areas a
                                ON r.IdArea = a.IdArea";

            var resultadoConsulta = await _sqlConnection.QueryAsync<RespuestaResponse>(query);

            return resultadoConsulta;
        }

        public async Task<RespuestaResponse> Obtener(int IdRespuesta)
        {
            string queryRespuesta = @"SELECT
                                        r.IdRespuesta,
                                        r.IdArea,
                                        a.Nombre AS NombreArea,
                                        r.NombreSocio,
                                        r.Evento,
                                        r.FechaEvento,
                                        r.Comentario,
                                        r.NotaGeneral,
                                        r.Alerta,
                                        r.FechaRespuesta
                                    FROM Respuestas r
                                    INNER JOIN Areas a
                                        ON r.IdArea = a.IdArea
                                    WHERE r.IdRespuesta = @IdRespuesta";

            var respuesta = await _sqlConnection.QueryFirstOrDefaultAsync<RespuestaResponse>(
                queryRespuesta,
                new
                {
                    IdRespuesta
                });

            if (respuesta == null)
            {
                return null;
            }

            string queryDetalle = @"SELECT
                                        rd.IdRespuestaDetalle,
                                        rd.IdPregunta,
                                        p.Texto AS TextoPregunta,
                                        rd.IdOpcion,
                                        o.Texto AS TextoOpcion,
                                        rd.ValorCalculado
                                    FROM RespuestaDetalle rd
                                    INNER JOIN Preguntas p
                                        ON rd.IdPregunta = p.IdPregunta
                                    INNER JOIN Opciones o
                                        ON rd.IdOpcion = o.IdOpcion
                                    WHERE rd.IdRespuesta = @IdRespuesta";

            var detalle = await _sqlConnection.QueryAsync<RespuestaDetalleResponse>(
                queryDetalle,
                new
                {
                    IdRespuesta
                });

            respuesta.DetalleRespuestas = detalle.ToList();

            return respuesta;
        }

        private async Task verificarRespuestaExiste(int IdRespuesta)
        {
            RespuestaResponse resultadoRespuesta = await Obtener(IdRespuesta);

            if (resultadoRespuesta == null)
            {
                throw new Exception("La respuesta no existe");
            }
        }
    }
}
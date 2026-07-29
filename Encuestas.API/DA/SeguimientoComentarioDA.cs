using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Dapper;
using Microsoft.Data.SqlClient;

namespace DA
{
    public class SeguimientoComentarioDA : ISeguimientoComentarioDA
    {
        private IEncuestaDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        // recibe el repositorio para conectarse a la base de datos
        public SeguimientoComentarioDA(
            IEncuestaDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection =
                _repositorioDapper.ObtenerRepositorio();
        }

        // agrega un comentario al seguimiento
        public async Task<int> Agregar(
            SeguimientoComentarioRequest comentario)
        {
            string query = @"
                INSERT INTO SeguimientoComentarios
                (
                    IdSeguimiento,
                    IdUsuario,
                    Comentario
                )
                VALUES
                (
                    @IdSeguimiento,
                    @IdUsuario,
                    @Comentario
                );

                SELECT CAST(SCOPE_IDENTITY() AS INT);";

            var resultadoConsulta =
                await _sqlConnection.ExecuteScalarAsync<int>(
                    query,
                    new
                    {
                        comentario.IdSeguimiento,
                        comentario.IdUsuario,
                        comentario.Comentario
                    });

            return resultadoConsulta;
        }

        // edita solamente un comentario creado por el mismo usuario
        public async Task<int> Editar(
            int IdSeguimientoComentario,
            SeguimientoComentarioRequest comentario)
        {
            await verificarComentarioExiste(
                IdSeguimientoComentario
            );

            string query = @"
                UPDATE SeguimientoComentarios
                SET Comentario = @Comentario
                WHERE
                    IdSeguimientoComentario =
                        @IdSeguimientoComentario
                    AND IdUsuario = @IdUsuario;";

            var filasAfectadas =
                await _sqlConnection.ExecuteAsync(
                    query,
                    new
                    {
                        IdSeguimientoComentario,
                        comentario.IdUsuario,
                        comentario.Comentario
                    });

            // evita modificar comentarios de otro usuario
            if (filasAfectadas == 0)
            {
                throw new Exception(
                    "El usuario no puede editar este comentario"
                );
            }

            return IdSeguimientoComentario;
        }

        // elimina un comentario registrado
        public async Task<int> Eliminar(
            int IdSeguimientoComentario)
        {
            await verificarComentarioExiste(
                IdSeguimientoComentario
            );

            string query = @"
                DELETE FROM SeguimientoComentarios
                WHERE IdSeguimientoComentario =
                    @IdSeguimientoComentario;";

            await _sqlConnection.ExecuteAsync(
                query,
                new
                {
                    IdSeguimientoComentario
                });

            return IdSeguimientoComentario;
        }

        // obtiene todos los comentarios con el nombre del usuario
        public async Task<IEnumerable<SeguimientoComentarioResponse>>
            Obtener()
        {
            string query = @"
                SELECT
                    SC.IdSeguimientoComentario,
                    SC.IdSeguimiento,
                    SC.IdUsuario,
                    U.Nombre AS NombreUsuario,
                    SC.Comentario,
                    SC.FechaComentario
                FROM SeguimientoComentarios SC
                INNER JOIN Usuarios U
                    ON U.IdUsuario = SC.IdUsuario
                ORDER BY SC.FechaComentario DESC;";

            var resultadoConsulta =
                await _sqlConnection
                    .QueryAsync<SeguimientoComentarioResponse>(
                        query
                    );

            return resultadoConsulta;
        }

        // obtiene un comentario por su identificador
        public async Task<SeguimientoComentarioResponse> Obtener(
            int IdSeguimientoComentario)
        {
            string query = @"
                SELECT
                    SC.IdSeguimientoComentario,
                    SC.IdSeguimiento,
                    SC.IdUsuario,
                    U.Nombre AS NombreUsuario,
                    SC.Comentario,
                    SC.FechaComentario
                FROM SeguimientoComentarios SC
                INNER JOIN Usuarios U
                    ON U.IdUsuario = SC.IdUsuario
                WHERE SC.IdSeguimientoComentario =
                    @IdSeguimientoComentario;";

            var resultadoConsulta =
                await _sqlConnection
                    .QueryFirstOrDefaultAsync
                    <SeguimientoComentarioResponse>(
                        query,
                        new
                        {
                            IdSeguimientoComentario
                        });

            return resultadoConsulta;
        }

        // valida que el comentario exista
        private async Task verificarComentarioExiste(
            int IdSeguimientoComentario)
        {
            SeguimientoComentarioResponse resultadoComentario =
                await Obtener(IdSeguimientoComentario);

            if (resultadoComentario == null)
            {
                throw new Exception(
                    "El comentario no existe"
                );
            }
        }
    }
}
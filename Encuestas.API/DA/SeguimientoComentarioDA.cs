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

        public SeguimientoComentarioDA(IEncuestaDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }

        public async Task<int> Agregar(SeguimientoComentarioRequest comentario)
        {
            string query = @"INSERT INTO SeguimientoComentarios
                            (IdSeguimiento, IdUsuario, Comentario)
                            VALUES
                            (@IdSeguimiento, @IdUsuario, @Comentario);

                            SELECT CAST(SCOPE_IDENTITY() as int);";

            var resultadoConsulta = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                comentario.IdSeguimiento,
                comentario.IdUsuario,
                comentario.Comentario
            });

            return resultadoConsulta;
        }

        public async Task<int> Editar(
            int IdSeguimientoComentario,
            SeguimientoComentarioRequest comentario)
        {
            await verificarComentarioExiste(IdSeguimientoComentario);

            string query = @"UPDATE SeguimientoComentarios
                            SET Comentario = @Comentario
                            WHERE IdSeguimientoComentario = @IdSeguimientoComentario";

            await _sqlConnection.ExecuteAsync(query, new
            {
                IdSeguimientoComentario,
                comentario.Comentario
            });

            return IdSeguimientoComentario;
        }

        public async Task<int> Eliminar(int IdSeguimientoComentario)
        {
            await verificarComentarioExiste(IdSeguimientoComentario);

            string query = @"DELETE FROM SeguimientoComentarios
                            WHERE IdSeguimientoComentario = @IdSeguimientoComentario";

            await _sqlConnection.ExecuteAsync(query, new
            {
                IdSeguimientoComentario
            });

            return IdSeguimientoComentario;
        }

        public async Task<IEnumerable<SeguimientoComentarioResponse>> Obtener()
        {
            string query = @"SELECT
                                IdSeguimientoComentario,
                                IdSeguimiento,
                                IdUsuario,
                                Comentario,
                                FechaComentario
                            FROM SeguimientoComentarios";

            var resultadoConsulta = await _sqlConnection.QueryAsync<SeguimientoComentarioResponse>(query);

            return resultadoConsulta;
        }

        public async Task<SeguimientoComentarioResponse> Obtener(int IdSeguimientoComentario)
        {
            string query = @"SELECT
                                IdSeguimientoComentario,
                                IdSeguimiento,
                                IdUsuario,
                                Comentario,
                                FechaComentario
                            FROM SeguimientoComentarios
                            WHERE IdSeguimientoComentario = @IdSeguimientoComentario";

            var resultadoConsulta = await _sqlConnection.QueryFirstOrDefaultAsync<SeguimientoComentarioResponse>(
                query,
                new
                {
                    IdSeguimientoComentario
                });

            return resultadoConsulta;
        }

        private async Task verificarComentarioExiste(int IdSeguimientoComentario)
        {
            SeguimientoComentarioResponse resultadoComentario =
                await Obtener(IdSeguimientoComentario);

            if (resultadoComentario == null)
            {
                throw new Exception("El comentario no existe");
            }
        }
    }
}
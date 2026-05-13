using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Dapper;
using Microsoft.Data.SqlClient;

namespace DA
{
    public class UsuarioAreaDA : IUsuarioAreaDA
    {
        private IEncuestaDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public UsuarioAreaDA(IEncuestaDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }

        public async Task<int> Agregar(UsuarioAreaRequest usuarioArea)
        {
            string query = @"INSERT INTO UsuarioArea
                            (IdUsuario, IdArea, VerArea)
                            VALUES
                            (@IdUsuario, @IdArea, @VerArea);

                            SELECT CAST(SCOPE_IDENTITY() as int);";

            var resultadoConsulta = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                usuarioArea.IdUsuario,
                usuarioArea.IdArea,
                usuarioArea.VerArea
            });

            return resultadoConsulta;
        }

        public async Task<int> Editar(int IdUsuarioArea, UsuarioAreaRequest usuarioArea)
        {
            await verificarUsuarioAreaExiste(IdUsuarioArea);

            string query = @"UPDATE UsuarioArea
                            SET IdUsuario = @IdUsuario,
                                IdArea = @IdArea,
                                VerArea = @VerArea
                            WHERE IdUsuarioArea = @IdUsuarioArea";

            await _sqlConnection.ExecuteAsync(query, new
            {
                IdUsuarioArea,
                usuarioArea.IdUsuario,
                usuarioArea.IdArea,
                usuarioArea.VerArea
            });

            return IdUsuarioArea;
        }

        public async Task<int> Eliminar(int IdUsuarioArea)
        {
            await verificarUsuarioAreaExiste(IdUsuarioArea);

            string query = @"DELETE FROM UsuarioArea
                            WHERE IdUsuarioArea = @IdUsuarioArea";

            await _sqlConnection.ExecuteAsync(query, new
            {
                IdUsuarioArea
            });

            return IdUsuarioArea;
        }

        public async Task<IEnumerable<UsuarioAreaResponse>> Obtener()
        {
            string query = @"SELECT
                                ua.IdUsuarioArea,
                                ua.IdUsuario,
                                u.Nombre AS NombreUsuario,
                                ua.IdArea,
                                a.Nombre AS NombreArea,
                                ua.VerArea
                            FROM UsuarioArea ua
                            INNER JOIN Usuarios u
                                ON ua.IdUsuario = u.IdUsuario
                            INNER JOIN Areas a
                                ON ua.IdArea = a.IdArea";

            var resultadoConsulta =
                await _sqlConnection.QueryAsync<UsuarioAreaResponse>(query);

            return resultadoConsulta;
        }

        public async Task<UsuarioAreaResponse> Obtener(int IdUsuarioArea)
        {
            string query = @"SELECT
                                ua.IdUsuarioArea,
                                ua.IdUsuario,
                                u.Nombre AS NombreUsuario,
                                ua.IdArea,
                                a.Nombre AS NombreArea,
                                ua.VerArea
                            FROM UsuarioArea ua
                            INNER JOIN Usuarios u
                                ON ua.IdUsuario = u.IdUsuario
                            INNER JOIN Areas a
                                ON ua.IdArea = a.IdArea
                            WHERE ua.IdUsuarioArea = @IdUsuarioArea";

            var resultadoConsulta =
                await _sqlConnection.QueryFirstOrDefaultAsync<UsuarioAreaResponse>(
                    query,
                    new
                    {
                        IdUsuarioArea
                    });

            return resultadoConsulta;
        }

        private async Task verificarUsuarioAreaExiste(int IdUsuarioArea)
        {
            UsuarioAreaResponse resultadoUsuarioArea =
                await Obtener(IdUsuarioArea);

            if (resultadoUsuarioArea == null)
            {
                throw new Exception("La relación usuario área no existe");
            }
        }
    }
}
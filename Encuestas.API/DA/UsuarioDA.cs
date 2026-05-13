using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Dapper;
using Microsoft.Data.SqlClient;

namespace DA
{
    public class UsuarioDA : IUsuarioDA
    {
        private IEncuestaDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public UsuarioDA(IEncuestaDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }

        public async Task<int> Agregar(UsuarioRequest usuario)
        {
            string query = @"INSERT INTO Usuarios
                            (Nombre, Usuario, PasswordHash,
                             Administrador, EditaEncuesta,
                             ExportaExcel, Activo)
                            VALUES
                            (@Nombre, @Usuario, @PasswordHash,
                             @Administrador, @EditaEncuesta,
                             @ExportaExcel, @Activo);

                            SELECT CAST(SCOPE_IDENTITY() as int);";

            var resultadoConsulta = await _sqlConnection.ExecuteScalarAsync<int>(
                query,
                new
                {
                    usuario.Nombre,
                    usuario.Usuario,
                    usuario.PasswordHash,
                    usuario.Administrador,
                    usuario.EditaEncuesta,
                    usuario.ExportaExcel,
                    usuario.Activo
                });

            return resultadoConsulta;
        }

        public async Task<int> Editar(int IdUsuario, UsuarioRequest usuario)
        {
            await verificarUsuarioExiste(IdUsuario);

            string query = @"UPDATE Usuarios
                            SET Nombre = @Nombre,
                                Usuario = @Usuario,
                                PasswordHash = @PasswordHash,
                                Administrador = @Administrador,
                                EditaEncuesta = @EditaEncuesta,
                                ExportaExcel = @ExportaExcel,
                                Activo = @Activo
                            WHERE IdUsuario = @IdUsuario";

            await _sqlConnection.ExecuteAsync(
                query,
                new
                {
                    IdUsuario,
                    usuario.Nombre,
                    usuario.Usuario,
                    usuario.PasswordHash,
                    usuario.Administrador,
                    usuario.EditaEncuesta,
                    usuario.ExportaExcel,
                    usuario.Activo
                });

            return IdUsuario;
        }

        public async Task<int> Eliminar(int IdUsuario)
        {
            await verificarUsuarioExiste(IdUsuario);

            string query = @"DELETE FROM Usuarios
                            WHERE IdUsuario = @IdUsuario";

            await _sqlConnection.ExecuteAsync(
                query,
                new
                {
                    IdUsuario
                });

            return IdUsuario;
        }

        public async Task<IEnumerable<UsuarioResponse>> Obtener()
        {
            string query = @"SELECT
                                IdUsuario,
                                Nombre,
                                Usuario,
                                PasswordHash,
                                Administrador,
                                EditaEncuesta,
                                ExportaExcel,
                                Activo
                            FROM Usuarios";

            var resultadoConsulta =
                await _sqlConnection.QueryAsync<UsuarioResponse>(query);

            return resultadoConsulta;
        }

        public async Task<UsuarioResponse> Obtener(int IdUsuario)
        {
            string query = @"SELECT
                                IdUsuario,
                                Nombre,
                                Usuario,
                                PasswordHash,
                                Administrador,
                                EditaEncuesta,
                                ExportaExcel,
                                Activo
                            FROM Usuarios
                            WHERE IdUsuario = @IdUsuario";

            var resultadoConsulta =
                await _sqlConnection.QueryFirstOrDefaultAsync<UsuarioResponse>(
                    query,
                    new
                    {
                        IdUsuario
                    });

            return resultadoConsulta;
        }

        public async Task<UsuarioResponse> Login(LoginRequest login)
        {
            string query = @"SELECT
                                IdUsuario,
                                Nombre,
                                Usuario,
                                PasswordHash,
                                Administrador,
                                EditaEncuesta,
                                ExportaExcel,
                                Activo
                            FROM Usuarios
                            WHERE Usuario = @Usuario
                              AND PasswordHash = @Password
                              AND Activo = 1";

            var resultadoConsulta =
                await _sqlConnection.QueryFirstOrDefaultAsync<UsuarioResponse>(
                    query,
                    new
                    {
                        login.Usuario,
                        login.Password
                    });

            return resultadoConsulta;
        }

        private async Task verificarUsuarioExiste(int IdUsuario)
        {
            UsuarioResponse resultadoUsuario =
                await Obtener(IdUsuario);

            if (resultadoUsuario == null)
            {
                throw new Exception("El usuario no existe");
            }
        }
    }
}
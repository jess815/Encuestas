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

        // agrega un usuario con sus permisos y areas
        public async Task<int> Agregar(UsuarioRequest usuario)
        {
            string query = @"INSERT INTO Usuarios
                            (
                                Nombre,
                                Usuario,
                                PasswordHash,
                                Administrador,
                                EditaEncuesta,
                                ExportaExcel,
                                Ceibo,
                                Faroles,
                                Hoyo19,
                                PinRojo,
                                CanaBrava,
                                Eventos,
                                Activo
                            )
                            VALUES
                            (
                                @Nombre,
                                @Usuario,
                                @PasswordHash,
                                @Administrador,
                                @EditaEncuesta,
                                @ExportaExcel,
                                @Ceibo,
                                @Faroles,
                                @Hoyo19,
                                @PinRojo,
                                @CanaBrava,
                                @Eventos,
                                @Activo
                            );

                            SELECT CAST(SCOPE_IDENTITY() as int);";

            var resultadoConsulta =
                await _sqlConnection.ExecuteScalarAsync<int>(
                    query,
                    new
                    {
                        usuario.Nombre,
                        usuario.Usuario,
                        usuario.PasswordHash,
                        usuario.Administrador,
                        usuario.EditaEncuesta,
                        usuario.ExportaExcel,
                        usuario.Ceibo,
                        usuario.Faroles,
                        usuario.Hoyo19,
                        usuario.PinRojo,
                        usuario.CanaBrava,
                        usuario.Eventos,
                        usuario.Activo
                    });

            return resultadoConsulta;
        }

        // edita los datos permisos y areas del usuario
        public async Task<int> Editar(
            int IdUsuario,
            UsuarioRequest usuario)
        {
            await verificarUsuarioExiste(IdUsuario);

            string query = @"UPDATE Usuarios
                            SET Nombre = @Nombre,
                                Usuario = @Usuario,
                                PasswordHash = @PasswordHash,
                                Administrador = @Administrador,
                                EditaEncuesta = @EditaEncuesta,
                                ExportaExcel = @ExportaExcel,
                                Ceibo = @Ceibo,
                                Faroles = @Faroles,
                                Hoyo19 = @Hoyo19,
                                PinRojo = @PinRojo,
                                CanaBrava = @CanaBrava,
                                Eventos = @Eventos,
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
                    usuario.Ceibo,
                    usuario.Faroles,
                    usuario.Hoyo19,
                    usuario.PinRojo,
                    usuario.CanaBrava,
                    usuario.Eventos,
                    usuario.Activo
                });

            return IdUsuario;
        }

        // elimina un usuario registrado
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

        // obtiene todos los usuarios con sus permisos y areas
        public async Task<IEnumerable<UsuarioResponse>> Obtener()
        {
            string query = @"SELECT
                                IdUsuario,
                                Nombre,
                                Usuario,
                                Administrador,
                                EditaEncuesta,
                                ExportaExcel,
                                Ceibo,
                                Faroles,
                                Hoyo19,
                                PinRojo,
                                CanaBrava,
                                Eventos,
                                Activo
                            FROM Usuarios";

            var resultadoConsulta =
                await _sqlConnection.QueryAsync<UsuarioResponse>(
                    query
                );

            return resultadoConsulta;
        }

        // obtiene un usuario por su id
        public async Task<UsuarioResponse> Obtener(int IdUsuario)
        {
            string query = @"SELECT
                                IdUsuario,
                                Nombre,
                                Usuario,
                                Administrador,
                                EditaEncuesta,
                                ExportaExcel,
                                Ceibo,
                                Faroles,
                                Hoyo19,
                                PinRojo,
                                CanaBrava,
                                Eventos,
                                Activo
                            FROM Usuarios
                            WHERE IdUsuario = @IdUsuario";

            var resultadoConsulta =
                await _sqlConnection
                    .QueryFirstOrDefaultAsync<UsuarioResponse>(
                        query,
                        new
                        {
                            IdUsuario
                        });

            return resultadoConsulta;
        }

        // valida los datos para iniciar sesion
        public async Task<UsuarioResponse> Login(LoginRequest login)
        {
            string query = @"SELECT
                                IdUsuario,
                                Nombre,
                                Usuario,
                                Administrador,
                                EditaEncuesta,
                                ExportaExcel,
                                Ceibo,
                                Faroles,
                                Hoyo19,
                                PinRojo,
                                CanaBrava,
                                Eventos,
                                Activo
                            FROM Usuarios
                            WHERE Usuario = @Usuario
                              AND PasswordHash = @Password
                              AND Activo = 1";

            var resultadoConsulta =
                await _sqlConnection
                    .QueryFirstOrDefaultAsync<UsuarioResponse>(
                        query,
                        new
                        {
                            login.Usuario,
                            login.Password
                        });

            return resultadoConsulta;
        }

        // revisa que el usuario exista antes de modificarlo
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
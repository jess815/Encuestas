using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Dapper;
using Microsoft.Data.SqlClient;

namespace DA
{
    public class SeguimientoDA : ISeguimientoDA
    {
        private IEncuestaDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public SeguimientoDA(IEncuestaDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }

        public async Task<int> Agregar(SeguimientoRequest seguimiento)
        {
            string query = @"INSERT INTO Seguimientos
                            (IdRespuesta, Estado)
                            VALUES
                            (@IdRespuesta, @Estado);

                            SELECT CAST(SCOPE_IDENTITY() as int);";

            var resultadoConsulta = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                seguimiento.IdRespuesta,
                seguimiento.Estado
            });

            return resultadoConsulta;
        }

        public async Task<int> Editar(int IdSeguimiento, SeguimientoRequest seguimiento)
        {
            await verificarSeguimientoExiste(IdSeguimiento);

            string query = @"UPDATE Seguimientos
                            SET Estado = @Estado
                            WHERE IdSeguimiento = @IdSeguimiento";

            await _sqlConnection.ExecuteAsync(query, new
            {
                IdSeguimiento,
                seguimiento.Estado
            });

            return IdSeguimiento;
        }

        public async Task<int> Eliminar(int IdSeguimiento)
        {
            await verificarSeguimientoExiste(IdSeguimiento);

            string query = @"DELETE FROM Seguimientos
                            WHERE IdSeguimiento = @IdSeguimiento";

            await _sqlConnection.ExecuteAsync(query, new
            {
                IdSeguimiento
            });

            return IdSeguimiento;
        }

        public async Task<IEnumerable<SeguimientoResponse>> Obtener()
        {
            string query = @"SELECT
                                IdSeguimiento,
                                IdRespuesta,
                                Estado,
                                FechaCreacion,
                                FechaResolucion
                            FROM Seguimientos";

            var resultadoConsulta = await _sqlConnection.QueryAsync<SeguimientoResponse>(query);

            return resultadoConsulta;
        }

        public async Task<SeguimientoResponse> Obtener(int IdSeguimiento)
        {
            string query = @"SELECT
                                IdSeguimiento,
                                IdRespuesta,
                                Estado,
                                FechaCreacion,
                                FechaResolucion
                            FROM Seguimientos
                            WHERE IdSeguimiento = @IdSeguimiento";

            var resultadoConsulta = await _sqlConnection.QueryFirstOrDefaultAsync<SeguimientoResponse>(query, new
            {
                IdSeguimiento
            });

            return resultadoConsulta;
        }

        private async Task verificarSeguimientoExiste(int IdSeguimiento)
        {
            SeguimientoResponse resultadoSeguimiento = await Obtener(IdSeguimiento);

            if (resultadoSeguimiento == null)
            {
                throw new Exception("El seguimiento no existe");
            }
        }
    }
}
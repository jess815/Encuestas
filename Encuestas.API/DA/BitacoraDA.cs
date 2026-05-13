using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Dapper;
using Microsoft.Data.SqlClient;

namespace DA
{
    public class BitacoraDA : IBitacoraDA
    {
        private IEncuestaDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public BitacoraDA(IEncuestaDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }

        public async Task<int> Agregar(BitacoraRequest bitacora)
        {
            string query = @"INSERT INTO Bitacora
                            (IdUsuario, Modulo, Accion, Detalle)
                            VALUES
                            (@IdUsuario, @Modulo, @Accion, @Detalle);

                            SELECT CAST(SCOPE_IDENTITY() as int);";

            var resultadoConsulta = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                bitacora.IdUsuario,
                bitacora.Modulo,
                bitacora.Accion,
                bitacora.Detalle
            });

            return resultadoConsulta;
        }

        public async Task<IEnumerable<BitacoraResponse>> Obtener()
        {
            string query = @"SELECT
                                b.IdBitacora,
                                b.IdUsuario,
                                u.Nombre AS NombreUsuario,
                                b.Modulo,
                                b.Accion,
                                b.Detalle,
                                b.FechaAccion
                            FROM Bitacora b
                            INNER JOIN Usuarios u
                                ON b.IdUsuario = u.IdUsuario
                            ORDER BY b.FechaAccion DESC";

            var resultadoConsulta =
                await _sqlConnection.QueryAsync<BitacoraResponse>(query);

            return resultadoConsulta;
        }

        public async Task<BitacoraResponse> Obtener(int IdBitacora)
        {
            string query = @"SELECT
                                b.IdBitacora,
                                b.IdUsuario,
                                u.Nombre AS NombreUsuario,
                                b.Modulo,
                                b.Accion,
                                b.Detalle,
                                b.FechaAccion
                            FROM Bitacora b
                            INNER JOIN Usuarios u
                                ON b.IdUsuario = u.IdUsuario
                            WHERE b.IdBitacora = @IdBitacora";

            var resultadoConsulta =
                await _sqlConnection.QueryFirstOrDefaultAsync<BitacoraResponse>(
                    query,
                    new
                    {
                        IdBitacora
                    });

            return resultadoConsulta;
        }
    }
}
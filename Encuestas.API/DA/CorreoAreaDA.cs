using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Dapper;
using Microsoft.Data.SqlClient;

namespace DA
{
    public class CorreoAreaDA : ICorreoAreaDA
    {
        private IEncuestaDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public CorreoAreaDA(IEncuestaDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }

        public async Task<int> Agregar(CorreoAreaRequest correoArea)
        {
            string query = @"INSERT INTO CorreosArea
                            (IdArea, Correo, Activo)
                            VALUES
                            (@IdArea, @Correo, @Activo);

                            SELECT CAST(SCOPE_IDENTITY() as int);";

            var resultadoConsulta = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                correoArea.IdArea,
                correoArea.Correo,
                correoArea.Activo
            });

            return resultadoConsulta;
        }

        public async Task<int> Editar(int IdCorreoArea, CorreoAreaRequest correoArea)
        {
            await verificarCorreoAreaExiste(IdCorreoArea);

            string query = @"UPDATE CorreosArea
                            SET IdArea = @IdArea,
                                Correo = @Correo,
                                Activo = @Activo
                            WHERE IdCorreoArea = @IdCorreoArea";

            await _sqlConnection.ExecuteAsync(query, new
            {
                IdCorreoArea,
                correoArea.IdArea,
                correoArea.Correo,
                correoArea.Activo
            });

            return IdCorreoArea;
        }

        public async Task<int> Eliminar(int IdCorreoArea)
        {
            await verificarCorreoAreaExiste(IdCorreoArea);

            string query = @"DELETE FROM CorreosArea
                            WHERE IdCorreoArea = @IdCorreoArea";

            await _sqlConnection.ExecuteAsync(query, new
            {
                IdCorreoArea
            });

            return IdCorreoArea;
        }

        public async Task<IEnumerable<CorreoAreaResponse>> Obtener()
        {
            string query = @"SELECT
                                ca.IdCorreoArea,
                                ca.IdArea,
                                a.Nombre AS NombreArea,
                                ca.Correo,
                                ca.Activo
                            FROM CorreosArea ca
                            INNER JOIN Areas a
                                ON ca.IdArea = a.IdArea";

            var resultadoConsulta =
                await _sqlConnection.QueryAsync<CorreoAreaResponse>(query);

            return resultadoConsulta;
        }

        public async Task<CorreoAreaResponse> Obtener(int IdCorreoArea)
        {
            string query = @"SELECT
                                ca.IdCorreoArea,
                                ca.IdArea,
                                a.Nombre AS NombreArea,
                                ca.Correo,
                                ca.Activo
                            FROM CorreosArea ca
                            INNER JOIN Areas a
                                ON ca.IdArea = a.IdArea
                            WHERE ca.IdCorreoArea = @IdCorreoArea";

            var resultadoConsulta =
                await _sqlConnection.QueryFirstOrDefaultAsync<CorreoAreaResponse>(
                    query,
                    new
                    {
                        IdCorreoArea
                    });

            return resultadoConsulta;
        }

        private async Task verificarCorreoAreaExiste(int IdCorreoArea)
        {
            CorreoAreaResponse resultadoCorreoArea =
                await Obtener(IdCorreoArea);

            if (resultadoCorreoArea == null)
            {
                throw new Exception("El correo del área no existe");
            }
        }
    }
}
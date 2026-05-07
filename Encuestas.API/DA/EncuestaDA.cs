using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Dapper;
using Microsoft.Data.SqlClient;

namespace DA
{
    public class EncuestaDA : IEncuestaDA
    {
        private IEncuestaDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public EncuestaDA(IEncuestaDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }

        public async Task<int> Agregar(AreaRequest area)
        {
            string query = @"INSERT INTO Areas
                            (Nombre, Tipo, Activo)
                            VALUES
                            (@Nombre, @Tipo, @Activo);

                            SELECT CAST(SCOPE_IDENTITY() as int);";

            var resultadoConsulta = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                area.Nombre,
                area.Tipo,
                area.Activo
            });

            return resultadoConsulta;
        }

        public async Task<int> Editar(int IdArea, AreaRequest area)
        {
            await verificarAreaExiste(IdArea);

            string query = @"UPDATE Areas
                            SET Nombre = @Nombre,
                                Tipo = @Tipo,
                                Activo = @Activo
                            WHERE IdArea = @IdArea";

            await _sqlConnection.ExecuteAsync(query, new
            {
                IdArea,
                area.Nombre,
                area.Tipo,
                area.Activo
            });

            return IdArea;
        }

        public async Task<int> Eliminar(int IdArea)
        {
            await verificarAreaExiste(IdArea);

            string query = @"DELETE FROM Areas
                            WHERE IdArea = @IdArea";

            await _sqlConnection.ExecuteAsync(query, new
            {
                IdArea
            });

            return IdArea;
        }

        public async Task<IEnumerable<AreaResponse>> Obtener()
        {
            string query = @"SELECT *
                            FROM Areas";

            var resultadoConsulta = await _sqlConnection.QueryAsync<AreaResponse>(query);

            return resultadoConsulta;
        }

        public async Task<AreaResponse> Obtener(int IdArea)
        {
            string query = @"SELECT *
                            FROM Areas
                            WHERE IdArea = @IdArea";

            var resultadoConsulta = await _sqlConnection.QueryFirstOrDefaultAsync<AreaResponse>(query, new
            {
                IdArea
            });

            return resultadoConsulta;
        }

        private async Task verificarAreaExiste(int IdArea)
        {
            AreaResponse resultadoConsultaArea = await Obtener(IdArea);

            if (resultadoConsultaArea == null)
            {
                throw new Exception("El área no existe");
            }
        }
    }
}
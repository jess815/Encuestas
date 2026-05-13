using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Dapper;
using Microsoft.Data.SqlClient;

namespace DA
{
    public class OpcionDA : IOpcionDA
    {
        private IEncuestaDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public OpcionDA(IEncuestaDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }

        public async Task<int> Agregar(OpcionRequest opcion)
        {
            string query = @"INSERT INTO Opciones
                            (Texto, Valor, OrdenVisual, Activo)
                            VALUES
                            (@Texto, @Valor, @OrdenVisual, @Activo);

                            SELECT CAST(SCOPE_IDENTITY() as int);";

            var resultadoConsulta = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                opcion.Texto,
                opcion.Valor,
                opcion.OrdenVisual,
                opcion.Activo
            });

            return resultadoConsulta;
        }

        public async Task<int> Editar(int IdOpcion, OpcionRequest opcion)
        {
            await verificarOpcionExiste(IdOpcion);

            string query = @"UPDATE Opciones
                            SET Texto = @Texto,
                                Valor = @Valor,
                                OrdenVisual = @OrdenVisual,
                                Activo = @Activo
                            WHERE IdOpcion = @IdOpcion";

            await _sqlConnection.ExecuteAsync(query, new
            {
                IdOpcion,
                opcion.Texto,
                opcion.Valor,
                opcion.OrdenVisual,
                opcion.Activo
            });

            return IdOpcion;
        }

        public async Task<int> Eliminar(int IdOpcion)
        {
            await verificarOpcionExiste(IdOpcion);

            string query = @"DELETE FROM Opciones
                            WHERE IdOpcion = @IdOpcion";

            await _sqlConnection.ExecuteAsync(query, new
            {
                IdOpcion
            });

            return IdOpcion;
        }

        public async Task<IEnumerable<OpcionResponse>> Obtener()
        {
            string query = @"SELECT
                                IdOpcion,
                                Texto,
                                Valor,
                                OrdenVisual,
                                Activo
                            FROM Opciones
                            ORDER BY OrdenVisual";

            var resultadoConsulta = await _sqlConnection.QueryAsync<OpcionResponse>(query);

            return resultadoConsulta;
        }

        public async Task<OpcionResponse> Obtener(int IdOpcion)
        {
            string query = @"SELECT
                                IdOpcion,
                                Texto,
                                Valor,
                                OrdenVisual,
                                Activo
                            FROM Opciones
                            WHERE IdOpcion = @IdOpcion";

            var resultadoConsulta = await _sqlConnection.QueryFirstOrDefaultAsync<OpcionResponse>(
                query,
                new
                {
                    IdOpcion
                });

            return resultadoConsulta;
        }

        private async Task verificarOpcionExiste(int IdOpcion)
        {
            OpcionResponse resultadoOpcion = await Obtener(IdOpcion);

            if (resultadoOpcion == null)
            {
                throw new Exception("La opción no existe");
            }
        }
    }
}
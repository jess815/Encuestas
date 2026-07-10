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

        // agrega un area con sus correos configurados
        public async Task<int> Agregar(AreaRequest area)
        {
            string query = @"INSERT INTO Areas
                            (
                                Nombre,
                                Tipo,
                                CorreoGeneral,
                                CorreoArea,
                                Activo
                            )
                            VALUES
                            (
                                @Nombre,
                                @Tipo,
                                @CorreoGeneral,
                                @CorreoArea,
                                @Activo
                            );

                            SELECT CAST(SCOPE_IDENTITY() as int);";

            var resultadoConsulta =
                await _sqlConnection.ExecuteScalarAsync<int>(
                    query,
                    new
                    {
                        area.Nombre,
                        area.Tipo,
                        area.CorreoGeneral,
                        area.CorreoArea,
                        area.Activo
                    });

            return resultadoConsulta;
        }

        // edita los datos y correos del area
        public async Task<int> Editar(
            int IdArea,
            AreaRequest area)
        {
            await verificarAreaExiste(IdArea);

            string query = @"UPDATE Areas
                            SET Nombre = @Nombre,
                                Tipo = @Tipo,
                                CorreoGeneral = @CorreoGeneral,
                                CorreoArea = @CorreoArea,
                                Activo = @Activo
                            WHERE IdArea = @IdArea";

            await _sqlConnection.ExecuteAsync(
                query,
                new
                {
                    IdArea,
                    area.Nombre,
                    area.Tipo,
                    area.CorreoGeneral,
                    area.CorreoArea,
                    area.Activo
                });

            return IdArea;
        }

        // elimina un area registrada
        public async Task<int> Eliminar(int IdArea)
        {
            await verificarAreaExiste(IdArea);

            string query = @"DELETE FROM Areas
                            WHERE IdArea = @IdArea";

            await _sqlConnection.ExecuteAsync(
                query,
                new
                {
                    IdArea
                });

            return IdArea;
        }

        // obtiene todas las areas
        public async Task<IEnumerable<AreaResponse>> Obtener()
        {
            string query = @"SELECT
                                IdArea,
                                Nombre,
                                Tipo,
                                CorreoGeneral,
                                CorreoArea,
                                Activo
                            FROM Areas";

            var resultadoConsulta =
                await _sqlConnection.QueryAsync<AreaResponse>(
                    query
                );

            return resultadoConsulta;
        }

        // obtiene un area por su id
        public async Task<AreaResponse> Obtener(int IdArea)
        {
            string query = @"SELECT
                                IdArea,
                                Nombre,
                                Tipo,
                                CorreoGeneral,
                                CorreoArea,
                                Activo
                            FROM Areas
                            WHERE IdArea = @IdArea";

            var resultadoConsulta =
                await _sqlConnection
                    .QueryFirstOrDefaultAsync<AreaResponse>(
                        query,
                        new
                        {
                            IdArea
                        });

            return resultadoConsulta;
        }

        // revisa que el area exista antes de modificarla
        private async Task verificarAreaExiste(int IdArea)
        {
            AreaResponse resultadoConsultaArea =
                await Obtener(IdArea);

            if (resultadoConsultaArea == null)
            {
                throw new Exception("El área no existe");
            }
        }
    }
}
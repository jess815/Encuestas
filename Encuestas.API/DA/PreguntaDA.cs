using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Dapper;
using Microsoft.Data.SqlClient;

namespace DA
{
    public class PreguntaDA : IPreguntaDA
    {
        private IEncuestaDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        public PreguntaDA(IEncuestaDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }

        public async Task<int> Agregar(PreguntaRequest pregunta)
        {
            string query = @"INSERT INTO Preguntas
                            (IdArea, Texto, OrdenPregunta, Activo)
                            VALUES
                            (@IdArea, @Texto, @OrdenPregunta, @Activo);

                            SELECT CAST(SCOPE_IDENTITY() as int);";

            var resultadoConsulta = await _sqlConnection.ExecuteScalarAsync<int>(query, new
            {
                pregunta.IdArea,
                pregunta.Texto,
                pregunta.OrdenPregunta,
                pregunta.Activo
            });

            return resultadoConsulta;
        }

        public async Task<int> Editar(int IdPregunta, PreguntaRequest pregunta)
        {
            await verificarPreguntaExiste(IdPregunta);

            string query = @"UPDATE Preguntas
                            SET IdArea = @IdArea,
                                Texto = @Texto,
                                OrdenPregunta = @OrdenPregunta,
                                Activo = @Activo
                            WHERE IdPregunta = @IdPregunta";

            await _sqlConnection.ExecuteAsync(query, new
            {
                IdPregunta,
                pregunta.IdArea,
                pregunta.Texto,
                pregunta.OrdenPregunta,
                pregunta.Activo
            });

            return IdPregunta;
        }

        public async Task<int> Eliminar(int IdPregunta)
        {
            await verificarPreguntaExiste(IdPregunta);

            string query = @"DELETE FROM Preguntas
                            WHERE IdPregunta = @IdPregunta";

            await _sqlConnection.ExecuteAsync(query, new
            {
                IdPregunta
            });

            return IdPregunta;
        }

        public async Task<IEnumerable<PreguntaResponse>> Obtener()
        {
            string query = @"SELECT
                                p.IdPregunta,
                                p.IdArea,
                                a.Nombre AS NombreArea,
                                p.Texto,
                                p.OrdenPregunta,
                                p.Activo
                            FROM Preguntas p
                            INNER JOIN Areas a
                                ON p.IdArea = a.IdArea";

            var resultadoConsulta = await _sqlConnection.QueryAsync<PreguntaResponse>(query);

            return resultadoConsulta;
        }

        public async Task<PreguntaResponse> Obtener(int IdPregunta)
        {
            string query = @"SELECT
                                p.IdPregunta,
                                p.IdArea,
                                a.Nombre AS NombreArea,
                                p.Texto,
                                p.OrdenPregunta,
                                p.Activo
                            FROM Preguntas p
                            INNER JOIN Areas a
                                ON p.IdArea = a.IdArea
                            WHERE p.IdPregunta = @IdPregunta";

            var resultadoConsulta = await _sqlConnection.QueryFirstOrDefaultAsync<PreguntaResponse>(query, new
            {
                IdPregunta
            });

            return resultadoConsulta;
        }

        private async Task verificarPreguntaExiste(int IdPregunta)
        {
            PreguntaResponse resultadoPregunta = await Obtener(IdPregunta);

            if (resultadoPregunta == null)
            {
                throw new Exception("La pregunta no existe");
            }
        }
    }
}
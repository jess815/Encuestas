using Abstracciones.Interfaces.DA;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace DA.Repositorios
{
    public class RepositorioDapper : IEncuestaDapper
    {
        private readonly IConfiguration _configuracion;
        private readonly SqlConnection _conexionBaseDatos;

        public RepositorioDapper(IConfiguration configuracion)
        {
            _configuracion = configuracion;
            _conexionBaseDatos = new SqlConnection
                (_configuracion.GetConnectionString("BD"));
        }
        //este constructor lo que hace es devolver una sql connection
        //el get connection string obtiene la cadena de conexion del appsettings
        //configuracion (iconfiguration) me permite acceder a toda la informacion del appsettings

        public SqlConnection ObtenerRepositorio()
        {
           
            throw new NotImplementedException();
        }

        SqlConnection IEncuestaDapper.ObtenerRepositorio()
        {
            return _conexionBaseDatos;
        }
    }
}

using Microsoft.Data.SqlClient;


namespace Abstracciones.Interfaces.DA
{
    //se hace publico porque todas las capas tiene que tener acceso
    //debemos los metodos que debemos implementar en el DA
    public interface IRepositorioDapper
    {
        SqlConnection ObtenerRepositorio();
        //cuando implementemos la clase del repositorio dapper,vampos a tener un metodo que se llame ObtenerRepositorio  que nos va a devolver un sqlconnection

    }
}

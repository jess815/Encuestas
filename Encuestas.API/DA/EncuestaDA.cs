using Abstracciones.Interfaces.DA;
using Abstracciones.Modelos;
using Dapper;
using Microsoft.Data.SqlClient;

//no usamos entity porque  es mas pesado a nivel de rendimiento, por eso usamos dapper

namespace DA
{
    public class EncuestaDA : IEncuestaDA
    {
        private IEncuestaDapper _repositorioDapper;
        private SqlConnection _sqlConnection;

        //aqui sobre la pclase genero el constructor
        public EncuestaDA(IEncuestaDapper repositorioDapper)
        {
            _repositorioDapper = repositorioDapper;
            _sqlConnection = _repositorioDapper.ObtenerRepositorio();
        }
        //aqui arrancan las operciones del crud 
        public async Task<Guid> Agregar(EncuestaRequest vehiculo)
        {
            //no necdesitamos el insert porque tenemos un SP
            //el @ se pone antes para que sepa que dentro de las comillas es literal
            string query = @"AgregarVehiculo";
            //le establecemos la variable que es el resultado de la consulta
            //invocamos un metodo asincrono del  que lo va a ejecutar la conexion al sql
            var resultadoConsulta = await _sqlConnection.ExecuteScalarAsync<Guid>(query, new
            {
                Id = Guid.NewGuid(),
                IdModelo = vehiculo.IdModelo,
                Placa = vehiculo.Placa,
                Color = vehiculo.Color,
                Anio = vehiculo.Anio,
                Precio = vehiculo.Precio,
                CorreoPropietario = vehiculo.CorreoPropietario,
                TelefonoPropietario = vehiculo.TelefonoPropietario
            });
                // el ExecuteScalarAsync me devuelve UN VALOR, no un conjunto de datos, por eso especificamos que valor necesitamos
                return resultadoConsulta;  
        }

        public async Task<Guid> Editar(Guid Id, EncuestaRequest vehiculo)
        
        //copiamos el de agregar, recordar poner el async
    
        //aqui creamos el metodo de VERIFICAR para no poner todas las lineas
        //VehiculoResponse? resultadoConsultaVehiculo = await Obtener(Id);
        //if (resultadoConsultaVehiculo == null)
        //throw new Exception("El vehiculo no existe");
{
            await verificarVehiculoExiste(Id);
            string query = @"EditarVehiculo";
        var resultadoConsulta = await _sqlConnection.ExecuteScalarAsync<Guid>(query, new
        {
            Id = Id,
            IdModelo = vehiculo.IdModelo,
            Placa = vehiculo.Placa,
            Color = vehiculo.Color,
            Anio = vehiculo.Anio,
            Precio = vehiculo.Precio,
            CorreoPropietario = vehiculo.CorreoPropietario,
            TelefonoPropietario = vehiculo.TelefonoPropietario
        });
        return resultadoConsulta;
}

public async Task<Guid> Eliminar(Guid Id)
        {
            string query = @"EliminarVehiculo";
            var resultadoConsulta = await _sqlConnection.ExecuteScalarAsync<Guid>(query, new
            {
                Id = Id
            });
            return resultadoConsulta;
        }

        public async Task<IEnumerable<VehiculoResponse>> Obtener()
        {
            string query = @"ObtenerVehiculos";
            var resultadoConsulta = await _sqlConnection.QueryAsync<VehiculoResponse>(query);
            return resultadoConsulta;
        }

        public async Task<VehiculoResponse> Obtener(Guid Id)
        {
            string query = @"ObtenerVehiculo";
            var resultadoConsulta = await _sqlConnection.QueryAsync<VehiculoResponse>(query,
                new{Id = Id});
            return resultadoConsulta.FirstOrDefault();
        }
        //metodo que creamos para verificar si el vehiculo existe
        private async Task verificarVehiculoExiste(Guid Id)
        {
            VehiculoResponse? resultadoConsultaVehiculo = await Obtener(Id);
            if (resultadoConsultaVehiculo == null)
                throw new Exception("El vehiculo no existe");
        }
    }
}
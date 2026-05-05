using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;

namespace Flujo

//flujo invoca al DA, sabe donde enviar o donde recibir la informacion
{
    public class EncuestaFlujo : IEncuestaFlujo
    {
        private IEncuestaDA _EncuestaDA;

        public EncuestaFlujo(IEncuestaDA vehiculoDA)
        {
            _EncuestaDA = vehiculoDA;
        }

        public Task<Guid> Agregar(EncuestaRequest vehiculo)
        {
            //el flujo nos dice a donde ir, para agregar vamos al DA
            //el return de agregar vehiculo
            return _EncuestaDA.Agregar(vehiculo);
        }

        public Task<Guid> Editar(Guid Id, EncuestaRequest vehiculo)
        {
            return _EncuestaDA.Editar(Id, vehiculo);
        }

        public Task<Guid> Eliminar(Guid Id)
        {
            return _EncuestaDA.Eliminar(Id);
        }

        public Task<IEnumerable<VehiculoResponse>> Obtener()
        {
            return _EncuestaDA.Obtener();
        }

        public Task<VehiculoResponse> Obtener(Guid Id)
        {
            return _EncuestaDA.Obtener(Id);
        }
    }
}

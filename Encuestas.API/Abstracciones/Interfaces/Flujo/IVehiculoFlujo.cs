using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.Flujo
{
    //lo mismo que implementamos en el DA
    public interface IVehiculoFlujo
    {
        Task<IEnumerable<VehiculoResponse>> Obtener();
        Task<VehiculoResponse> Obtener(Guid Id);
        Task<Guid> Agregar(VehiculoRequest vehiculo);
        Task<Guid> Editar(Guid Id, VehiculoRequest vehiculo);
        Task<Guid> Eliminar(Guid Id);
    }
}

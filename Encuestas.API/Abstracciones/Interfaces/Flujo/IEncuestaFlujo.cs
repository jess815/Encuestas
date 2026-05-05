using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.Flujo
{
    //lo mismo que implementamos en el DA
    public interface IEncuestaFlujo
    {
        Task<IEnumerable<VehiculoResponse>> Obtener();
        Task<VehiculoResponse> Obtener(Guid Id);
        Task<Guid> Agregar(EncuestaRequest vehiculo);
        Task<Guid> Editar(Guid Id, EncuestaRequest vehiculo);
        Task<Guid> Eliminar(Guid Id);
    }
}

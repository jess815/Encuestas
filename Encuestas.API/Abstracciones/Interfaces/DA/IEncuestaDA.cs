using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.DA
{
    public interface IEncuestaDA
    {
        Task<IEnumerable<VehiculoResponse>> Obtener();
        Task<VehiculoResponse> Obtener(Guid Id);
        Task<Guid> Agregar(EncuestaRequest vehiculo);
        Task<Guid> Editar(Guid Id, EncuestaRequest vehiculo);
        Task<Guid> Eliminar(Guid Id);

    }
}

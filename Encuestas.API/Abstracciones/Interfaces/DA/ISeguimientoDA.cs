using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.DA
{
    public interface ISeguimientoDA
    {
        Task<IEnumerable<SeguimientoResponse>> Obtener();

        Task<SeguimientoResponse> Obtener(int IdSeguimiento);

        Task<int> Agregar(SeguimientoRequest seguimiento);

        Task<int> Editar(int IdSeguimiento, SeguimientoRequest seguimiento);

        Task<int> Eliminar(int IdSeguimiento);
    }
}
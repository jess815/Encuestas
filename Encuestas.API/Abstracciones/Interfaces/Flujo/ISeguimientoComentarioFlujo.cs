using Abstracciones.Modelos;

namespace Abstracciones.Interfaces.Flujo
{
    public interface ISeguimientoComentarioFlujo
    {
        Task<IEnumerable<SeguimientoComentarioResponse>> Obtener();

        Task<SeguimientoComentarioResponse> Obtener(int IdSeguimientoComentario);

        Task<int> Agregar(SeguimientoComentarioRequest comentario);

        Task<int> Editar(int IdSeguimientoComentario, SeguimientoComentarioRequest comentario);

        Task<int> Eliminar(int IdSeguimientoComentario);
    }
}
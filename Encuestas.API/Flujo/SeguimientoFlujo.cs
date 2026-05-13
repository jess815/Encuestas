using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;

namespace Flujo
{
    public class SeguimientoFlujo : ISeguimientoFlujo
    {
        private ISeguimientoDA _seguimientoDA;

        public SeguimientoFlujo(ISeguimientoDA seguimientoDA)
        {
            _seguimientoDA = seguimientoDA;
        }

        public async Task<int> Agregar(SeguimientoRequest seguimiento)
        {
            return await _seguimientoDA.Agregar(seguimiento);
        }

        public async Task<int> Editar(int IdSeguimiento, SeguimientoRequest seguimiento)
        {
            return await _seguimientoDA.Editar(IdSeguimiento, seguimiento);
        }

        public async Task<int> Eliminar(int IdSeguimiento)
        {
            return await _seguimientoDA.Eliminar(IdSeguimiento);
        }

        public async Task<IEnumerable<SeguimientoResponse>> Obtener()
        {
            return await _seguimientoDA.Obtener();
        }

        public async Task<SeguimientoResponse> Obtener(int IdSeguimiento)
        {
            return await _seguimientoDA.Obtener(IdSeguimiento);
        }
    }
}
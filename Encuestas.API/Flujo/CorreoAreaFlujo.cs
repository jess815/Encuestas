using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;

namespace Flujo
{
    public class CorreoAreaFlujo : ICorreoAreaFlujo
    {
        private ICorreoAreaDA _correoAreaDA;

        public CorreoAreaFlujo(ICorreoAreaDA correoAreaDA)
        {
            _correoAreaDA = correoAreaDA;
        }

        public async Task<int> Agregar(CorreoAreaRequest correoArea)
        {
            return await _correoAreaDA.Agregar(correoArea);
        }

        public async Task<int> Editar(int IdCorreoArea, CorreoAreaRequest correoArea)
        {
            return await _correoAreaDA.Editar(IdCorreoArea, correoArea);
        }

        public async Task<int> Eliminar(int IdCorreoArea)
        {
            return await _correoAreaDA.Eliminar(IdCorreoArea);
        }

        public async Task<IEnumerable<CorreoAreaResponse>> Obtener()
        {
            return await _correoAreaDA.Obtener();
        }

        public async Task<CorreoAreaResponse> Obtener(int IdCorreoArea)
        {
            return await _correoAreaDA.Obtener(IdCorreoArea);
        }
    }
}
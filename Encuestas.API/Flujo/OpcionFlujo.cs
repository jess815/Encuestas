using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;

namespace Flujo
{
    public class OpcionFlujo : IOpcionFlujo
    {
        private IOpcionDA _opcionDA;

        public OpcionFlujo(IOpcionDA opcionDA)
        {
            _opcionDA = opcionDA;
        }

        public async Task<int> Agregar(OpcionRequest opcion)
        {
            return await _opcionDA.Agregar(opcion);
        }

        public async Task<int> Editar(int IdOpcion, OpcionRequest opcion)
        {
            return await _opcionDA.Editar(IdOpcion, opcion);
        }

        public async Task<int> Eliminar(int IdOpcion)
        {
            return await _opcionDA.Eliminar(IdOpcion);
        }

        public async Task<IEnumerable<OpcionResponse>> Obtener()
        {
            return await _opcionDA.Obtener();
        }

        public async Task<OpcionResponse> Obtener(int IdOpcion)
        {
            return await _opcionDA.Obtener(IdOpcion);
        }
    }
}
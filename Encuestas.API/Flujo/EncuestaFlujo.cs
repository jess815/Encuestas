using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;

namespace Flujo
{
    public class EncuestaFlujo : IEncuestaFlujo
    {
        private IEncuestaDA _EncuestaDA;

        public EncuestaFlujo(IEncuestaDA encuestaDA)
        {
            _EncuestaDA = encuestaDA;
        }

        public Task<int> Agregar(AreaRequest area)
        {
            return _EncuestaDA.Agregar(area);
        }

        public Task<int> Editar(int IdArea, AreaRequest area)
        {
            return _EncuestaDA.Editar(IdArea, area);
        }

        public Task<int> Eliminar(int IdArea)
        {
            return _EncuestaDA.Eliminar(IdArea);
        }

        public Task<IEnumerable<AreaResponse>> Obtener()
        {
            return _EncuestaDA.Obtener();
        }

        public Task<AreaResponse> Obtener(int IdArea)
        {
            return _EncuestaDA.Obtener(IdArea);
        }
    }
}
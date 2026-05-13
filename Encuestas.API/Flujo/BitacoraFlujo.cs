using Abstracciones.Interfaces.DA;
using Abstracciones.Interfaces.Flujo;
using Abstracciones.Modelos;

namespace Flujo
{
    public class BitacoraFlujo : IBitacoraFlujo
    {
        private IBitacoraDA _bitacoraDA;

        public BitacoraFlujo(IBitacoraDA bitacoraDA)
        {
            _bitacoraDA = bitacoraDA;
        }

        public async Task<int> Agregar(BitacoraRequest bitacora)
        {
            return await _bitacoraDA.Agregar(bitacora);
        }

        public async Task<IEnumerable<BitacoraResponse>> Obtener()
        {
            return await _bitacoraDA.Obtener();
        }

        public async Task<BitacoraResponse> Obtener(int IdBitacora)
        {
            return await _bitacoraDA.Obtener(IdBitacora);
        }
    }
}
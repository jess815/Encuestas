namespace Abstracciones.Modelos
{
    public class DashboardResponse
    {
        public int CantidadEncuestas { get; set; }

        public decimal PromedioGeneral { get; set; }

        public int CantidadAlertas { get; set; }

        public int CantidadComentarios { get; set; }
    }
}
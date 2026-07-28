namespace Abstracciones.Modelos
{
    public class DashboardResponse
    {
        public int CantidadEncuestas { get; set; }

        public decimal PromedioGeneral { get; set; }

        public int CantidadAlertas { get; set; }

        public int CantidadComentarios { get; set; }

        public List<DashboardMesResponse> EncuestasPorMes { get; set; } = new();

        public List<DashboardAlertaResponse> UltimasAlertas { get; set; } = new();
    }

    public class DashboardMesResponse
    {
        public string Mes { get; set; } = string.Empty;

        public int Cantidad { get; set; }
    }

    public class DashboardAlertaResponse
    {
        public string Area { get; set; } = string.Empty;

        public decimal Nota { get; set; }

        public string Comentario { get; set; } = string.Empty;

        public DateTime Fecha { get; set; }
    }
}
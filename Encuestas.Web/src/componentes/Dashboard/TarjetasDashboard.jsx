function TarjetasDashboard({
  dashboardDatos
}) {
  // redondea el promedio general
  const promedioGeneral = Math.round(
    Number(dashboardDatos?.promedioGeneral ?? 0)
  )

  // muestra los indicadores principales
  return (
    <div className="dashboard-resumen">

      <div className="card-dashboard">
        <h3>Encuestas recibidas</h3>
        <p>
          {dashboardDatos?.cantidadEncuestas ?? 0}
        </p>
      </div>

      <div className="card-dashboard">
        <h3>Promedio general</h3>
        <p>
          {promedioGeneral}%
        </p>
      </div>

      <div className="card-dashboard">
        <h3>Alertas generadas</h3>
        <p>
          {dashboardDatos?.cantidadAlertas ?? 0}
        </p>
      </div>

      <div className="card-dashboard">
        <h3>Comentarios registrados</h3>
        <p>
          {dashboardDatos?.cantidadComentarios ?? 0}
        </p>
      </div>

    </div>
  )
}

export default TarjetasDashboard
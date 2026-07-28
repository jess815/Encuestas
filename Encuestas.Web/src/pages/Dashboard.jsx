function Dashboard({
  usuarioLogueado,
  encuestas,
  dashboardDatos,
  puedeVerArea
}) {

  // obtiene el texto de las areas visibles
  const obtenerTextoAreas = () => {

    if (usuarioLogueado?.administrador === true) {

      return 'Todas las áreas del Costa Rica Country Club'

    }

    const areasUsuario = encuestas
      .filter((area) =>
        puedeVerArea(area, usuarioLogueado)
      )
      .map((area) =>
        area.nombre
      )

    if (areasUsuario.length === 0) {

      return 'Sin áreas asignadas'

    }

    return areasUsuario.join(', ')

  }

  return (
    <>

      <div className="card-dashboard">

        <h3>
          {
            usuarioLogueado?.administrador
              ? 'Resumen general de encuestas'
              : 'Resumen de mis áreas'
          }
        </h3>

        <p>
          {obtenerTextoAreas()}
        </p>

      </div>

      <div className="dashboard-resumen">

        <div className="card-dashboard">

          <h3>
            Encuestas recibidas
          </h3>

          <p>
            {dashboardDatos.cantidadEncuestas}
          </p>

        </div>

        <div className="card-dashboard">

          <h3>
            Promedio general
          </h3>

          <p>
            {dashboardDatos.promedioGeneral}%
          </p>

        </div>

        <div className="card-dashboard">

          <h3>
            Alertas generadas
          </h3>

          <p>
            {dashboardDatos.cantidadAlertas}
          </p>

        </div>

        <div className="card-dashboard">

          <h3>
            Comentarios registrados
          </h3>

          <p>
            {dashboardDatos.cantidadComentarios}
          </p>

        </div>

      </div>

    </>
  )
}

export default Dashboard
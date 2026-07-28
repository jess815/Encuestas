import TarjetasDashboard from '../componentes/Dashboard/TarjetasDashboard'
import GraficoBarras from '../componentes/Dashboard/GraficoBarras'
import GraficoDona from '../componentes/Dashboard/GraficoDona'
import GraficoLinea from '../componentes/Dashboard/GraficoLinea'
import UltimasAlertas from '../componentes/Dashboard/UltimasAlertas'

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

    const areasUsuario = (encuestas ?? [])
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

      <TarjetasDashboard
        dashboardDatos={dashboardDatos}
      />

      <GraficoBarras
        dashboardDatos={dashboardDatos}
      />

      <GraficoDona
        dashboardDatos={dashboardDatos}
      />

      <GraficoLinea
        dashboardDatos={dashboardDatos}
      />

      <UltimasAlertas
        dashboardDatos={dashboardDatos}
      />

    </>
  )
}

export default Dashboard
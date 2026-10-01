function UltimasAlertas({
  dashboardDatos
}) {
  // obtiene las ultimas alertas
  const alertas =
    dashboardDatos?.ultimasAlertas ?? []

  // convierte la fecha recibida en un formato legible
  const formatearFecha = (fecha) => {
    if (!fecha) {
      return 'Sin fecha'
    }

    const fechaConvertida = new Date(fecha)

    if (Number.isNaN(fechaConvertida.getTime())) {
      return fecha
    }

    return fechaConvertida.toLocaleDateString(
      'es-CR',
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
    )
  }

  // redondea la nota para evitar decimales extensos
  const formatearNota = (nota) => {
    const valor = Number(nota)

    if (Number.isNaN(valor)) {
      return '0%'
    }

    return `${Math.round(valor)}%`
  }

  return (
    <div className="card-dashboard ultimas-alertas">

      <h3>
        Últimas alertas
      </h3>

      {
        alertas.length === 0
          ? (
            <p>
              No hay alertas registradas.
            </p>
          )
          : (
            <div className="tabla-responsive">

              <table className="tabla-dashboard">

                <thead>

                  <tr>
                    <th>Área</th>
                    <th>Nota</th>
                    <th>Comentario</th>
                    <th>Fecha</th>
                  </tr>

                </thead>

                <tbody>

                  {
                    alertas.map((alerta, index) => (

                      <tr
                        key={
                          `${alerta.area}-${alerta.fecha}-${index}`
                        }
                      >

                        <td data-label="Área">
                          {alerta.area}
                        </td>

                        <td data-label="Nota">
                          {formatearNota(alerta.nota)}
                        </td>

                        <td data-label="Comentario">
                          {
                            alerta.comentario ||
                            'Sin comentario'
                          }
                        </td>

                        <td data-label="Fecha">
                          {formatearFecha(alerta.fecha)}
                        </td>

                      </tr>

                    ))
                  }

                </tbody>

              </table>

            </div>
          )
      }

    </div>
  )
}

export default UltimasAlertas
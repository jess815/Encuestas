function UltimasAlertas({
  dashboardDatos
}) {
  // obtiene las ultimas alertas
  const alertas =
    dashboardDatos?.ultimasAlertas ?? []

  return (
    <div className="card-dashboard">

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
            <table className="tabla-dashboard">
              <thead>
                <tr>
                  <th>Área</th>
                  <th>Nota</th>
                  <th>Fecha</th>
                </tr>
              </thead>

              <tbody>
                {
                  alertas.map((alerta, index) => (
                    <tr key={index}>
                      <td>{alerta.area}</td>
                      <td>{alerta.nota}</td>
                      <td>{alerta.fecha}</td>
                    </tr>
                  ))
                }
              </tbody>

            </table>
          )
      }

    </div>
  )
}

export default UltimasAlertas
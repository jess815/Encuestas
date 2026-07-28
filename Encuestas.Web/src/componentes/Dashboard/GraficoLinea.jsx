import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

function GraficoLinea({
  dashboardDatos
}) {
  // obtiene las encuestas agrupadas por mes
  const datosGrafico =
    dashboardDatos?.encuestasPorMes ?? []

  return (
    <div className="card-dashboard">
      <h3>Encuestas recibidas por mes</h3>

      {
        datosGrafico.length === 0
          ? (
            <p>
              No hay información mensual disponible.
            </p>
          )
          : (
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart
                  data={datosGrafico}
                  margin={{
                    top: 20,
                    right: 20,
                    left: 0,
                    bottom: 10
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="mes"
                  />

                  <YAxis
                    allowDecimals={false}
                  />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="cantidad"
                    stroke="#1f4e79"
                    strokeWidth={3}
                    activeDot={{
                      r: 6
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )
      }
    </div>
  )
}

export default GraficoLinea
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

function GraficoBarras({
  dashboardDatos
}) {

  // prepara los datos del grafico
  const datosGrafico = [
    {
      nombre: 'Encuestas',
      cantidad: dashboardDatos?.cantidadEncuestas ?? 0,
      color: '#006361'
    },
    {
      nombre: 'Alertas',
      cantidad: dashboardDatos?.cantidadAlertas ?? 0,
      color: '#c0392b'
    },
    {
      nombre: 'Comentarios',
      cantidad: dashboardDatos?.cantidadComentarios ?? 0,
      color: '#B97F00'
    }
  ]

  return (

    <div className="card-dashboard">

      <h3>
        Resumen de actividad
      </h3>

      <div
        style={{
          width: '100%',
          height: 300
        }}
      >

        <ResponsiveContainer>

          <BarChart
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
              dataKey="nombre"
            />

            <YAxis
              allowDecimals={false}
            />

            <Tooltip />

            <Bar
              dataKey="cantidad"
              radius={[5, 5, 0, 0]}
            >

              {
                datosGrafico.map((dato) => (

                  <Cell
                    key={dato.nombre}
                    fill={dato.color}
                  />

                ))
              }

            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  )

}

export default GraficoBarras
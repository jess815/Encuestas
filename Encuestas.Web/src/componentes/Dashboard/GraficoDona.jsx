import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

function GraficoDona({
  dashboardDatos
}) {
  // obtiene y redondea el promedio general
  const promedio = Math.round(
    Number(dashboardDatos?.promedioGeneral ?? 0)
  )

  // prepara los datos del grafico
  const datosGrafico = [
    {
      nombre: 'Promedio alcanzado',
      valor: promedio
    },
    {
      nombre: 'Restante',
      valor: Math.max(100 - promedio, 0)
    }
  ]

  return (
    <div className="card-dashboard">
      <h3>Promedio general</h3>

      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={datosGrafico}
              dataKey="valor"
              nameKey="nombre"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
            >
              <Cell fill="#1f4e79" />
              <Cell fill="#d9e2f3" />
            </Pie>

            <Tooltip
              formatter={(valor) => `${valor}%`}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <p style={{ textAlign: 'center' }}>
        {promedio}%
      </p>
    </div>
  )
}

export default GraficoDona
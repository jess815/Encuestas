import { useEffect, useState } from 'react'
import Encuesta from './pages/Encuesta'
import Areas from './pages/Areas'
import Opciones from './pages/Opciones'
import CorreosArea from './pages/CorreosArea'
import Usuarios from './pages/Usuarios'
import UsuarioAreas from './pages/UsuarioAreas'
import Seguimientos from './pages/Seguimientos'
import Reportes from './pages/Reportes'
import Bitacora from './pages/Bitacora'
import Sidebar from './componentes/Sidebar'
import Navbar from './componentes/Navbar'

function App() {

  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [logueado, setLogueado] = useState(false)
  const [usuarioLogueado, setUsuarioLogueado] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [modulo, setModulo] = useState('dashboard')
  const [encuestas, setEncuestas] = useState([])

  const [dashboardDatos, setDashboardDatos] = useState({
    cantidadEncuestas: 0,
    promedioGeneral: 0,
    cantidadAlertas: 0,
    cantidadComentarios: 0
  })

  const rutaActual = window.location.pathname.toLowerCase()

  const esRutaEncuesta = rutaActual.startsWith('/encuestas/')

  const slugArea = rutaActual
    .replace('/encuestas/', '')
    .replace('/', '')

  useEffect(() => {

    obtenerEncuestas()
    obtenerDashboard()

  }, [])

  // Carga las áreas
  const obtenerEncuestas = async () => {

    try {

      const response = await fetch('/api/Encuesta')

      if (response.ok) {

        const data = await response.json()

        console.log(data)

        setEncuestas(data)

      }

    }
    catch (error) {

      console.error(error)

    }

  }

  // Carga los datos reales del dashboard
  const obtenerDashboard = async () => {

    try {

      const response = await fetch('/api/Dashboard')

      if (response.ok) {

        const data = await response.json()

        setDashboardDatos(data)

      }

    }
    catch (error) {

      console.error(error)

    }

  }

  // Inicia sesión en el sistema
  const iniciarSesion = async () => {

    try {

      setCargando(true)

      const response = await fetch('/api/Usuario/Login', {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          usuario: usuario,
          password: password
        })

      })

      if (response.ok) {

        const data = await response.json()

        console.log(data)

        setUsuarioLogueado(data)
        setLogueado(true)

      }
      else {

        alert('Usuario o contraseña incorrectos')

      }

    }
    catch (error) {

      console.error(error)

      alert('No fue posible conectar con el servidor')

    }
    finally {

      setCargando(false)

    }

  }

  // Cierra la sesión actual
  const cerrarSesion = () => {

    setLogueado(false)
    setUsuarioLogueado(null)
    setUsuario('')
    setPassword('')
    setModulo('dashboard')

  }

  if (esRutaEncuesta) {

    return (

      <Encuesta slugArea={slugArea} />

    )

  }

  return (
    <>

      {
        !logueado ?

          <div className="contenedor">

            <div className="tarjeta">

              <h1 className="titulo">
                Sistema de Encuestas
              </h1>

              <p className="subtitulo">
                Costa Rica Country Club
              </p>

              <input
                type="text"
                placeholder="Usuario"
                className="input"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />

              <input
                type="password"
                placeholder="Contraseña"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                className="boton"
                onClick={iniciarSesion}
                disabled={cargando}
              >

                {
                  cargando ?
                    'Ingresando...'
                    :
                    'Ingresar'
                }

              </button>

            </div>

          </div>

          :

          <div className="dashboard">

            <Navbar
              usuarioLogueado={usuarioLogueado}
              cerrarSesion={cerrarSesion}
            />

            <div className="dashboard-layout">

              <Sidebar setModulo={setModulo} />

              <div className="contenido-dashboard">

                {
                  modulo === 'dashboard' &&

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
                }

                {
                  modulo === 'encuestas' &&

                  <Areas
                    encuestas={encuestas}
                    obtenerEncuestas={obtenerEncuestas}
                  />
                }

                {
                  modulo === 'opciones' &&

                  <Opciones />
                }

                {
                  modulo === 'correosArea' &&

                  <CorreosArea areas={encuestas} />
                }

                {
                  modulo === 'usuarios' &&

                  <Usuarios />
                }

                {
                  modulo === 'usuarioAreas' &&

                  <UsuarioAreas areas={encuestas} />
                }

                {
                  modulo === 'seguimientos' &&

                  <Seguimientos />
                }

                {
                  modulo === 'reportes' &&

                  <Reportes />
                }

                {
                  modulo === 'bitacora' &&

                  <Bitacora />
                }

              </div>

            </div>

          </div>
      }

    </>
  )
}

export default App
import { useEffect, useState } from 'react'
import Areas from './pages/Areas'
import Sidebar from './componentes/Sidebar'

function App() {

  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [logueado, setLogueado] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [modulo, setModulo] = useState('dashboard')
  const [encuestas, setEncuestas] = useState([])

  useEffect(() => {

    obtenerEncuestas()

  }, [])

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

            <div className="navbar">

              <h2>
                Sistema de Encuestas CRCC
              </h2>

            </div>

            <div className="dashboard-layout">

              <Sidebar setModulo={setModulo} />

              <div className="contenido-dashboard">

                {
                  modulo === 'dashboard' &&

                  <>
                    <div className="card-dashboard">

                      <h3>
                        Encuestas Activas
                      </h3>

                      <p>
                        12 encuestas disponibles
                      </p>

                    </div>

                    <div className="card-dashboard">

                      <h3>
                        Seguimientos Pendientes
                      </h3>

                      <p>
                        5 casos pendientes
                      </p>

                    </div>

                    <div className="card-dashboard">

                      <h3>
                        Promedio General
                      </h3>

                      <p>
                        92%
                      </p>

                    </div>
                  </>
                }

                {
  modulo === 'encuestas' &&

  <Areas encuestas={encuestas} />
}

                {
                  modulo === 'seguimientos' &&

                  <div className="card-dashboard">
                    <h3>Módulo de Seguimientos</h3>
                  </div>
                }

                {
                  modulo === 'reportes' &&

                  <div className="card-dashboard">
                    <h3>Módulo de Reportes</h3>
                  </div>
                }

                {
                  modulo === 'usuarios' &&

                  <div className="card-dashboard">
                    <h3>Módulo de Usuarios</h3>
                  </div>
                }

              </div>

            </div>

          </div>
      }

    </>
  )
}

export default App
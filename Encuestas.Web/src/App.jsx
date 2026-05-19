import { useState } from 'react'

function App() {

  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [logueado, setLogueado] = useState(false)
  const [cargando, setCargando] = useState(false)

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

            <div className="contenido-dashboard">

              <div className="card-dashboard">

                <h3>
                  Encuestas
                </h3>

                <p>
                  Administración de encuestas
                </p>

              </div>

              <div className="card-dashboard">

                <h3>
                  Seguimientos
                </h3>

                <p>
                  Gestión de seguimientos
                </p>

              </div>

              <div className="card-dashboard">

                <h3>
                  Reportes
                </h3>

                <p>
                  Indicadores y estadísticas
                </p>

              </div>

            </div>

          </div>
      }

    </>
  )
}

export default App
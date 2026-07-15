import { useEffect, useState } from 'react'
import Encuesta from './pages/Encuesta'
import Areas from './pages/Areas'
import Opciones from './pages/Opciones'
import Usuarios from './pages/Usuarios'
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
  const [areasPermitidas, setAreasPermitidas] = useState([])

  const [dashboardDatos, setDashboardDatos] = useState({
    cantidadEncuestas: 0,
    promedioGeneral: 0,
    cantidadAlertas: 0,
    cantidadComentarios: 0
  })

  // obtiene la ruta actual para saber si es una encuesta
  const rutaActual = window.location.pathname.toLowerCase()

  const esRutaEncuesta = rutaActual.startsWith('/encuestas/')

  // obtiene el nombre del area desde la ruta
  const slugArea = rutaActual
    .replace('/encuestas/', '')
    .replace('/', '')

  useEffect(() => {

    obtenerEncuestas()

  }, [])

  // convierte el nombre del area en una ruta valida
  const crearSlug = (texto = '') => {

    return String(texto)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s/g, '')
      .replace(/[^a-z0-9]/g, '')

  }

  // revisa si el usuario puede ver el area
  const puedeVerArea = (area, usuarioSistema) => {

    if (usuarioSistema?.administrador === true) {

      return true

    }

    const slug = crearSlug(area.nombre)

    if (slug === 'elceibo') {

      return usuarioSistema?.ceibo === true

    }

    if (slug === 'faroles') {

      return usuarioSistema?.faroles === true

    }

    if (slug === 'hoyo19') {

      return usuarioSistema?.hoyo19 === true

    }

    if (slug === 'pinrojo') {

      return usuarioSistema?.pinRojo === true

    }

    if (slug === 'canabrava') {

      return usuarioSistema?.canaBrava === true

    }

    if (slug === 'eventos') {

      return usuarioSistema?.eventos === true

    }

    return false

  }

  // obtiene los ids de areas que puede ver el usuario
  const obtenerIdsAreasPermitidas = (
    usuarioSistema,
    listaAreas
  ) => {

    return listaAreas
      .filter((area) =>
        puedeVerArea(area, usuarioSistema)
      )
      .map((area) =>
        area.idArea
      )

  }

  // obtiene el texto de areas visibles para el dashboard
  const obtenerTextoAreasDashboard = () => {

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

  // carga las areas registradas
  const obtenerEncuestas = async () => {

    try {

      const response = await fetch('/api/Encuesta')

      if (response.ok) {

        const data = await response.json()

        setEncuestas(data)

        return data

      }
      else if (response.status === 204) {

        setEncuestas([])

        return []

      }

    }
    catch (error) {

      console.error(error)

    }

    return []

  }

  // carga los datos del dashboard segun el usuario
  const obtenerDashboard = async (idUsuario) => {

    try {

      const response = await fetch(
        `/api/Dashboard?idUsuario=${idUsuario}`
      )

      if (response.ok) {

        const data = await response.json()

        setDashboardDatos(data)

      }

    }
    catch (error) {

      console.error(error)

    }

  }

  // inicia la sesion del usuario
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

        const areasActuales =
          encuestas.length > 0
            ? encuestas
            : await obtenerEncuestas()

        const idsAreas =
          obtenerIdsAreasPermitidas(
            data,
            areasActuales
          )

        setUsuarioLogueado(data)
        setAreasPermitidas(idsAreas)

        await obtenerDashboard(
          data.idUsuario
        )

        setLogueado(true)
        setModulo('dashboard')

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

  // cierra la sesion y limpia los datos del usuario
  const cerrarSesion = () => {

    setLogueado(false)
    setUsuarioLogueado(null)
    setAreasPermitidas([])
    setUsuario('')
    setPassword('')
    setModulo('dashboard')

    setDashboardDatos({
      cantidadEncuestas: 0,
      promedioGeneral: 0,
      cantidadAlertas: 0,
      cantidadComentarios: 0
    })

  }

  // valida los permisos del usuario para cada modulo
  const tienePermisoModulo = (moduloActual) => {

    const esAdministrador =
      usuarioLogueado?.administrador === true

    const puedeEditarEncuestas =
      esAdministrador ||
      usuarioLogueado?.editaEncuesta === true

    const puedeVerReportes =
      esAdministrador ||
      usuarioLogueado?.exportaExcel === true

    // todos los usuarios pueden ver el dashboard
    if (moduloActual === 'dashboard') {

      return true

    }

    // administracion de areas y preguntas
    if (moduloActual === 'encuestas') {

      return puedeEditarEncuestas

    }

    // seguimientos de encuestas
    if (moduloActual === 'seguimientos') {

      return puedeEditarEncuestas

    }

    // opciones generales solo para administradores
    if (moduloActual === 'opciones') {

      return esAdministrador

    }

    // modulos exclusivos para administradores
    if (
      moduloActual === 'usuarios' ||
      moduloActual === 'bitacora'
    ) {

      return esAdministrador

    }

    // modulo de reportes
    if (moduloActual === 'reportes') {

      return puedeVerReportes

    }

    return false

  }

  // las encuestas se abren sin ingresar al panel administrativo
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
                  cargando
                    ? 'Ingresando...'
                    : 'Ingresar'
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

              <Sidebar
                setModulo={setModulo}
                usuarioLogueado={usuarioLogueado}
              />

              <div className="contenido-dashboard">

                {
                  !tienePermisoModulo(modulo) &&

                  <div className="card-dashboard">

                    <h3>
                      Acceso no permitido
                    </h3>

                    <p>
                      Su usuario no cuenta con permisos para ingresar a este módulo.
                    </p>

                  </div>
                }

                {
                  modulo === 'dashboard' &&
                  tienePermisoModulo('dashboard') &&

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
                        {obtenerTextoAreasDashboard()}
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
                }

                {
                  modulo === 'encuestas' &&
                  tienePermisoModulo('encuestas') &&

                  <Areas
                    encuestas={encuestas}
                    obtenerEncuestas={obtenerEncuestas}
                    usuarioLogueado={usuarioLogueado}
                  />
                }

                {
                  modulo === 'opciones' &&
                  tienePermisoModulo('opciones') &&

                  <Opciones />
                }

                {
                  modulo === 'usuarios' &&
                  tienePermisoModulo('usuarios') &&

                  <Usuarios />
                }

                {
                  modulo === 'seguimientos' &&
                  tienePermisoModulo('seguimientos') &&

                  <Seguimientos
                    areasPermitidas={areasPermitidas}
                    usuarioLogueado={usuarioLogueado}
                  />
                }

                {
                  modulo === 'reportes' &&
                  tienePermisoModulo('reportes') &&

                  <Reportes
                    areasPermitidas={areasPermitidas}
                    usuarioLogueado={usuarioLogueado}
                  />
                }

                {
                  modulo === 'bitacora' &&
                  tienePermisoModulo('bitacora') &&

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
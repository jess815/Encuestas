function Sidebar({ setModulo, usuarioLogueado }) {

    // revisa si el usuario es administrador
    const esAdministrador =
        usuarioLogueado?.administrador === true

    // revisa si el usuario tiene alguna area asignada
    const tieneAreasAsignadas =
        usuarioLogueado?.ceibo === true ||
        usuarioLogueado?.faroles === true ||
        usuarioLogueado?.hoyo19 === true ||
        usuarioLogueado?.pinRojo === true ||
        usuarioLogueado?.canaBrava === true ||
        usuarioLogueado?.eventos === true

    // permite ingresar a las encuestas asignadas
    const puedeVerEncuestas =
        esAdministrador ||
        tieneAreasAsignadas

    // permite ingresar a los seguimientos
    const puedeVerSeguimientos =
        esAdministrador ||
        tieneAreasAsignadas

    // permite ingresar a los reportes
    const puedeVerReportes =
        esAdministrador ||
        usuarioLogueado?.exportaExcel === true

    return (

        <div className="sidebar">

            <button
                className="menu-boton"
                onClick={() => setModulo('dashboard')}
            >
                Dashboard
            </button>

            {
                puedeVerEncuestas &&

                <button
                    className="menu-boton"
                    onClick={() => setModulo('encuestas')}
                >
                    {
                        esAdministrador
                            ? 'Administración'
                            : 'Encuestas'
                    }
                </button>
            }

            {
                puedeVerSeguimientos &&

                <button
                    className="menu-boton"
                    onClick={() => setModulo('seguimientos')}
                >
                    Seguimientos
                </button>
            }

            {
                puedeVerReportes &&

                <button
                    className="menu-boton"
                    onClick={() => setModulo('reportes')}
                >
                    Reportes
                </button>
            }

            {
                esAdministrador &&

                <>

                    {/* opciones exclusivas para administradores */}

                    <button
                        className="menu-boton"
                        onClick={() => setModulo('opciones')}
                    >
                        Opciones
                    </button>

                    <button
                        className="menu-boton"
                        onClick={() => setModulo('usuarios')}
                    >
                        Usuarios
                    </button>

                    <button
                        className="menu-boton"
                        onClick={() => setModulo('bitacora')}
                    >
                        Bitácora
                    </button>

                </>
            }

        </div>

    )

}

export default Sidebar
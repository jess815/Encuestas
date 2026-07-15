function Sidebar({ setModulo, usuarioLogueado }) {

    // revisa si el usuario es administrador
    const esAdministrador =
        usuarioLogueado?.administrador === true

    // permite administrar las encuestas
    const puedeEditarEncuestas =
        esAdministrador ||
        usuarioLogueado?.editaEncuesta === true

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
                puedeEditarEncuestas &&

                <button
                    className="menu-boton"
                    onClick={() => setModulo('encuestas')}
                >
                    Administración
                </button>
            }

            {
                puedeEditarEncuestas &&

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
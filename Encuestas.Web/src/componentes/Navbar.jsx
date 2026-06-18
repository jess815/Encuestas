function Navbar({ usuarioLogueado, cerrarSesion }) {

    return (

        <div className="navbar">

            <div className="navbar-titulo">

                <h2>
                    Sistema de Encuestas CRCC
                </h2>

                <p>
                    Panel administrativo
                </p>

            </div>

            <div className="usuario-panel">

                <div className="usuario-panel-info">

                    <span className="usuario-etiqueta">
                        Usuario
                    </span>

                    <span className="usuario-nombre">
                        {
                            usuarioLogueado !== null
                                ? usuarioLogueado.nombre
                                : ''
                        }
                    </span>

                </div>

                <button
                    className="boton-cerrar-sesion"
                    onClick={cerrarSesion}
                >
                    Cerrar sesión
                </button>

            </div>

        </div>

    )
}

export default Navbar
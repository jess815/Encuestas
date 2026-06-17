function Sidebar({ setModulo }) {

    return (

        <div className="sidebar">

            <button
                className="menu-boton"
                onClick={() => setModulo('dashboard')}
            >
                Dashboard
            </button>

            <button
                className="menu-boton"
                onClick={() => setModulo('encuestas')}
            >
                Encuestas
            </button>

            <button
                className="menu-boton"
                onClick={() => setModulo('opciones')}
            >
                Opciones
            </button>

            <button
                className="menu-boton"
                onClick={() => setModulo('correosArea')}
            >
                Correos por Área
            </button>

            <button
                className="menu-boton"
                onClick={() => setModulo('usuarios')}
            >
                Usuarios
            </button>

            <button
                className="menu-boton"
                onClick={() => setModulo('usuarioAreas')}
            >
                Áreas por Usuario
            </button>

            <button
                className="menu-boton"
                onClick={() => setModulo('seguimientos')}
            >
                Seguimientos
            </button>

            <button
                className="menu-boton"
                onClick={() => setModulo('reportes')}
            >
                Reportes
            </button>

        </div>

    )
}

export default Sidebar
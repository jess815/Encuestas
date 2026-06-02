function Areas() {

    return (

        <div className="tabla-contenedor">

            <div className="tabla-header">

                <h2>
                    Administración de Áreas
                </h2>

                <button className="boton-agregar">
                    Nueva Área
                </button>

            </div>

            <table className="tabla">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>

                </thead>

                <tbody>

                    <tr>
                        <td>1</td>
                        <td>El Ceibo</td>

                        <td>

                            <button className="boton-tabla editar">
                                Editar
                            </button>

                            <button className="boton-tabla eliminar">
                                Eliminar
                            </button>

                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    )
}

export default Areas
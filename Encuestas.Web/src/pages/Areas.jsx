import { useState } from 'react'
import ModalNuevaArea from '../componentes/ModalNuevaArea'

function Areas({ encuestas, obtenerEncuestas }) {

    const [mostrarModal, setMostrarModal] = useState(false)

    return (

        <>

            <div className="tabla-contenedor">

                <div className="tabla-header">

                    <h2>
                        Administración de Áreas
                    </h2>

                    <button
                        className="boton-agregar"
                        onClick={() => setMostrarModal(true)}
                    >
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

                        {
                            encuestas.map((encuesta) => (

                                <tr key={encuesta.idArea}>

                                    <td>
                                        {encuesta.idArea}
                                    </td>

                                    <td>
                                        {encuesta.nombre}
                                    </td>

                                    <td>

                                        <button className="boton-tabla editar">
                                            Editar
                                        </button>

                                        <button className="boton-tabla eliminar">
                                            Eliminar
                                        </button>

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

            {
                mostrarModal &&

                <ModalNuevaArea
                    onCerrar={() => setMostrarModal(false)}
                    obtenerEncuestas={obtenerEncuestas}
                />
            }

        </>

    )
}

export default Areas
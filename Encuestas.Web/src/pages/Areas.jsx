import { useState } from 'react'
import ModalNuevaArea from '../componentes/ModalNuevaArea'

function Areas({ encuestas, obtenerEncuestas }) {

    const [mostrarModal, setMostrarModal] = useState(false)
    const [areaEditar, setAreaEditar] = useState(null)

    const abrirNuevo = () => {

        setAreaEditar(null)
        setMostrarModal(true)

    }

    const abrirEditar = (area) => {

        setAreaEditar(area)
        setMostrarModal(true)

    }

    const cerrarModal = () => {

        setAreaEditar(null)
        setMostrarModal(false)

    }

    return (

        <>

            <div className="tabla-contenedor">

                <div className="tabla-header">

                    <h2>
                        Administración de Áreas
                    </h2>

                    <button
                        className="boton-agregar"
                        onClick={abrirNuevo}
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
                            encuestas.map((area) => (

                                <tr key={area.idArea}>

                                    <td>
                                        {area.idArea}
                                    </td>

                                    <td>
                                        {area.nombre}
                                    </td>

                                    <td>

                                        <button
                                            className="boton-tabla editar"
                                            onClick={() => abrirEditar(area)}
                                        >
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
                    onCerrar={cerrarModal}
                    obtenerEncuestas={obtenerEncuestas}
                    areaEditar={areaEditar}
                />
            }

        </>

    )
}

export default Areas
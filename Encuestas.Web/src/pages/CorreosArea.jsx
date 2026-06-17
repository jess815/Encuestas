import { useEffect, useState } from 'react'
import ModalNuevoCorreoArea from '../componentes/ModalNuevoCorreoArea'

function CorreosArea({ areas }) {

    const [correosArea, setCorreosArea] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [correoEditar, setCorreoEditar] = useState(null)

    useEffect(() => {

        obtenerCorreosArea()

    }, [])

    const obtenerCorreosArea = async () => {

        try {

            const response = await fetch('/api/CorreoArea')

            if (response.ok) {

                const data = await response.json()

                setCorreosArea(data)

            }
            else if (response.status === 204) {

                setCorreosArea([])

            }

        }
        catch (error) {

            console.error(error)

            alert('Error al cargar los correos por área')

        }

    }

    const abrirNuevo = () => {

        setCorreoEditar(null)
        setMostrarModal(true)

    }

    const abrirEditar = (correoArea) => {

        setCorreoEditar(correoArea)
        setMostrarModal(true)

    }

    const cerrarModal = () => {

        setCorreoEditar(null)
        setMostrarModal(false)

    }

    const eliminarCorreoArea = async (idCorreoArea) => {

        const confirmar = window.confirm('¿Está segura de eliminar este correo?')

        if (!confirmar) {
            return
        }

        try {

            const response = await fetch(`/api/CorreoArea/${idCorreoArea}`, {
                method: 'DELETE'
            })

            if (response.ok) {

                await obtenerCorreosArea()

            }
            else {

                alert('No fue posible eliminar el correo del área')

            }

        }
        catch (error) {

            console.error(error)

            alert('Error al conectar con el servidor')

        }

    }

    return (

        <>

            <div className="tabla-contenedor">

                <div className="tabla-header">

                    <h2>
                        Correos por Área
                    </h2>

                    <button
                        className="boton-agregar"
                        onClick={abrirNuevo}
                    >
                        Nuevo Correo
                    </button>

                </div>

                <table className="tabla">

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Área</th>
                            <th>Correo</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>

                    </thead>

                    <tbody>

                        {
                            correosArea.map((correoArea) => (

                                <tr key={correoArea.idCorreoArea}>

                                    <td>
                                        {correoArea.idCorreoArea}
                                    </td>

                                    <td>
                                        {correoArea.nombreArea}
                                    </td>

                                    <td>
                                        {correoArea.correo}
                                    </td>

                                    <td>
                                        {
                                            correoArea.activo
                                                ? 'Activo'
                                                : 'Inactivo'
                                        }
                                    </td>

                                    <td>

                                        <button
                                            className="boton-tabla editar"
                                            onClick={() => abrirEditar(correoArea)}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            className="boton-tabla eliminar"
                                            onClick={() => eliminarCorreoArea(correoArea.idCorreoArea)}
                                        >
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

                <ModalNuevoCorreoArea
                    onCerrar={cerrarModal}
                    obtenerCorreosArea={obtenerCorreosArea}
                    correoEditar={correoEditar}
                    areas={areas}
                />
            }

        </>

    )
}

export default CorreosArea
import { useEffect, useState } from 'react'
import ModalNuevoComentarioSeguimiento from '../componentes/ModalNuevoComentarioSeguimiento'

function ComentariosSeguimiento({ seguimiento, respuesta, onVolver }) {

    const [comentarios, setComentarios] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [comentarioEditar, setComentarioEditar] = useState(null)

    useEffect(() => {

        obtenerComentarios()

    }, [])

    // Carga los comentarios del seguimiento
    const obtenerComentarios = async () => {

        try {

            const response = await fetch('/api/SeguimientoComentario')

            if (response.ok) {

                const data = await response.json()

                const comentariosSeguimiento = data.filter((comentario) =>
                    comentario.idSeguimiento === seguimiento.idSeguimiento
                )

                setComentarios(comentariosSeguimiento)

            }
            else if (response.status === 204) {

                setComentarios([])

            }

        }
        catch (error) {

            console.error(error)

            alert('Error al cargar los comentarios')

        }

    }

    // Abre el modal para crear
    const abrirNuevo = () => {

        setComentarioEditar(null)
        setMostrarModal(true)

    }

    // Abre el modal para editar
    const abrirEditar = (comentario) => {

        setComentarioEditar(comentario)
        setMostrarModal(true)

    }

    // Cierra el modal
    const cerrarModal = () => {

        setComentarioEditar(null)
        setMostrarModal(false)

    }

    // Elimina un comentario
    const eliminarComentario = async (idSeguimientoComentario) => {

        const confirmar = window.confirm('¿Está segura de eliminar este comentario?')

        if (!confirmar) {
            return
        }

        try {

            const response = await fetch(`/api/SeguimientoComentario/${idSeguimientoComentario}`, {
                method: 'DELETE'
            })

            if (response.ok) {

                await obtenerComentarios()

            }
            else {

                alert('No fue posible eliminar el comentario')

            }

        }
        catch (error) {

            console.error(error)

            alert('Error al conectar con el servidor')

        }

    }

    // Da formato a la fecha
    const formatearFecha = (fecha) => {

        if (fecha === null || fecha === undefined) {
            return 'No indicada'
        }

        return new Date(fecha).toLocaleDateString()

    }

    return (

        <>

            <div className="tabla-contenedor">

                <div className="tabla-header">

                    <h2>
                        Seguimiento de la Encuesta #{seguimiento.idRespuesta}
                    </h2>

                    <div>

                        <button
                            className="boton-agregar"
                            onClick={abrirNuevo}
                        >
                            Nuevo Comentario
                        </button>

                        <button
                            className="boton-agregar"
                            onClick={onVolver}
                        >
                            Volver a Seguimientos
                        </button>

                    </div>

                </div>

                <div className="card-dashboard">

                    <h3>
                        Información de la encuesta
                    </h3>

                    <p>
                        <strong>Área:</strong> {
                            respuesta
                                ? respuesta.nombreArea
                                : 'No disponible'
                        }
                    </p>

                    <p>
                        <strong>Socio / Evento:</strong> {
                            respuesta
                                ? (respuesta.nombreSocio || respuesta.evento || 'No indicado')
                                : 'No disponible'
                        }
                    </p>

                    <p>
                        <strong>Comentario original:</strong> {
                            respuesta
                                ? (respuesta.comentario || 'Sin comentario')
                                : 'No disponible'
                        }
                    </p>

                    <p>
                        <strong>Nota general:</strong> {
                            respuesta && respuesta.notaGeneral !== null
                                ? respuesta.notaGeneral
                                : 'N/A'
                        }
                    </p>

                    <p>
                        <strong>Estado del seguimiento:</strong> {seguimiento.estado}
                    </p>

                    <p>
                        <strong>Fecha de la encuesta:</strong> {
                            respuesta
                                ? formatearFecha(respuesta.fechaRespuesta)
                                : 'No disponible'
                        }
                    </p>

                </div>

                <table className="tabla">

                    <thead>

                        <tr>
                            <th>Fecha</th>
                            <th>Comentario del seguimiento</th>
                            <th>Acciones</th>
                        </tr>

                    </thead>

                    <tbody>

                        {
                            comentarios.map((comentario) => (

                                <tr key={comentario.idSeguimientoComentario}>

                                    <td>
                                        {formatearFecha(comentario.fechaComentario)}
                                    </td>

                                    <td>
                                        {comentario.comentario}
                                    </td>

                                    <td>

                                        <button
                                            className="boton-tabla editar"
                                            onClick={() => abrirEditar(comentario)}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            className="boton-tabla eliminar"
                                            onClick={() => eliminarComentario(comentario.idSeguimientoComentario)}
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

                <ModalNuevoComentarioSeguimiento
                    onCerrar={cerrarModal}
                    obtenerComentarios={obtenerComentarios}
                    seguimiento={seguimiento}
                    comentarioEditar={comentarioEditar}
                />
            }

        </>

    )
}

export default ComentariosSeguimiento
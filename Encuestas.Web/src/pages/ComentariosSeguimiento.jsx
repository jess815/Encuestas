import { useEffect, useState } from 'react'
import ModalNuevoComentarioSeguimiento from '../componentes/ModalNuevoComentarioSeguimiento'

function ComentariosSeguimiento({
    seguimiento,
    respuesta,
    onVolver,
    usuarioLogueado
}) {

    const [comentarios, setComentarios] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [comentarioEditar, setComentarioEditar] = useState(null)

    useEffect(() => {

        obtenerComentarios()

    }, [])

    // revisa si el usuario logueado es administrador
    const esAdministrador =
        usuarioLogueado?.administrador === true

    // carga los comentarios del seguimiento
    const obtenerComentarios = async () => {

        try {

            const response = await fetch(
                '/api/SeguimientoComentario'
            )

            if (response.ok) {

                const data = await response.json()

                const comentariosSeguimiento =
                    data.filter((comentario) =>
                        comentario.idSeguimiento ===
                        seguimiento.idSeguimiento
                    )

                setComentarios(comentariosSeguimiento)

            }
            else if (response.status === 204) {

                setComentarios([])

            }

        }
        catch (error) {

            console.error(error)

            alert(
                'Error al cargar los comentarios'
            )

        }

    }

    // revisa si el comentario pertenece al usuario logueado
    const comentarioEsPropio = (comentario) => {

        return comentario.idUsuario ===
            usuarioLogueado?.idUsuario

    }

    // abre el modal para crear un comentario
    const abrirNuevo = () => {

        setComentarioEditar(null)
        setMostrarModal(true)

    }

    // abre el modal para editar un comentario propio
    const abrirEditar = (comentario) => {

        if (!comentarioEsPropio(comentario)) {

            alert(
                'Solo puede editar sus propios comentarios'
            )

            return

        }

        setComentarioEditar(comentario)
        setMostrarModal(true)

    }

    // cierra el modal de comentarios
    const cerrarModal = () => {

        setComentarioEditar(null)
        setMostrarModal(false)

    }

    // elimina un comentario cuando el usuario es administrador
    const eliminarComentario = async (
        idSeguimientoComentario
    ) => {

        if (!esAdministrador) {

            alert(
                'Solo un administrador puede eliminar comentarios'
            )

            return

        }

        const confirmar = window.confirm(
            '¿Está segura de eliminar este comentario?'
        )

        if (!confirmar) {

            return

        }

        try {

            const response = await fetch(
                `/api/SeguimientoComentario/${idSeguimientoComentario}`,
                {
                    method: 'DELETE'
                }
            )

            if (response.ok) {

                await obtenerComentarios()

            }
            else {

                alert(
                    'No fue posible eliminar el comentario'
                )

            }

        }
        catch (error) {

            console.error(error)

            alert(
                'Error al conectar con el servidor'
            )

        }

    }

    // da formato a la fecha y hora
    const formatearFecha = (fecha) => {

        if (
            fecha === null ||
            fecha === undefined
        ) {

            return 'No indicada'

        }

        return new Date(fecha)
            .toLocaleString('es-CR')

    }

    return (

        <>

            <div className="tabla-contenedor">

                <div className="tabla-header">

                    <h2>
                        Seguimiento de encuesta
                    </h2>

                    <div>

                        <button
                            className="boton-agregar"
                            onClick={abrirNuevo}
                        >
                            Nuevo comentario
                        </button>

                        <button
                            className="boton-agregar"
                            onClick={onVolver}
                        >
                            Volver a seguimientos
                        </button>

                    </div>

                </div>

                <div className="card-dashboard informacion-seguimiento">

                    <h3>
                        Información de la encuesta
                    </h3>

                    <div className="datos-seguimiento">

                        <p>
                            <strong>Área:</strong>{' '}
                            {
                                respuesta
                                    ? respuesta.nombreArea
                                    : 'No disponible'
                            }
                        </p>

                        <p>
                            <strong>Socio / Evento:</strong>{' '}
                            {
                                respuesta
                                    ? (
                                        respuesta.nombreSocio ||
                                        respuesta.evento ||
                                        'No indicado'
                                    )
                                    : 'No disponible'
                            }
                        </p>

                        <p>
                            <strong>Nota general:</strong>{' '}
                            {
                                respuesta &&
                                    respuesta.notaGeneral !== null
                                    ? respuesta.notaGeneral
                                    : 'N/A'
                            }
                        </p>

                        <p>
                            <strong>Estado del seguimiento:</strong>{' '}
                            {seguimiento.estado}
                        </p>

                        <p>
                            <strong>Fecha de la encuesta:</strong>{' '}
                            {
                                respuesta
                                    ? formatearFecha(
                                        respuesta.fechaRespuesta
                                    )
                                    : 'No disponible'
                            }
                        </p>

                    </div>

                    <div className="comentario-original-seguimiento">

                        <strong>
                            Comentario original de la encuesta
                        </strong>

                        <p>
                            {
                                respuesta
                                    ? (
                                        respuesta.comentario ||
                                        'Sin comentario'
                                    )
                                    : 'No disponible'
                            }
                        </p>

                    </div>

                </div>

                <table className="tabla">

                    <thead>

                        <tr>
                            <th>Fecha</th>
                            <th>Usuario</th>
                            <th>Comentario del seguimiento</th>
                            <th>Acciones</th>
                        </tr>

                    </thead>

                    <tbody>

                        {
                            comentarios.map((comentario) => (

                                <tr
                                    key={
                                        comentario
                                            .idSeguimientoComentario
                                    }
                                >

                                    <td>
                                        {
                                            formatearFecha(
                                                comentario.fechaComentario
                                            )
                                        }
                                    </td>

                                    <td>
                                        {
                                            comentario.nombreUsuario ||
                                            'Usuario no disponible'
                                        }
                                    </td>

                                    <td>
                                        {comentario.comentario}
                                    </td>

                                    <td>

                                        {
                                            comentarioEsPropio(comentario) &&

                                            <button
                                                className="boton-tabla editar"
                                                onClick={() =>
                                                    abrirEditar(comentario)
                                                }
                                            >
                                                Editar
                                            </button>
                                        }

                                        {
                                            esAdministrador &&

                                            <button
                                                className="boton-tabla eliminar"
                                                onClick={() =>
                                                    eliminarComentario(
                                                        comentario
                                                            .idSeguimientoComentario
                                                    )
                                                }
                                            >
                                                Eliminar
                                            </button>
                                        }

                                        {
                                            !comentarioEsPropio(comentario) &&
                                            !esAdministrador &&

                                            <span>
                                                Solo lectura
                                            </span>
                                        }

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
                    obtenerComentarios={
                        obtenerComentarios
                    }
                    seguimiento={seguimiento}
                    comentarioEditar={
                        comentarioEditar
                    }
                    usuarioLogueado={
                        usuarioLogueado
                    }
                />
            }

        </>

    )

}

export default ComentariosSeguimiento
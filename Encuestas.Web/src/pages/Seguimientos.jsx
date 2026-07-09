import { useEffect, useState } from 'react'
import ModalNuevoSeguimiento from '../componentes/ModalNuevoSeguimiento'
import ComentariosSeguimiento from './ComentariosSeguimiento'

function Seguimientos({
    areasPermitidas,
    usuarioLogueado
}) {

    const [seguimientos, setSeguimientos] = useState([])
    const [respuestas, setRespuestas] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [seguimientoEditar, setSeguimientoEditar] = useState(null)
    const [seguimientoSeleccionado, setSeguimientoSeleccionado] = useState(null)
    const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null)

    useEffect(() => {

        obtenerSeguimientos()
        obtenerRespuestas()

    }, [])

    // revisa si el usuario es administrador
    const esAdministrador =
        usuarioLogueado?.administrador === true

    // carga los seguimientos desde el api
    const obtenerSeguimientos = async () => {

        try {

            const response = await fetch('/api/Seguimiento')

            if (response.ok) {

                const data = await response.json()

                setSeguimientos(data)

            }
            else if (response.status === 204) {

                setSeguimientos([])

            }

        }
        catch (error) {

            console.error(error)

            alert('Error al cargar los seguimientos')

        }

    }

    // carga las encuestas respondidas
    const obtenerRespuestas = async () => {

        try {

            const response = await fetch('/api/Respuesta')

            if (response.ok) {

                const data = await response.json()

                setRespuestas(data)

            }
            else if (response.status === 204) {

                setRespuestas([])

            }

        }
        catch (error) {

            console.error(error)

            alert('Error al cargar las encuestas respondidas')

        }

    }

    // deja solo las respuestas de las areas permitidas
    const respuestasPermitidas = esAdministrador
        ? respuestas
        : respuestas.filter((respuesta) =>
            areasPermitidas.includes(respuesta.idArea)
        )

    // busca la encuesta relacionada al seguimiento
    const obtenerRespuestaSeguimiento = (idRespuesta) => {

        return respuestasPermitidas.find((respuesta) =>
            respuesta.idRespuesta === idRespuesta
        )

    }

    // deja solo los seguimientos que puede ver el usuario
    const seguimientosVisibles = seguimientos.filter((seguimiento) => {

        const respuesta = obtenerRespuestaSeguimiento(
            seguimiento.idRespuesta
        )

        return respuesta !== undefined

    })

    // abre el modal para crear un seguimiento
    const abrirNuevo = () => {

        setSeguimientoEditar(null)
        setMostrarModal(true)

    }

    // abre el modal para editar un seguimiento
    const abrirEditar = (seguimiento) => {

        setSeguimientoEditar(seguimiento)
        setMostrarModal(true)

    }

    // abre los comentarios del seguimiento
    const abrirComentarios = (seguimiento) => {

        const respuesta = obtenerRespuestaSeguimiento(
            seguimiento.idRespuesta
        )

        setSeguimientoSeleccionado(seguimiento)
        setRespuestaSeleccionada(respuesta)

    }

    // cierra el modal del seguimiento
    const cerrarModal = () => {

        setSeguimientoEditar(null)
        setMostrarModal(false)

    }

    // elimina un seguimiento registrado
    const eliminarSeguimiento = async (idSeguimiento) => {

        const confirmar = window.confirm(
            '¿Está segura de eliminar este seguimiento?'
        )

        if (!confirmar) {
            return
        }

        try {

            const response = await fetch(
                `/api/Seguimiento/${idSeguimiento}`,
                {
                    method: 'DELETE'
                }
            )

            if (response.ok) {

                await obtenerSeguimientos()

            }
            else {

                alert('No fue posible eliminar el seguimiento')

            }

        }
        catch (error) {

            console.error(error)

            alert('Error al conectar con el servidor')

        }

    }

    // da formato a las fechas
    const formatearFecha = (fecha) => {

        if (fecha === null || fecha === undefined) {
            return 'Pendiente'
        }

        return new Date(fecha).toLocaleDateString()

    }

    // muestra los comentarios del seguimiento seleccionado
    if (seguimientoSeleccionado !== null) {

        return (

            <ComentariosSeguimiento
                seguimiento={seguimientoSeleccionado}
                respuesta={respuestaSeleccionada}
                onVolver={() => {
                    setSeguimientoSeleccionado(null)
                    setRespuestaSeleccionada(null)
                }}
            />

        )

    }

    return (

        <>

            <div className="tabla-contenedor">

                <div className="tabla-header">

                    <h2>
                        Seguimientos de Encuestas
                    </h2>

                    <button
                        className="boton-agregar"
                        onClick={abrirNuevo}
                    >
                        Nuevo Seguimiento
                    </button>

                </div>

                {
                    seguimientosVisibles.length === 0 ?

                        <div className="card-dashboard">

                            <h3>
                                Sin seguimientos
                            </h3>

                            <p>
                                No hay seguimientos disponibles para las áreas asignadas a su usuario.
                            </p>

                        </div>

                        :

                        <table className="tabla">

                            <thead>

                                <tr>
                                    <th>Encuesta</th>
                                    <th>Área</th>
                                    <th>Socio / Evento</th>
                                    <th>Comentario de encuesta</th>
                                    <th>Nota</th>
                                    <th>Estado</th>
                                    <th>Fecha seguimiento</th>
                                    <th>Acciones</th>
                                </tr>

                            </thead>

                            <tbody>

                                {
                                    seguimientosVisibles.map((seguimiento) => {

                                        const respuesta =
                                            obtenerRespuestaSeguimiento(
                                                seguimiento.idRespuesta
                                            )

                                        return (

                                            <tr key={seguimiento.idSeguimiento}>

                                                <td>
                                                    Encuesta #{seguimiento.idRespuesta}
                                                </td>

                                                <td>
                                                    {
                                                        respuesta
                                                            ? respuesta.nombreArea
                                                            : 'Sin área'
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        respuesta
                                                            ? (
                                                                respuesta.nombreSocio ||
                                                                respuesta.evento ||
                                                                'No indicado'
                                                            )
                                                            : 'No disponible'
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        respuesta
                                                            ? (
                                                                respuesta.comentario ||
                                                                'Sin comentario'
                                                            )
                                                            : 'No disponible'
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        respuesta &&
                                                        respuesta.notaGeneral !== null
                                                            ? respuesta.notaGeneral
                                                            : 'N/A'
                                                    }
                                                </td>

                                                <td>
                                                    {seguimiento.estado}
                                                </td>

                                                <td>
                                                    {
                                                        formatearFecha(
                                                            seguimiento.fechaCreacion
                                                        )
                                                    }
                                                </td>

                                                <td>

                                                    <button
                                                        className="boton-tabla editar"
                                                        onClick={() =>
                                                            abrirComentarios(seguimiento)
                                                        }
                                                    >
                                                        Ver seguimiento
                                                    </button>

                                                    <button
                                                        className="boton-tabla editar"
                                                        onClick={() =>
                                                            abrirEditar(seguimiento)
                                                        }
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        className="boton-tabla eliminar"
                                                        onClick={() =>
                                                            eliminarSeguimiento(
                                                                seguimiento.idSeguimiento
                                                            )
                                                        }
                                                    >
                                                        Eliminar
                                                    </button>

                                                </td>

                                            </tr>

                                        )

                                    })
                                }

                            </tbody>

                        </table>
                }

            </div>

            {
                mostrarModal &&

                <ModalNuevoSeguimiento
                    onCerrar={cerrarModal}
                    obtenerSeguimientos={obtenerSeguimientos}
                    seguimientoEditar={seguimientoEditar}
                    respuestas={respuestasPermitidas}
                />
            }

        </>

    )
}

export default Seguimientos
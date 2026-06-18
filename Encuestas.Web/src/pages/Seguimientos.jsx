import { useEffect, useState } from 'react'
import ModalNuevoSeguimiento from '../componentes/ModalNuevoSeguimiento'
import ComentariosSeguimiento from './ComentariosSeguimiento'

function Seguimientos() {

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

    // Carga los seguimientos desde el API
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

    // Carga las encuestas respondidas
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

    // Busca la encuesta relacionada al seguimiento
    const obtenerRespuestaSeguimiento = (idRespuesta) => {

        return respuestas.find((respuesta) => respuesta.idRespuesta === idRespuesta)

    }

    // Abre el modal para crear
    const abrirNuevo = () => {

        setSeguimientoEditar(null)
        setMostrarModal(true)

    }

    // Abre el modal para editar
    const abrirEditar = (seguimiento) => {

        setSeguimientoEditar(seguimiento)
        setMostrarModal(true)

    }

    // Abre los comentarios del seguimiento
    const abrirComentarios = (seguimiento) => {

        const respuesta = obtenerRespuestaSeguimiento(seguimiento.idRespuesta)

        setSeguimientoSeleccionado(seguimiento)
        setRespuestaSeleccionada(respuesta)

    }

    // Cierra el modal
    const cerrarModal = () => {

        setSeguimientoEditar(null)
        setMostrarModal(false)

    }

    // Elimina un seguimiento
    const eliminarSeguimiento = async (idSeguimiento) => {

        const confirmar = window.confirm('¿Está segura de eliminar este seguimiento?')

        if (!confirmar) {
            return
        }

        try {

            const response = await fetch(`/api/Seguimiento/${idSeguimiento}`, {
                method: 'DELETE'
            })

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

    // Da formato a las fechas
    const formatearFecha = (fecha) => {

        if (fecha === null || fecha === undefined) {
            return 'Pendiente'
        }

        return new Date(fecha).toLocaleDateString()

    }

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
                            seguimientos.map((seguimiento) => {

                                const respuesta = obtenerRespuestaSeguimiento(seguimiento.idRespuesta)

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
                                                    ? (respuesta.nombreSocio || respuesta.evento || 'No indicado')
                                                    : 'No disponible'
                                            }
                                        </td>

                                        <td>
                                            {
                                                respuesta
                                                    ? (respuesta.comentario || 'Sin comentario')
                                                    : 'No disponible'
                                            }
                                        </td>

                                        <td>
                                            {
                                                respuesta && respuesta.notaGeneral !== null
                                                    ? respuesta.notaGeneral
                                                    : 'N/A'
                                            }
                                        </td>

                                        <td>
                                            {seguimiento.estado}
                                        </td>

                                        <td>
                                            {formatearFecha(seguimiento.fechaCreacion)}
                                        </td>

                                        <td>

                                            <button
                                                className="boton-tabla editar"
                                                onClick={() => abrirComentarios(seguimiento)}
                                            >
                                                Ver seguimiento
                                            </button>

                                            <button
                                                className="boton-tabla editar"
                                                onClick={() => abrirEditar(seguimiento)}
                                            >
                                                Editar
                                            </button>

                                            <button
                                                className="boton-tabla eliminar"
                                                onClick={() => eliminarSeguimiento(seguimiento.idSeguimiento)}
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

            </div>

            {
                mostrarModal &&

                <ModalNuevoSeguimiento
                    onCerrar={cerrarModal}
                    obtenerSeguimientos={obtenerSeguimientos}
                    seguimientoEditar={seguimientoEditar}
                    respuestas={respuestas}
                />
            }

        </>

    )
}

export default Seguimientos
import { useEffect, useState } from 'react'
import ModalNuevoSeguimiento from '../componentes/ModalNuevoSeguimiento'

function Seguimientos() {

    const [seguimientos, setSeguimientos] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [seguimientoEditar, setSeguimientoEditar] = useState(null)

    useEffect(() => {

        obtenerSeguimientos()

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

    return (

        <>

            <div className="tabla-contenedor">

                <div className="tabla-header">

                    <h2>
                        Administración de Seguimientos
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
                            <th>ID</th>
                            <th>ID Respuesta</th>
                            <th>Estado</th>
                            <th>Fecha creación</th>
                            <th>Fecha resolución</th>
                            <th>Acciones</th>
                        </tr>

                    </thead>

                    <tbody>

                        {
                            seguimientos.map((seguimiento) => (

                                <tr key={seguimiento.idSeguimiento}>

                                    <td>
                                        {seguimiento.idSeguimiento}
                                    </td>

                                    <td>
                                        {seguimiento.idRespuesta}
                                    </td>

                                    <td>
                                        {seguimiento.estado}
                                    </td>

                                    <td>
                                        {formatearFecha(seguimiento.fechaCreacion)}
                                    </td>

                                    <td>
                                        {formatearFecha(seguimiento.fechaResolucion)}
                                    </td>

                                    <td>

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

                            ))
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
                />
            }

        </>

    )
}

export default Seguimientos
import { useEffect, useState } from 'react'
import ModalNuevaOpcion from '../componentes/ModalNuevaOpcion'

function Opciones() {

    const [opciones, setOpciones] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [opcionEditar, setOpcionEditar] = useState(null)

    useEffect(() => {

        obtenerOpciones()

    }, [])

    // obtiene las opciones registradas
    const obtenerOpciones = async () => {

        try {

            const response = await fetch('/api/Opcion')

            if (response.ok) {

                const data = await response.json()

                setOpciones(data)

            }
            else if (response.status === 204) {

                setOpciones([])

            }

        }
        catch (error) {

            console.error(error)

            alert('Error al cargar las opciones')

        }

    }

    // abre el modal para crear una opcion
    const abrirNuevo = () => {

        setOpcionEditar(null)
        setMostrarModal(true)

    }

    // abre el modal para editar una opcion
    const abrirEditar = (opcion) => {

        setOpcionEditar(opcion)
        setMostrarModal(true)

    }

    // cierra el modal de opciones
    const cerrarModal = () => {

        setOpcionEditar(null)
        setMostrarModal(false)

    }

    // elimina una opcion registrada
    const eliminarOpcion = async (idOpcion) => {

        const confirmar = window.confirm(
            '¿Está segura de eliminar esta opción?'
        )

        if (!confirmar) {

            return

        }

        try {

            const response = await fetch(
                `/api/Opcion/${idOpcion}`,
                {
                    method: 'DELETE'
                }
            )

            if (response.ok) {

                await obtenerOpciones()

            }
            else {

                alert('No fue posible eliminar la opción')

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

                <div className="tabla-header opciones-header">

                    <h2>
                        Administración de Opciones
                    </h2>

                    <button
                        className="boton-agregar"
                        onClick={abrirNuevo}
                    >
                        Nueva Opción
                    </button>

                </div>

                <table className="tabla tabla-opciones">

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Texto</th>
                            <th>Valor</th>
                            <th>Orden visual</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>

                    </thead>

                    <tbody>

                        {
                            opciones.map((opcion) => (

                                <tr key={opcion.idOpcion}>

                                    <td data-label="ID">
                                        {opcion.idOpcion}
                                    </td>

                                    <td data-label="Texto">
                                        {opcion.texto}
                                    </td>

                                    <td data-label="Valor">
                                        {opcion.valor}
                                    </td>

                                    <td data-label="Orden visual">
                                        {opcion.ordenVisual}
                                    </td>

                                    <td data-label="Estado">
                                        {
                                            opcion.activo
                                                ? 'Activo'
                                                : 'Inactivo'
                                        }
                                    </td>

                                    <td data-label="Acciones">

                                        <div className="acciones-opciones">

                                            <button
                                                className="boton-tabla editar"
                                                onClick={() =>
                                                    abrirEditar(opcion)
                                                }
                                            >
                                                Editar
                                            </button>

                                            <button
                                                className="boton-tabla eliminar"
                                                onClick={() =>
                                                    eliminarOpcion(
                                                        opcion.idOpcion
                                                    )
                                                }
                                            >
                                                Eliminar
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

            {
                mostrarModal &&

                <ModalNuevaOpcion
                    onCerrar={cerrarModal}
                    obtenerOpciones={obtenerOpciones}
                    opcionEditar={opcionEditar}
                />
            }

        </>

    )
}

export default Opciones
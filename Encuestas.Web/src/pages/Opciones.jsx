import { useEffect, useState } from 'react'
import ModalNuevaOpcion from '../componentes/ModalNuevaOpcion'

function Opciones() {

    const [opciones, setOpciones] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [opcionEditar, setOpcionEditar] = useState(null)

    useEffect(() => {

        obtenerOpciones()

    }, [])

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

    const abrirNuevo = () => {

        setOpcionEditar(null)
        setMostrarModal(true)

    }

    const abrirEditar = (opcion) => {

        setOpcionEditar(opcion)
        setMostrarModal(true)

    }

    const cerrarModal = () => {

        setOpcionEditar(null)
        setMostrarModal(false)

    }

    const eliminarOpcion = async (idOpcion) => {

        const confirmar = window.confirm('¿Está segura de eliminar esta opción?')

        if (!confirmar) {
            return
        }

        try {

            const response = await fetch(`/api/Opcion/${idOpcion}`, {
                method: 'DELETE'
            })

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

                <div className="tabla-header">

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

                <table className="tabla">

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

                                    <td>
                                        {opcion.idOpcion}
                                    </td>

                                    <td>
                                        {opcion.texto}
                                    </td>

                                    <td>
                                        {opcion.valor}
                                    </td>

                                    <td>
                                        {opcion.ordenVisual}
                                    </td>

                                    <td>
                                        {
                                            opcion.activo
                                                ? 'Activo'
                                                : 'Inactivo'
                                        }
                                    </td>

                                    <td>

                                        <button
                                            className="boton-tabla editar"
                                            onClick={() => abrirEditar(opcion)}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            className="boton-tabla eliminar"
                                            onClick={() => eliminarOpcion(opcion.idOpcion)}
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
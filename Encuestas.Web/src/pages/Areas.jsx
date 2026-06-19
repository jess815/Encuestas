import { useState } from 'react'
import ModalNuevaArea from '../componentes/ModalNuevaArea'
import PreguntasArea from './PreguntasArea'

function Areas({ encuestas, obtenerEncuestas }) {

    const [mostrarModal, setMostrarModal] = useState(false)
    const [areaEditar, setAreaEditar] = useState(null)
    const [areaSeleccionada, setAreaSeleccionada] = useState(null)

    // Convierte el nombre del área para usarlo en la URL
    const crearSlug = (texto) => {

        return texto
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s/g, '')
            .replace(/[^a-z0-9]/g, '')

    }

    // Copia el enlace de la encuesta
    const copiarEnlace = async (area) => {

        const slug = crearSlug(area.nombre)
        const enlace = `${window.location.origin}/encuestas/${slug}`

        try {

            await navigator.clipboard.writeText(enlace)

            alert('Enlace copiado correctamente')

        }
        catch (error) {

            console.error(error)

            alert(enlace)

        }

    }

    // Abre el modal para crear
    const abrirNuevo = () => {

        setAreaEditar(null)
        setMostrarModal(true)

    }

    // Abre el modal para editar
    const abrirEditar = (area) => {

        setAreaEditar(area)
        setMostrarModal(true)

    }

    // Cierra el modal
    const cerrarModal = () => {

        setAreaEditar(null)
        setMostrarModal(false)

    }

    // Elimina un área
    const eliminarArea = async (idArea) => {

        const confirmar = window.confirm('¿Está segura de eliminar esta área?')

        if (!confirmar) {
            return
        }

        try {

            const response = await fetch(`/api/Encuesta/${idArea}`, {
                method: 'DELETE'
            })

            if (response.ok) {

                await obtenerEncuestas()

            }
            else {

                alert('No fue posible eliminar el área')

            }

        }
        catch (error) {

            console.error(error)

            alert('Error al conectar con el servidor')

        }

    }

    if (areaSeleccionada !== null) {

        return (

            <PreguntasArea
                area={areaSeleccionada}
                onVolver={() => setAreaSeleccionada(null)}
            />

        )

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
                            <th>Tipo</th>
                            <th>Estado</th>
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
                                        {area.tipo}
                                    </td>

                                    <td>
                                        {
                                            area.activo
                                                ? 'Activo'
                                                : 'Inactivo'
                                        }
                                    </td>

                                    <td>

                                        <button
                                            className="boton-tabla editar"
                                            onClick={() => copiarEnlace(area)}
                                        >
                                            Copiar enlace
                                        </button>

                                        <button
                                            className="boton-tabla editar"
                                            onClick={() => setAreaSeleccionada(area)}
                                        >
                                            Ver preguntas
                                        </button>

                                        <button
                                            className="boton-tabla editar"
                                            onClick={() => abrirEditar(area)}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            className="boton-tabla eliminar"
                                            onClick={() => eliminarArea(area.idArea)}
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
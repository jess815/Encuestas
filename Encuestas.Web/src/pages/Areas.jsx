import { useState } from 'react'
import ModalNuevaArea from '../componentes/ModalNuevaArea'
import PreguntasArea from './PreguntasArea'

function Areas({
    encuestas,
    obtenerEncuestas,
    areasPermitidas,
    usuarioLogueado
}) {

    const [mostrarModal, setMostrarModal] = useState(false)
    const [areaEditar, setAreaEditar] = useState(null)
    const [areaSeleccionada, setAreaSeleccionada] = useState(null)

    // revisa si el usuario es administrador
    const esAdministrador =
        usuarioLogueado?.administrador === true

    // deja solo las areas que puede ver el usuario
    const areasVisibles = esAdministrador
        ? encuestas
        : encuestas.filter((area) =>
            areasPermitidas.includes(area.idArea)
        )

    // convierte el nombre del area en una ruta valida
    const crearSlug = (texto = '') => {

        return String(texto)
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s/g, '')
            .replace(/[^a-z0-9]/g, '')

    }

    // construye el enlace completo de la encuesta
    const obtenerEnlaceEncuesta = (area) => {

        const slug = crearSlug(area.nombre)

        return `${window.location.origin}/encuestas/${slug}`

    }

    // copia el enlace de la encuesta
    const copiarEnlace = async (area) => {

        const enlace = obtenerEnlaceEncuesta(area)

        try {

            await navigator.clipboard.writeText(enlace)

            alert('Enlace copiado correctamente')

        }
        catch (error) {

            console.error(error)

            alert(enlace)

        }

    }

    // abre la encuesta en otra pestana
    const abrirEncuesta = (area) => {

        const enlace = obtenerEnlaceEncuesta(area)

        window.open(enlace, '_blank')

    }

    // abre el modal para crear una nueva area
    const abrirNuevo = () => {

        setAreaEditar(null)
        setMostrarModal(true)

    }

    // abre el modal para editar un area
    const abrirEditar = (area) => {

        setAreaEditar(area)
        setMostrarModal(true)

    }

    // cierra el modal del area
    const cerrarModal = () => {

        setAreaEditar(null)
        setMostrarModal(false)

    }

    // elimina un area registrada
    const eliminarArea = async (idArea) => {

        const confirmar = window.confirm(
            '¿Está segura de eliminar esta área?'
        )

        if (!confirmar) {
            return
        }

        try {

            const response = await fetch(
                `/api/Encuesta/${idArea}`,
                {
                    method: 'DELETE'
                }
            )

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

    // muestra las preguntas del area seleccionada
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

                    {
                        esAdministrador &&

                        <button
                            className="boton-agregar"
                            onClick={abrirNuevo}
                        >
                            Nueva Área
                        </button>
                    }

                </div>

                {
                    areasVisibles.length === 0 ?

                        <div className="card-dashboard">

                            <h3>
                                Sin áreas asignadas
                            </h3>

                            <p>
                                Su usuario no tiene áreas disponibles para administrar.
                            </p>

                        </div>

                        :

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
                                    areasVisibles.map((area) => (

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
                                                    onClick={() => abrirEncuesta(area)}
                                                >
                                                    Abrir encuesta
                                                </button>

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

                                                {
                                                    esAdministrador &&

                                                    <>

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

                                                    </>
                                                }

                                            </td>

                                        </tr>

                                    ))
                                }

                            </tbody>

                        </table>
                }

            </div>

            {
                mostrarModal && esAdministrador &&

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
import { useState } from 'react'
import ModalNuevaArea from '../componentes/ModalNuevaArea'
import PreguntasArea from './PreguntasArea'

function Areas({
    encuestas,
    obtenerEncuestas,
    usuarioLogueado
}) {

    const [mostrarModal, setMostrarModal] = useState(false)
    const [areaEditar, setAreaEditar] = useState(null)
    const [areaSeleccionada, setAreaSeleccionada] = useState(null)

    // revisa si el usuario es administrador
    const esAdministrador =
        usuarioLogueado?.administrador === true

    // convierte el nombre del area en una ruta valida
    const crearSlug = (texto = '') => {

        return String(texto)
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s/g, '')
            .replace(/[^a-z0-9]/g, '')

    }

    // revisa si el usuario puede ver el area
    const puedeVerArea = (area) => {

        if (esAdministrador) {

            return true

        }

        const slugArea = crearSlug(area.nombre)

        if (slugArea === 'elceibo') {

            return usuarioLogueado?.ceibo === true

        }

        if (slugArea === 'faroles') {

            return usuarioLogueado?.faroles === true

        }

        if (slugArea === 'hoyo19') {

            return usuarioLogueado?.hoyo19 === true

        }

        if (slugArea === 'pinrojo') {

            return usuarioLogueado?.pinRojo === true

        }

        if (slugArea === 'canabrava') {

            return usuarioLogueado?.canaBrava === true

        }

        if (slugArea === 'eventos') {

            return usuarioLogueado?.eventos === true

        }

        return false

    }

    // deja solo las areas que puede ver el usuario
    const areasVisibles = encuestas.filter((area) =>
        puedeVerArea(area)
    )

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

                    <div>

                        <h2>
                            {
                                esAdministrador
                                    ? 'Administración de Áreas'
                                    : 'Encuestas de mis Áreas'
                            }
                        </h2>

                        <p>
                            {
                                esAdministrador
                                    ? 'Configure las áreas, correos y preguntas de las encuestas.'
                                    : 'Estas son las áreas asignadas a su usuario.'
                            }
                        </p>

                    </div>

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
                                Su usuario no tiene áreas disponibles.
                            </p>

                        </div>

                        :

                        <table className="tabla">

                            <thead>

                                <tr>
                                    <th>Área</th>
                                    <th>Tipo</th>

                                    {
                                        esAdministrador &&

                                        <>
                                            <th>Correo general</th>
                                            <th>Correo del área</th>
                                        </>
                                    }

                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>

                            </thead>

                            <tbody>

                                {
                                    areasVisibles.map((area) => (

                                        <tr key={area.idArea}>

                                            <td>
                                                {area.nombre}
                                            </td>

                                            <td>
                                                {area.tipo}
                                            </td>

                                            {
                                                esAdministrador &&

                                                <>
                                                    <td>
                                                        {
                                                            area.correoGeneral ||
                                                            'Sin configurar'
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            area.correoArea ||
                                                            'Sin configurar'
                                                        }
                                                    </td>
                                                </>
                                            }

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
                                                    onClick={() =>
                                                        abrirEncuesta(area)
                                                    }
                                                >
                                                    Abrir encuesta
                                                </button>

                                                <button
                                                    className="boton-tabla editar"
                                                    onClick={() =>
                                                        copiarEnlace(area)
                                                    }
                                                >
                                                    Copiar enlace
                                                </button>

                                                <button
                                                    className="boton-tabla editar"
                                                    onClick={() =>
                                                        setAreaSeleccionada(area)
                                                    }
                                                >
                                                    Ver preguntas
                                                </button>

                                                {
                                                    esAdministrador &&

                                                    <>

                                                        <button
                                                            className="boton-tabla editar"
                                                            onClick={() =>
                                                                abrirEditar(area)
                                                            }
                                                        >
                                                            Editar
                                                        </button>

                                                        <button
                                                            className="boton-tabla eliminar"
                                                            onClick={() =>
                                                                eliminarArea(
                                                                    area.idArea
                                                                )
                                                            }
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
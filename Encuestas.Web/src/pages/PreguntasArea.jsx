import { useEffect, useState } from 'react'
import ModalNuevaPregunta from '../componentes/ModalNuevaPregunta'

function PreguntasArea({ area, onVolver }) {

    const [preguntas, setPreguntas] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [preguntaEditar, setPreguntaEditar] = useState(null)

    useEffect(() => {

        obtenerPreguntas()

    }, [])

    const obtenerPreguntas = async () => {

        try {

            const response = await fetch('/api/Pregunta')

            if (response.ok) {

                const data = await response.json()

                const preguntasArea = data.filter((pregunta) => pregunta.idArea === area.idArea)

                setPreguntas(preguntasArea)

            }
            else if (response.status === 204) {

                setPreguntas([])

            }

        }
        catch (error) {

            console.error(error)

            alert('Error al cargar las preguntas')

        }

    }

    const abrirNuevo = () => {

        setPreguntaEditar(null)
        setMostrarModal(true)

    }

    const abrirEditar = (pregunta) => {

        setPreguntaEditar(pregunta)
        setMostrarModal(true)

    }

    const cerrarModal = () => {

        setPreguntaEditar(null)
        setMostrarModal(false)

    }

    const eliminarPregunta = async (idPregunta) => {

        const confirmar = window.confirm('¿Está segura de eliminar esta pregunta?')

        if (!confirmar) {
            return
        }

        try {

            const response = await fetch(`/api/Pregunta/${idPregunta}`, {
                method: 'DELETE'
            })

            if (response.ok) {

                await obtenerPreguntas()

            }
            else {

                alert('No fue posible eliminar la pregunta')

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
                        Preguntas de {area.nombre}
                    </h2>

                    <div>

                        <button
                            className="boton-agregar"
                            onClick={abrirNuevo}
                        >
                            Nueva Pregunta
                        </button>

                        <button
                            className="boton-agregar"
                            onClick={onVolver}
                        >
                            Volver a Áreas
                        </button>

                    </div>

                </div>

                <table className="tabla">

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Pregunta</th>
                            <th>Orden</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>

                    </thead>

                    <tbody>

                        {
                            preguntas.map((pregunta) => (

                                <tr key={pregunta.idPregunta}>

                                    <td>
                                        {pregunta.idPregunta}
                                    </td>

                                    <td>
                                        {pregunta.texto}
                                    </td>

                                    <td>
                                        {pregunta.ordenPregunta}
                                    </td>

                                    <td>
                                        {
                                            pregunta.activo
                                                ? 'Activo'
                                                : 'Inactivo'
                                        }
                                    </td>

                                    <td>

                                        <button
                                            className="boton-tabla editar"
                                            onClick={() => abrirEditar(pregunta)}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            className="boton-tabla eliminar"
                                            onClick={() => eliminarPregunta(pregunta.idPregunta)}
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

                <ModalNuevaPregunta
                    onCerrar={cerrarModal}
                    obtenerPreguntas={obtenerPreguntas}
                    area={area}
                    preguntaEditar={preguntaEditar}
                />
            }

        </>

    )
}

export default PreguntasArea
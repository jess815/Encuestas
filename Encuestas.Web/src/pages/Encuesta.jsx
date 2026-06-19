import { useEffect, useState } from 'react'

function Encuesta({ slugArea }) {

    const [areas, setAreas] = useState([])
    const [preguntas, setPreguntas] = useState([])
    const [opciones, setOpciones] = useState([])

    const [nombreSocio, setNombreSocio] = useState('')
    const [evento, setEvento] = useState('')
    const [comentario, setComentario] = useState('')
    const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState({})
    const [preguntasFaltantes, setPreguntasFaltantes] = useState([])

    const [mostrarAvisoIncompleto, setMostrarAvisoIncompleto] = useState(false)
    const [cargandoDatos, setCargandoDatos] = useState(true)
    const [enviando, setEnviando] = useState(false)
    const [encuestaEnviada, setEncuestaEnviada] = useState(false)

    useEffect(() => {

        cargarDatosEncuesta()

    }, [])

    // Carga las áreas, preguntas y opciones necesarias para la encuesta
    const cargarDatosEncuesta = async () => {

        try {

            setCargandoDatos(true)

            const responseAreas = await fetch('/api/Encuesta')
            const responsePreguntas = await fetch('/api/Pregunta')
            const responseOpciones = await fetch('/api/Opcion')

            if (responseAreas.ok) {
                const dataAreas = await responseAreas.json()
                setAreas(dataAreas)
            }

            if (responsePreguntas.ok) {
                const dataPreguntas = await responsePreguntas.json()
                setPreguntas(dataPreguntas)
            }
            else if (responsePreguntas.status === 204) {
                setPreguntas([])
            }

            if (responseOpciones.ok) {
                const dataOpciones = await responseOpciones.json()
                setOpciones(dataOpciones)
            }
            else if (responseOpciones.status === 204) {
                setOpciones([])
            }

        }
        catch (error) {

            console.error(error)

            alert('Error al cargar la encuesta')

        }
        finally {

            setCargandoDatos(false)

        }

    }

    // Convierte el nombre del área en una ruta válida
    const crearSlug = (texto = '') => {

        return String(texto)
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s/g, '')
            .replace(/[^a-z0-9]/g, '')

    }

    // Obtiene la fecha actual del sistema
    const obtenerFechaSistema = () => {

        return new Date().toISOString().split('T')[0]

    }

    // Guarda la opción seleccionada y limpia el aviso de esa pregunta
    const seleccionarOpcion = (pregunta, opcion) => {

        const nuevasFaltantes = preguntasFaltantes.filter((idPregunta) =>
            idPregunta !== pregunta.idPregunta
        )

        setRespuestasSeleccionadas({
            ...respuestasSeleccionadas,
            [pregunta.idPregunta]: opcion
        })

        setPreguntasFaltantes(nuevasFaltantes)

        if (nuevasFaltantes.length === 0) {
            setMostrarAvisoIncompleto(false)
        }

    }

    // Obtiene las preguntas que todavía no tienen respuesta
    const obtenerPreguntasSinResponder = () => {

        return preguntasFiltradas
            .filter((pregunta) => respuestasSeleccionadas[pregunta.idPregunta] === undefined)
            .map((pregunta) => pregunta.idPregunta)

    }

    // Obtiene únicamente las preguntas respondidas
    const obtenerPreguntasRespondidas = () => {

        return preguntasFiltradas
            .filter((pregunta) => respuestasSeleccionadas[pregunta.idPregunta] !== undefined)

    }

    // Calcula la nota solo con las preguntas respondidas
    const calcularNotaGeneral = () => {

        const preguntasRespondidas = obtenerPreguntasRespondidas()

        if (preguntasRespondidas.length === 0 || opcionesActivas.length === 0) {
            return 0
        }

        const valorMaximo = Math.max(...opcionesActivas.map((opcion) => opcion.valor))

        const totalObtenido = preguntasRespondidas.reduce((total, pregunta) => {

            const opcionSeleccionada = respuestasSeleccionadas[pregunta.idPregunta]

            return total + opcionSeleccionada.valor

        }, 0)

        const totalPosible = preguntasRespondidas.length * valorMaximo

        return Number(((totalObtenido / totalPosible) * 100).toFixed(2))

    }

    // Envía la encuesta al API
    const enviarEncuesta = async (confirmarEnvioIncompleto = false) => {

        if (areaSeleccionada === undefined) {
            alert('La encuesta no está disponible')
            return
        }

        if (preguntasFiltradas.length === 0) {
            alert('Esta encuesta no tiene preguntas activas')
            return
        }

        const faltantes = obtenerPreguntasSinResponder()

        setPreguntasFaltantes(faltantes)

        if (faltantes.length > 0 && !confirmarEnvioIncompleto) {
            setMostrarAvisoIncompleto(true)
            return
        }

        try {

            setEnviando(true)

            const notaGeneral = calcularNotaGeneral()
            const preguntasRespondidas = obtenerPreguntasRespondidas()

            const detalleRespuestas = preguntasRespondidas.map((pregunta) => {

                const opcionSeleccionada = respuestasSeleccionadas[pregunta.idPregunta]

                return {
                    idPregunta: pregunta.idPregunta,
                    idOpcion: opcionSeleccionada.idOpcion,
                    valorCalculado: opcionSeleccionada.valor
                }

            })

            const response = await fetch('/api/Respuesta', {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    idArea: areaSeleccionada.idArea,
                    nombreSocio: nombreSocio.trim() === '' ? null : nombreSocio,
                    evento: esEncuestaEventos && evento.trim() !== '' ? evento : null,
                    fechaEvento: obtenerFechaSistema(),
                    comentario: comentario.trim() === '' ? null : comentario,
                    notaGeneral: notaGeneral,
                    alerta: preguntasRespondidas.length > 0 && notaGeneral < 70,
                    detalleRespuestas: detalleRespuestas
                })

            })

            if (response.ok) {
                setEncuestaEnviada(true)
            }
            else {
                alert('No fue posible enviar la encuesta')
            }

        }
        catch (error) {

            console.error(error)

            alert('Error al conectar con el servidor')

        }
        finally {

            setEnviando(false)

        }

    }

    // Limpia la encuesta para registrar otra respuesta
    const nuevaEncuesta = () => {

        setNombreSocio('')
        setEvento('')
        setComentario('')
        setRespuestasSeleccionadas({})
        setPreguntasFaltantes([])
        setMostrarAvisoIncompleto(false)
        setEncuestaEnviada(false)

    }

    const areasActivas = areas.filter((area) => area.activo)

    const areaSeleccionada = areasActivas.find((area) =>
        crearSlug(area.nombre) === slugArea
    )

    const esEncuestaEventos = areaSeleccionada !== undefined &&
        (
            crearSlug(areaSeleccionada.nombre) === 'eventos' ||
            crearSlug(areaSeleccionada.tipo) === 'eventos' ||
            crearSlug(areaSeleccionada.tipo) === 'evento'
        )

    const preguntasFiltradas = areaSeleccionada === undefined
        ? []
        : preguntas
            .filter((pregunta) => pregunta.idArea === areaSeleccionada.idArea && pregunta.activo)
            .sort((a, b) => a.ordenPregunta - b.ordenPregunta)

    const opcionesActivas = opciones
        .filter((opcion) => opcion.activo)
        .sort((a, b) => a.ordenVisual - b.ordenVisual)

    const cantidadRespondidas = obtenerPreguntasRespondidas().length
    const totalPreguntas = preguntasFiltradas.length

    const porcentajeAvance = totalPreguntas === 0
        ? 0
        : Math.round((cantidadRespondidas / totalPreguntas) * 100)

    if (cargandoDatos) {

        return (

            <div className="encuesta-publica">

                <div className="encuesta-mensaje">

                    <h1>
                        Cargando encuesta
                    </h1>

                    <p>
                        Por favor espere un momento.
                    </p>

                </div>

            </div>

        )

    }

    if (areaSeleccionada === undefined) {

        return (

            <div className="encuesta-publica">

                <div className="encuesta-mensaje">

                    <h1>
                        Encuesta no disponible
                    </h1>

                    <p>
                        La encuesta solicitada no existe o no se encuentra activa.
                    </p>

                </div>

            </div>

        )

    }

    if (encuestaEnviada) {

        return (

            <div className="encuesta-publica">

                <div className="encuesta-confirmacion">

                    <div className="confirmacion-icono">
                        ✓
                    </div>

                    <h1>
                        Respuesta registrada
                    </h1>

                    <p>
                        Gracias por compartir su opinión.
                    </p>

                    <p className="confirmacion-detalle">
                        Sus comentarios nos ayudan a mejorar la experiencia en el Club.
                    </p>

                    <button
                        className="boton"
                        onClick={nuevaEncuesta}
                    >
                        Registrar otra respuesta
                    </button>

                </div>

            </div>

        )

    }

    return (

        <div className="encuesta-publica">

            <div className="encuesta-contenido">

                <div className="encuesta-encabezado">

                    <p>
                        Costa Rica Country Club
                    </p>

                    <h1>
                        Encuesta de satisfacción
                    </h1>

                    <h2>
                        {areaSeleccionada.nombre}
                    </h2>

                </div>

                <div className="encuesta-seccion">

                    <label>
                        Nombre del socio
                    </label>

                    <input
                        type="text"
                        placeholder="Opcional"
                        className="input"
                        value={nombreSocio}
                        onChange={(e) => setNombreSocio(e.target.value)}
                    />

                    {
                        esEncuestaEventos &&

                        <>

                            <label>
                                Nombre del evento
                            </label>

                            <input
                                type="text"
                                placeholder="Opcional"
                                className="input"
                                value={evento}
                                onChange={(e) => setEvento(e.target.value)}
                            />

                        </>
                    }

                </div>

                <div className="encuesta-seccion">

                    <div className="encuesta-titulo-progreso">

                        <h3>
                            Preguntas
                        </h3>

                        <span>
                            {cantidadRespondidas} de {totalPreguntas} respondidas
                        </span>

                    </div>

                    <div className="avance-encuesta">

                        <div className="avance-barra">

                            <div
                                className="avance-barra-interna"
                                style={{ width: `${porcentajeAvance}%` }}
                            >
                            </div>

                        </div>

                    </div>

                    {
                        mostrarAvisoIncompleto && preguntasFaltantes.length > 0 &&

                        <div className="aviso-encuesta-incompleta">

                            <strong>
                                Quedan {preguntasFaltantes.length} preguntas sin responder.
                            </strong>

                            <p>
                                Puede completarlas o enviar la encuesta de todas formas.
                            </p>

                        </div>
                    }

                    {
                        preguntasFiltradas.length === 0 ?

                            <p>
                                Esta encuesta no tiene preguntas activas.
                            </p>

                            :

                            preguntasFiltradas.map((pregunta, index) => (

                                <div
                                    key={pregunta.idPregunta}
                                    className={
                                        preguntasFaltantes.includes(pregunta.idPregunta)
                                            ? 'pregunta-card pregunta-pendiente'
                                            : 'pregunta-card'
                                    }
                                >

                                    <span className="numero-pregunta">
                                        Pregunta {index + 1}
                                    </span>

                                    <h3>
                                        {pregunta.texto}
                                    </h3>

                                    {
                                        preguntasFaltantes.includes(pregunta.idPregunta) &&

                                        <p className="mensaje-pregunta-pendiente">
                                            Falta por responder.
                                        </p>
                                    }

                                    <div className="opciones-encuesta">

                                        {
                                            opcionesActivas.map((opcion) => (

                                                <label
                                                    key={opcion.idOpcion}
                                                    className="opcion-encuesta"
                                                >

                                                    <input
                                                        type="radio"
                                                        name={`pregunta-${pregunta.idPregunta}`}
                                                        checked={
                                                            respuestasSeleccionadas[pregunta.idPregunta]?.idOpcion === opcion.idOpcion
                                                        }
                                                        onChange={() => seleccionarOpcion(pregunta, opcion)}
                                                    />

                                                    <span>
                                                        {opcion.texto}
                                                    </span>

                                                </label>

                                            ))
                                        }

                                    </div>

                                </div>

                            ))
                    }

                </div>

                {
                    preguntasFiltradas.length > 0 &&

                    <div className="encuesta-seccion">

                        <label>
                            Comentario general
                        </label>

                        <textarea
                            placeholder="Escriba un comentario si desea agregar más información"
                            className="input"
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                        />

                        <button
                            className="boton"
                            onClick={() =>
                                enviarEncuesta(mostrarAvisoIncompleto && preguntasFaltantes.length > 0)
                            }
                            disabled={enviando}
                        >
                            {
                                enviando
                                    ? 'Enviando...'
                                    : mostrarAvisoIncompleto && preguntasFaltantes.length > 0
                                        ? 'Enviar de todas formas'
                                        : 'Enviar encuesta'
                            }
                        </button>

                    </div>
                }

            </div>

        </div>

    )
}

export default Encuesta
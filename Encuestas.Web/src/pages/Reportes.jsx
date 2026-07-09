import { useEffect, useState } from 'react'

function Reportes() {

    const [respuestas, setRespuestas] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const [areaFiltro, setAreaFiltro] = useState('')
    const [alertaFiltro, setAlertaFiltro] = useState('')

    const [respuestaDetalle, setRespuestaDetalle] = useState(null)
    const [mostrarDetalle, setMostrarDetalle] = useState(false)
    const [cargandoDetalle, setCargandoDetalle] = useState(false)

    useEffect(() => {

        obtenerRespuestas()

    }, [])

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

            alert('Error al cargar los reportes')

        }

    }

    // Da formato a las fechas
    const formatearFecha = (fecha) => {

        if (fecha === null || fecha === undefined) {
            return 'No indicada'
        }

        return new Date(fecha).toLocaleDateString()

    }

    // Limpia los filtros
    const limpiarFiltros = () => {

        setBusqueda('')
        setAreaFiltro('')
        setAlertaFiltro('')

    }

    // Evita problemas con comillas al exportar
    const limpiarTexto = (valor) => {

        if (valor === null || valor === undefined) {
            return ''
        }

        return String(valor).replace(/"/g, '""')

    }

    // Abre el detalle de una encuesta respondida
    const abrirDetalle = async (respuesta) => {

        try {

            setCargandoDetalle(true)
            setMostrarDetalle(true)

            const tieneDetalle = respuesta.detalleRespuestas !== undefined &&
                respuesta.detalleRespuestas !== null

            if (tieneDetalle) {

                setRespuestaDetalle(respuesta)

            }
            else {

                const response = await fetch(`/api/Respuesta/${respuesta.idRespuesta}`)

                if (response.ok) {

                    const data = await response.json()

                    setRespuestaDetalle(data)

                }
                else {

                    setRespuestaDetalle(respuesta)

                }

            }

        }
        catch (error) {

            console.error(error)

            setRespuestaDetalle(respuesta)

        }
        finally {

            setCargandoDetalle(false)

        }

    }

    // Cierra el detalle de la encuesta
    const cerrarDetalle = () => {

        setRespuestaDetalle(null)
        setMostrarDetalle(false)
        setCargandoDetalle(false)

    }

    // Exporta los resultados filtrados
    const exportarExcel = () => {

        if (respuestasFiltradas.length === 0) {
            alert('No hay datos para exportar')
            return
        }

        const separador = ';'

        const encabezados = [
            'ID',
            'Área',
            'Socio o Evento',
            'Comentario',
            'Nota General',
            'Alerta',
            'Fecha Respuesta'
        ]

        const filas = respuestasFiltradas.map((respuesta) => [
            respuesta.idRespuesta,
            respuesta.nombreArea,
            respuesta.nombreSocio || respuesta.evento || 'No indicado',
            respuesta.comentario || 'Sin comentario',
            respuesta.notaGeneral !== null ? respuesta.notaGeneral : 'N/A',
            respuesta.alerta ? 'Sí' : 'No',
            formatearFecha(respuesta.fechaRespuesta)
        ])

        const contenidoTabla = [
            encabezados,
            ...filas
        ]
            .map((fila) =>
                fila.map((columna) => `"${limpiarTexto(columna)}"`).join(separador)
            )
            .join('\n')

        const contenido = `sep=;\n${contenidoTabla}`

        const archivo = new Blob([`\uFEFF${contenido}`], {
            type: 'text/csv;charset=utf-8;'
        })

        const url = URL.createObjectURL(archivo)

        const enlace = document.createElement('a')
        enlace.href = url
        enlace.download = 'reporte_encuestas.csv'
        enlace.click()

        URL.revokeObjectURL(url)

    }

    // Obtiene las áreas únicas para el filtro
    const areasUnicas = [...new Set(respuestas.map((respuesta) => respuesta.nombreArea))]

    // Aplica los filtros del reporte
    const respuestasFiltradas = respuestas.filter((respuesta) => {

        const textoBusqueda = busqueda.toLowerCase()

        const coincideBusqueda =
            (respuesta.nombreSocio || '').toLowerCase().includes(textoBusqueda) ||
            (respuesta.evento || '').toLowerCase().includes(textoBusqueda) ||
            (respuesta.comentario || '').toLowerCase().includes(textoBusqueda) ||
            (respuesta.nombreArea || '').toLowerCase().includes(textoBusqueda)

        const coincideArea =
            areaFiltro === '' || respuesta.nombreArea === areaFiltro

        const coincideAlerta =
            alertaFiltro === '' ||
            (alertaFiltro === 'si' && respuesta.alerta === true) ||
            (alertaFiltro === 'no' && respuesta.alerta === false)

        return coincideBusqueda && coincideArea && coincideAlerta

    })

    return (

        <>

            <div className="tabla-contenedor">

                <div className="tabla-header">

                    <h2>
                        Reporte de Encuestas Respondidas
                    </h2>

                    <button
                        className="boton-agregar"
                        onClick={exportarExcel}
                    >
                        Exportar Excel
                    </button>

                </div>

                <div className="card-dashboard">

                    <h3>
                        Filtros
                    </h3>

                    <label>
                        Buscar
                    </label>

                    <input
                        type="text"
                        placeholder="Buscar por socio, evento, área o comentario"
                        className="input"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />

                    <label>
                        Área
                    </label>

                    <select
                        className="input"
                        value={areaFiltro}
                        onChange={(e) => setAreaFiltro(e.target.value)}
                    >
                        <option value="">
                            Todas las áreas
                        </option>

                        {
                            areasUnicas.map((area) => (

                                <option
                                    key={area}
                                    value={area}
                                >
                                    {area}
                                </option>

                            ))
                        }
                    </select>

                    <label>
                        Alerta
                    </label>

                    <select
                        className="input"
                        value={alertaFiltro}
                        onChange={(e) => setAlertaFiltro(e.target.value)}
                    >
                        <option value="">
                            Todas
                        </option>

                        <option value="si">
                            Con alerta
                        </option>

                        <option value="no">
                            Sin alerta
                        </option>
                    </select>

                    <button
                        className="boton"
                        onClick={limpiarFiltros}
                    >
                        Limpiar filtros
                    </button>

                </div>

                <p>
                    Total de resultados: {respuestasFiltradas.length}
                </p>

                <table className="tabla">

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Área</th>
                            <th>Socio / Evento</th>
                            <th>Comentario</th>
                            <th>Nota general</th>
                            <th>Alerta</th>
                            <th>Fecha respuesta</th>
                            <th>Acciones</th>
                        </tr>

                    </thead>

                    <tbody>

                        {
                            respuestasFiltradas.map((respuesta) => (

                                <tr key={respuesta.idRespuesta}>

                                    <td>
                                        {respuesta.idRespuesta}
                                    </td>

                                    <td>
                                        {respuesta.nombreArea}
                                    </td>

                                    <td>
                                        {
                                            respuesta.nombreSocio || respuesta.evento || 'No indicado'
                                        }
                                    </td>

                                    <td>
                                        {
                                            respuesta.comentario || 'Sin comentario'
                                        }
                                    </td>

                                    <td>
                                        {
                                            respuesta.notaGeneral !== null
                                                ? respuesta.notaGeneral
                                                : 'N/A'
                                        }
                                    </td>

                                    <td>
                                        {
                                            respuesta.alerta
                                                ? 'Sí'
                                                : 'No'
                                        }
                                    </td>

                                    <td>
                                        {formatearFecha(respuesta.fechaRespuesta)}
                                    </td>

                                    <td>

                                        <button
                                            className="boton-tabla editar"
                                            onClick={() => abrirDetalle(respuesta)}
                                        >
                                            Ver detalle
                                        </button>

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

            {
                mostrarDetalle &&

                <div className="modal-overlay">

                    <div className="modal modal-detalle-reporte">

                        <h2>
                            Detalle de encuesta
                        </h2>

                        {
                            cargandoDetalle ?

                                <p>
                                    Cargando detalle...
                                </p>

                                :

                                respuestaDetalle !== null &&

                                <>

                                    <div className="detalle-resumen">

                                        <p>
                                            <strong>ID:</strong> {respuestaDetalle.idRespuesta}
                                        </p>

                                        <p>
                                            <strong>Área:</strong> {respuestaDetalle.nombreArea}
                                        </p>

                                        <p>
                                            <strong>Socio:</strong> {respuestaDetalle.nombreSocio || 'No indicado'}
                                        </p>

                                        <p>
                                            <strong>Evento:</strong> {respuestaDetalle.evento || 'No indicado'}
                                        </p>

                                        <p>
                                            <strong>Nota general:</strong> {
                                                respuestaDetalle.notaGeneral !== null
                                                    ? `${respuestaDetalle.notaGeneral}%`
                                                    : 'N/A'
                                            }
                                        </p>

                                        <p>
                                            <strong>Alerta:</strong> {
                                                respuestaDetalle.alerta
                                                    ? 'Sí'
                                                    : 'No'
                                            }
                                        </p>

                                        <p>
                                            <strong>Fecha:</strong> {formatearFecha(respuestaDetalle.fechaRespuesta)}
                                        </p>

                                        <p>
                                            <strong>Comentario:</strong> {respuestaDetalle.comentario || 'Sin comentario'}
                                        </p>

                                    </div>

                                    <h3>
                                        Respuestas registradas
                                    </h3>

                                    {
                                        respuestaDetalle.detalleRespuestas !== undefined &&
                                            respuestaDetalle.detalleRespuestas !== null &&
                                            respuestaDetalle.detalleRespuestas.length > 0 ?

                                            <div className="detalle-preguntas">

                                                {
                                                    respuestaDetalle.detalleRespuestas.map((detalle, index) => (

                                                        <div
                                                            key={detalle.idRespuestaDetalle}
                                                            className="detalle-pregunta-card"
                                                        >

                                                            <span>
                                                                Pregunta {index + 1}
                                                            </span>

                                                            <p>
                                                                <strong>
                                                                    {detalle.textoPregunta}
                                                                </strong>
                                                            </p>

                                                            <p>
                                                                Respuesta: {detalle.textoOpcion}
                                                            </p>

                                                            <p>
                                                                Valor: {detalle.valorCalculado}
                                                            </p>

                                                        </div>

                                                    ))
                                                }

                                            </div>

                                            :

                                            <p>
                                                Esta encuesta no tiene detalle de respuestas registrado.
                                            </p>
                                    }

                                </>
                        }

                        <div className="modal-botones">

                            <button
                                className="boton"
                                onClick={cerrarDetalle}
                            >
                                Cerrar
                            </button>

                        </div>

                    </div>

                </div>
            }

        </>

    )
}

export default Reportes
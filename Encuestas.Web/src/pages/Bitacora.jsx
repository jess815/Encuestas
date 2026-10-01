import { useEffect, useState } from 'react'

function Bitacora() {

    const [bitacora, setBitacora] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const [moduloFiltro, setModuloFiltro] = useState('')

    useEffect(() => {

        obtenerBitacora()

    }, [])

    // carga los registros de bitacora
    const obtenerBitacora = async () => {

        try {

            const response = await fetch('/api/Bitacora')

            if (response.ok) {

                const data = await response.json()

                setBitacora(data)

            }
            else if (response.status === 204) {

                setBitacora([])

            }

        }
        catch (error) {

            console.error(error)

            alert('Error al cargar la bitácora')

        }

    }

    // da formato a la fecha
    const formatearFecha = (fecha) => {

        if (fecha === null || fecha === undefined) {

            return 'No indicada'

        }

        return new Date(fecha).toLocaleString()

    }

    // limpia los filtros
    const limpiarFiltros = () => {

        setBusqueda('')
        setModuloFiltro('')

    }

    // obtiene los modulos disponibles
    const modulosUnicos = [
        ...new Set(
            bitacora.map((registro) =>
                registro.modulo
            )
        )
    ]

    // filtra los registros de bitacora
    const bitacoraFiltrada = bitacora.filter((registro) => {

        const textoBusqueda = busqueda.toLowerCase()

        const coincideBusqueda =
            (registro.nombreUsuario || '')
                .toLowerCase()
                .includes(textoBusqueda) ||

            (registro.modulo || '')
                .toLowerCase()
                .includes(textoBusqueda) ||

            (registro.accion || '')
                .toLowerCase()
                .includes(textoBusqueda) ||

            (registro.detalle || '')
                .toLowerCase()
                .includes(textoBusqueda)

        const coincideModulo =
            moduloFiltro === '' ||
            registro.modulo === moduloFiltro

        return (
            coincideBusqueda &&
            coincideModulo
        )

    })

    return (

        <div className="tabla-contenedor">

            <div className="tabla-header">

                <h2>
                    Bitácora del Sistema
                </h2>

            </div>

            <div className="card-dashboard filtros-bitacora">

                <h3>
                    Filtros
                </h3>

                <label>
                    Buscar
                </label>

                <input
                    type="text"
                    placeholder="Buscar por usuario, módulo, acción o detalle"
                    className="input"
                    value={busqueda}
                    onChange={(e) =>
                        setBusqueda(e.target.value)
                    }
                />

                <label>
                    Módulo
                </label>

                <select
                    className="input"
                    value={moduloFiltro}
                    onChange={(e) =>
                        setModuloFiltro(e.target.value)
                    }
                >

                    <option value="">
                        Todos los módulos
                    </option>

                    {
                        modulosUnicos.map((modulo) => (

                            <option
                                key={modulo}
                                value={modulo}
                            >
                                {modulo}
                            </option>

                        ))
                    }

                </select>

                <button
                    className="boton"
                    onClick={limpiarFiltros}
                >
                    Limpiar filtros
                </button>

            </div>

            <p>
                Total de registros: {bitacoraFiltrada.length}
            </p>

            <table className="tabla tabla-bitacora">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Usuario</th>
                        <th>Módulo</th>
                        <th>Acción</th>
                        <th>Detalle</th>
                        <th>Fecha</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        bitacoraFiltrada.map((registro) => (

                            <tr key={registro.idBitacora}>

                                <td data-label="ID">
                                    {registro.idBitacora}
                                </td>

                                <td data-label="Usuario">
                                    {
                                        registro.nombreUsuario ||
                                        `Usuario #${registro.idUsuario}`
                                    }
                                </td>

                                <td data-label="Módulo">
                                    {registro.modulo}
                                </td>

                                <td data-label="Acción">
                                    {registro.accion}
                                </td>

                                <td data-label="Detalle">
                                    {
                                        registro.detalle ||
                                        'Sin detalle'
                                    }
                                </td>

                                <td data-label="Fecha">
                                    {
                                        formatearFecha(
                                            registro.fechaAccion
                                        )
                                    }
                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    )
}

export default Bitacora
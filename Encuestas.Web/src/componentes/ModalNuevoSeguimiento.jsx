import { useState } from 'react'

function ModalNuevoSeguimiento({ onCerrar, obtenerSeguimientos, seguimientoEditar }) {

    // Valida si se está creando o editando
    const esEdicion = seguimientoEditar !== null && seguimientoEditar !== undefined

    // Estados del formulario
    const [idRespuesta, setIdRespuesta] = useState(esEdicion ? seguimientoEditar.idRespuesta : '')
    const [estado, setEstado] = useState(esEdicion ? seguimientoEditar.estado : 'Pendiente')

    // Guarda o edita el seguimiento
    const guardar = async () => {

        if (idRespuesta === '' || Number(idRespuesta) <= 0) {
            alert('El IdRespuesta es requerido')
            return
        }

        if (estado.trim() === '') {
            alert('El estado es requerido')
            return
        }

        try {

            // Define si usa POST o PUT
            const url = esEdicion
                ? `/api/Seguimiento/${seguimientoEditar.idSeguimiento}`
                : '/api/Seguimiento'

            const metodo = esEdicion
                ? 'PUT'
                : 'POST'

            const response = await fetch(url, {

                method: metodo,

                headers: {
                    'Content-Type': 'application/json'
                },

                // Datos que se envían al API
                body: JSON.stringify({
                    idRespuesta: Number(idRespuesta),
                    estado: estado
                })

            })

            if (response.ok) {

                // Recarga la tabla y cierra el modal
                await obtenerSeguimientos()

                onCerrar()

            }
            else {

                alert('No fue posible guardar el seguimiento')

            }

        }
        catch (error) {

            console.error(error)

            alert('Error al conectar con el servidor')

        }

    }

    return (

        <div className="modal-overlay">

            <div className="modal">

                <h2>
                    {
                        esEdicion
                            ? 'Editar Seguimiento'
                            : 'Nuevo Seguimiento'
                    }
                </h2>

                <label>
                    ID de respuesta
                </label>

                <input
                    type="number"
                    placeholder="Ejemplo: 1"
                    className="input"
                    value={idRespuesta}
                    onChange={(e) => setIdRespuesta(e.target.value)}
                />

                <label>
                    Estado
                </label>

                <select
                    className="input"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                >
                    <option value="Pendiente">
                        Pendiente
                    </option>

                    <option value="En proceso">
                        En proceso
                    </option>

                    <option value="Resuelto">
                        Resuelto
                    </option>
                </select>

                <div className="modal-botones">

                    <button
                        className="boton"
                        onClick={guardar}
                    >
                        {
                            esEdicion
                                ? 'Guardar cambios'
                                : 'Guardar'
                        }
                    </button>

                    <button
                        className="boton"
                        onClick={onCerrar}
                    >
                        Cancelar
                    </button>

                </div>

            </div>

        </div>

    )
}

export default ModalNuevoSeguimiento
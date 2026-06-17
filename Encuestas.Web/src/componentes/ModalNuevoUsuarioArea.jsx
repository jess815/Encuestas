import { useState } from 'react'

function ModalNuevoUsuarioArea({ onCerrar, obtenerUsuarioAreas, usuarioAreaEditar, usuarios, areas }) {

    // Valida si se está creando o editando
    const esEdicion = usuarioAreaEditar !== null && usuarioAreaEditar !== undefined

    // Estados del formulario
    const [idUsuario, setIdUsuario] = useState(esEdicion ? usuarioAreaEditar.idUsuario : '')
    const [idArea, setIdArea] = useState(esEdicion ? usuarioAreaEditar.idArea : '')
    const [verArea, setVerArea] = useState(esEdicion ? usuarioAreaEditar.verArea : true)

    // Guarda o edita la asignación
    const guardar = async () => {

        if (idUsuario === '') {
            alert('Debe seleccionar un usuario')
            return
        }

        if (idArea === '') {
            alert('Debe seleccionar un área')
            return
        }

        try {

            // Define si usa POST o PUT
            const url = esEdicion
                ? `/api/UsuarioArea/${usuarioAreaEditar.idUsuarioArea}`
                : '/api/UsuarioArea'

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
                    idUsuario: Number(idUsuario),
                    idArea: Number(idArea),
                    verArea: verArea
                })

            })

            if (response.ok) {

                // Recarga la tabla y cierra el modal
                await obtenerUsuarioAreas()

                onCerrar()

            }
            else {

                alert('No fue posible guardar la asignación')

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
                            ? 'Editar Asignación'
                            : 'Nueva Asignación'
                    }
                </h2>

                <label>
                    Usuario
                </label>

                <select
                    className="input"
                    value={idUsuario}
                    onChange={(e) => setIdUsuario(e.target.value)}
                >
                    <option value="">
                        Seleccione un usuario
                    </option>

                    {
                        usuarios.map((usuario) => (

                            <option
                                key={usuario.idUsuario}
                                value={usuario.idUsuario}
                            >
                                {usuario.nombre}
                            </option>

                        ))
                    }
                </select>

                <label>
                    Área
                </label>

                <select
                    className="input"
                    value={idArea}
                    onChange={(e) => setIdArea(e.target.value)}
                >
                    <option value="">
                        Seleccione un área
                    </option>

                    {
                        areas.map((area) => (

                            <option
                                key={area.idArea}
                                value={area.idArea}
                            >
                                {area.nombre}
                            </option>

                        ))
                    }
                </select>

                <label>

                    <input
                        type="checkbox"
                        checked={verArea}
                        onChange={(e) => setVerArea(e.target.checked)}
                    />

                    Puede ver el área

                </label>

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

export default ModalNuevoUsuarioArea
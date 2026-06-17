import { useState } from 'react'

function ModalNuevoComentarioSeguimiento({ onCerrar, obtenerComentarios, seguimiento, comentarioEditar }) {

    // Valida si se está creando o editando
    const esEdicion = comentarioEditar !== null && comentarioEditar !== undefined

    // Usuario temporal mientras conectamos el usuario logueado
    const idUsuario = 1

    // Estados del formulario
    const [comentario, setComentario] = useState(esEdicion ? comentarioEditar.comentario : '')

    // Guarda o edita el comentario
    const guardar = async () => {

        if (comentario.trim() === '') {
            alert('El comentario es requerido')
            return
        }

        try {

            // Define si usa POST o PUT
            const url = esEdicion
                ? `/api/SeguimientoComentario/${comentarioEditar.idSeguimientoComentario}`
                : '/api/SeguimientoComentario'

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
                    idSeguimiento: seguimiento.idSeguimiento,
                    idUsuario: idUsuario,
                    comentario: comentario
                })

            })

            if (response.ok) {

                // Recarga la tabla y cierra el modal
                await obtenerComentarios()

                onCerrar()

            }
            else {

                alert('No fue posible guardar el comentario')

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
                            ? 'Editar Comentario'
                            : 'Nuevo Comentario'
                    }
                </h2>

                <label>
                    Comentario
                </label>

                <textarea
                    placeholder="Escriba el comentario del seguimiento"
                    className="input"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                />

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

export default ModalNuevoComentarioSeguimiento
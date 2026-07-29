import { useState } from 'react'

function ModalNuevoComentarioSeguimiento({
    onCerrar,
    obtenerComentarios,
    seguimiento,
    comentarioEditar,
    usuarioLogueado
}) {

    // valida si se esta creando o editando
    const esEdicion =
        comentarioEditar !== null &&
        comentarioEditar !== undefined

    // obtiene el usuario que inicio sesion
    const idUsuario =
        usuarioLogueado?.idUsuario

    // almacena el comentario del formulario
    const [comentario, setComentario] = useState(
        esEdicion
            ? comentarioEditar.comentario
            : ''
    )

    // guarda o edita un comentario
    const guardar = async () => {

        // valida que exista un usuario autenticado
        if (!idUsuario) {

            alert('No se identifico el usuario actual')
            return

        }

        // valida que el comentario tenga contenido
        if (comentario.trim() === '') {

            alert('El comentario es requerido')
            return

        }

        try {

            // define si utiliza post o put
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

                // envia la informacion al api
                body: JSON.stringify({

                    idSeguimiento:
                        seguimiento.idSeguimiento,

                    idUsuario:
                        idUsuario,

                    comentario:
                        comentario

                })

            })

            if (response.ok) {

                // actualiza la lista de comentarios
                await obtenerComentarios()

                // cierra el modal
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
                            ? 'Editar comentario'
                            : 'Nuevo comentario'
                    }

                </h2>

                <label>

                    Comentario

                </label>

                <textarea

                    className="input"

                    placeholder="Escriba el comentario del seguimiento"

                    value={comentario}

                    onChange={(e) =>
                        setComentario(e.target.value)
                    }

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
import { useState } from 'react'

function ModalNuevaPregunta({ onCerrar, obtenerPreguntas, area, preguntaEditar }) {

    const esEdicion = preguntaEditar !== null && preguntaEditar !== undefined

    const [texto, setTexto] = useState(esEdicion ? preguntaEditar.texto : '')
    const [ordenPregunta, setOrdenPregunta] = useState(esEdicion ? preguntaEditar.ordenPregunta : 1)
    const [activo, setActivo] = useState(esEdicion ? preguntaEditar.activo : true)

    const guardar = async () => {

        if (texto.trim() === '') {
            alert('El texto de la pregunta es requerido')
            return
        }

        if (ordenPregunta <= 0) {
            alert('El orden debe ser mayor a cero')
            return
        }

        try {

            const url = esEdicion
                ? `/api/Pregunta/${preguntaEditar.idPregunta}`
                : '/api/Pregunta'

            const metodo = esEdicion
                ? 'PUT'
                : 'POST'

            const response = await fetch(url, {

                method: metodo,

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    idArea: area.idArea,
                    texto: texto,
                    ordenPregunta: Number(ordenPregunta),
                    activo: activo
                })

            })

            if (response.ok) {

                await obtenerPreguntas()

                onCerrar()

            }
            else {

                alert('No fue posible guardar la pregunta')

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
                            ? 'Editar Pregunta'
                            : 'Nueva Pregunta'
                    }
                </h2>

                <textarea
                    placeholder="Texto de la pregunta"
                    className="input"
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Orden"
                    className="input"
                    value={ordenPregunta}
                    onChange={(e) => setOrdenPregunta(e.target.value)}
                />

                <label>

                    <input
                        type="checkbox"
                        checked={activo}
                        onChange={(e) => setActivo(e.target.checked)}
                    />

                    Activo

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

export default ModalNuevaPregunta
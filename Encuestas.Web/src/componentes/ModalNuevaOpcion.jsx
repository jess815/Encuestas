import { useState } from 'react'

function ModalNuevaOpcion({ onCerrar, obtenerOpciones, opcionEditar }) {

    const esEdicion = opcionEditar !== null && opcionEditar !== undefined

    const [texto, setTexto] = useState(esEdicion ? opcionEditar.texto : '')
    const [valor, setValor] = useState(esEdicion ? opcionEditar.valor : '')
    const [ordenVisual, setOrdenVisual] = useState(esEdicion ? opcionEditar.ordenVisual : '')
    const [activo, setActivo] = useState(esEdicion ? opcionEditar.activo : true)

    const guardar = async () => {

        if (texto.trim() === '') {
            alert('El texto de la opción es requerido')
            return
        }

        if (valor === '' || Number(valor) <= 0) {
            alert('El valor debe ser mayor a cero')
            return
        }

        if (ordenVisual === '' || Number(ordenVisual) <= 0) {
            alert('El orden visual debe ser mayor a cero')
            return
        }

        try {

            const url = esEdicion
                ? `/api/Opcion/${opcionEditar.idOpcion}`
                : '/api/Opcion'

            const metodo = esEdicion
                ? 'PUT'
                : 'POST'

            const response = await fetch(url, {

                method: metodo,

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    texto: texto,
                    valor: Number(valor),
                    ordenVisual: Number(ordenVisual),
                    activo: activo
                })

            })

            if (response.ok) {

                await obtenerOpciones()

                onCerrar()

            }
            else {

                alert('No fue posible guardar la opción')

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
                            ? 'Editar Opción'
                            : 'Nueva Opción'
                    }
                </h2>

                <label>
                    Texto de la opción
                </label>

                <input
                    type="text"
                    placeholder="Ejemplo: Excelente"
                    className="input"
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                />

                <label>
                    Valor
                </label>

                <input
                    type="number"
                    placeholder="Ejemplo: 5"
                    className="input"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                />

                <label>
                    Orden visual
                </label>

                <input
                    type="number"
                    placeholder="Ejemplo: 1"
                    className="input"
                    value={ordenVisual}
                    onChange={(e) => setOrdenVisual(e.target.value)}
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

export default ModalNuevaOpcion
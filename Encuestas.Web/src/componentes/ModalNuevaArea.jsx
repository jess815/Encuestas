import { useState } from 'react'

function ModalNuevaArea({ onCerrar, obtenerEncuestas }) {

    const [nombre, setNombre] = useState('')
    const [tipo, setTipo] = useState('')
    const [activo, setActivo] = useState(true)

    const guardar = async () => {

        try {

            const response = await fetch('/api/Encuesta', {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    nombre: nombre,
                    tipo: tipo,
                    activo: activo
                })

            })

            if (response.ok) {

                await obtenerEncuestas()

                onCerrar()

            }
            else {

                alert('No fue posible guardar el área')

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
                    Nueva Área
                </h2>

                <input
                    type="text"
                    placeholder="Nombre"
                    className="input"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Tipo"
                    className="input"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
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
                        Guardar
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

export default ModalNuevaArea
import { useState } from 'react'

function ModalNuevaArea({ onCerrar }) {

    const [nombre, setNombre] = useState('')
    const [tipo, setTipo] = useState('')
    const [activo, setActivo] = useState(true)

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

                    <button className="boton">
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
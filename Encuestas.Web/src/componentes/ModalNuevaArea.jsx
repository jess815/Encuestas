import { useState } from 'react'

function ModalNuevaArea({ onCerrar, obtenerEncuestas, areaEditar }) {

    const esEdicion = areaEditar !== null && areaEditar !== undefined

    const [nombre, setNombre] = useState(esEdicion ? areaEditar.nombre : '')
    const [tipo, setTipo] = useState(esEdicion ? areaEditar.tipo : '')
    const [activo, setActivo] = useState(esEdicion ? areaEditar.activo : true)

    const guardar = async () => {

        if (nombre.trim() === '') {
            alert('El nombre es requerido')
            return
        }

        if (tipo.trim() === '') {
            alert('El tipo es requerido')
            return
        }

        try {

            const url = esEdicion
                ? `/api/Encuesta/${areaEditar.idArea}`
                : '/api/Encuesta'

            const metodo = esEdicion
                ? 'PUT'
                : 'POST'

            const response = await fetch(url, {

                method: metodo,

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
                    {
                        esEdicion
                            ? 'Editar Área'
                            : 'Nueva Área'
                    }
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

export default ModalNuevaArea
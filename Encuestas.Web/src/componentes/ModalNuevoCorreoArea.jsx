import { useState } from 'react'

function ModalNuevoCorreoArea({ onCerrar, obtenerCorreosArea, correoEditar, areas }) {

    const esEdicion = correoEditar !== null && correoEditar !== undefined

    const [idArea, setIdArea] = useState(esEdicion ? correoEditar.idArea : '')
    const [correo, setCorreo] = useState(esEdicion ? correoEditar.correo : '')
    const [activo, setActivo] = useState(esEdicion ? correoEditar.activo : true)

    const guardar = async () => {

        if (idArea === '') {
            alert('Debe seleccionar un área')
            return
        }

        if (correo.trim() === '') {
            alert('El correo es requerido')
            return
        }

        try {

            const url = esEdicion
                ? `/api/CorreoArea/${correoEditar.idCorreoArea}`
                : '/api/CorreoArea'

            const metodo = esEdicion
                ? 'PUT'
                : 'POST'

            const response = await fetch(url, {

                method: metodo,

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    idArea: Number(idArea),
                    correo: correo,
                    activo: activo
                })

            })

            if (response.ok) {

                await obtenerCorreosArea()

                onCerrar()

            }
            else {

                alert('No fue posible guardar el correo del área')

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
                            ? 'Editar Correo por Área'
                            : 'Nuevo Correo por Área'
                    }
                </h2>

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
                    Correo
                </label>

                <input
                    type="email"
                    placeholder="Ejemplo: encuestas@country.co.cr"
                    className="input"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
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

export default ModalNuevoCorreoArea
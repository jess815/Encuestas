import { useState } from 'react'

function ModalNuevoUsuario({ onCerrar, obtenerUsuarios, usuarioEditar }) {

    // Valida si se está creando o editando
    const esEdicion = usuarioEditar !== null && usuarioEditar !== undefined

    // Estados del formulario
    const [nombre, setNombre] = useState(esEdicion ? usuarioEditar.nombre : '')
    const [usuario, setUsuario] = useState(esEdicion ? usuarioEditar.usuario : '')
    const [password, setPassword] = useState('')
    const [administrador, setAdministrador] = useState(esEdicion ? usuarioEditar.administrador : false)
    const [editaEncuesta, setEditaEncuesta] = useState(esEdicion ? usuarioEditar.editaEncuesta : false)
    const [exportaExcel, setExportaExcel] = useState(esEdicion ? usuarioEditar.exportaExcel : false)
    const [activo, setActivo] = useState(esEdicion ? usuarioEditar.activo : true)

    // Guarda o edita el usuario
    const guardar = async () => {

        if (nombre.trim() === '') {
            alert('El nombre es requerido')
            return
        }

        if (usuario.trim() === '') {
            alert('El usuario es requerido')
            return
        }

        if (password.trim() === '') {
            alert('La contraseña es requerida')
            return
        }

        try {

            // Define si usa POST o PUT
            const url = esEdicion
                ? `/api/Usuario/${usuarioEditar.idUsuario}`
                : '/api/Usuario'

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
                    nombre: nombre,
                    usuario: usuario,
                    passwordHash: password,
                    administrador: administrador,
                    editaEncuesta: editaEncuesta,
                    exportaExcel: exportaExcel,
                    activo: activo
                })

            })

            if (response.ok) {

                // Recarga la tabla y cierra el modal
                await obtenerUsuarios()

                onCerrar()

            }
            else {

                alert('No fue posible guardar el usuario')

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
                            ? 'Editar Usuario'
                            : 'Nuevo Usuario'
                    }
                </h2>

                <label>
                    Nombre
                </label>

                <input
                    type="text"
                    placeholder="Nombre completo"
                    className="input"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                <label>
                    Usuario
                </label>

                <input
                    type="text"
                    placeholder="Usuario de ingreso"
                    className="input"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                />

                <label>
                    {
                        esEdicion
                            ? 'Nueva contraseña'
                            : 'Contraseña'
                    }
                </label>

                <input
                    type="password"
                    placeholder={
                        esEdicion
                            ? 'Ingrese la nueva contraseña'
                            : 'Ingrese la contraseña'
                    }
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label>

                    <input
                        type="checkbox"
                        checked={administrador}
                        onChange={(e) => setAdministrador(e.target.checked)}
                    />

                    Administrador

                </label>

                <label>

                    <input
                        type="checkbox"
                        checked={editaEncuesta}
                        onChange={(e) => setEditaEncuesta(e.target.checked)}
                    />

                    Edita encuesta

                </label>

                <label>

                    <input
                        type="checkbox"
                        checked={exportaExcel}
                        onChange={(e) => setExportaExcel(e.target.checked)}
                    />

                    Exporta Excel

                </label>

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

export default ModalNuevoUsuario
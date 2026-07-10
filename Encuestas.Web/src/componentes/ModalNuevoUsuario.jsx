import { useState } from 'react'

function ModalNuevoUsuario({ onCerrar, obtenerUsuarios, usuarioEditar }) {

    // valida si se esta creando o editando
    const esEdicion =
        usuarioEditar !== null &&
        usuarioEditar !== undefined

    // datos generales del usuario
    const [nombre, setNombre] = useState(
        esEdicion ? usuarioEditar.nombre : ''
    )

    const [usuario, setUsuario] = useState(
        esEdicion ? usuarioEditar.usuario : ''
    )

    const [password, setPassword] = useState('')

    // permisos generales
    const [administrador, setAdministrador] = useState(
        esEdicion ? usuarioEditar.administrador : false
    )

    const [editaEncuesta, setEditaEncuesta] = useState(
        esEdicion ? usuarioEditar.editaEncuesta : false
    )

    const [exportaExcel, setExportaExcel] = useState(
        esEdicion ? usuarioEditar.exportaExcel : false
    )

    // areas que puede ver el usuario
    const [ceibo, setCeibo] = useState(
        esEdicion ? usuarioEditar.ceibo : false
    )

    const [faroles, setFaroles] = useState(
        esEdicion ? usuarioEditar.faroles : false
    )

    const [hoyo19, setHoyo19] = useState(
        esEdicion ? usuarioEditar.hoyo19 : false
    )

    const [pinRojo, setPinRojo] = useState(
        esEdicion ? usuarioEditar.pinRojo : false
    )

    const [canaBrava, setCanaBrava] = useState(
        esEdicion ? usuarioEditar.canaBrava : false
    )

    const [eventos, setEventos] = useState(
        esEdicion ? usuarioEditar.eventos : false
    )

    const [activo, setActivo] = useState(
        esEdicion ? usuarioEditar.activo : true
    )

    // cambia el permiso de administrador
    const cambiarAdministrador = (valor) => {

        setAdministrador(valor)

        // un administrador puede ver todas las areas
        if (valor) {

            setCeibo(true)
            setFaroles(true)
            setHoyo19(true)
            setPinRojo(true)
            setCanaBrava(true)
            setEventos(true)

        }

    }

    // guarda o edita el usuario
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

            // define si se crea o se edita el usuario
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

                // envia los datos permisos y areas al api
                body: JSON.stringify({
                    nombre: nombre,
                    usuario: usuario,
                    passwordHash: password,
                    administrador: administrador,
                    editaEncuesta: editaEncuesta,
                    exportaExcel: exportaExcel,
                    ceibo: ceibo,
                    faroles: faroles,
                    hoyo19: hoyo19,
                    pinRojo: pinRojo,
                    canaBrava: canaBrava,
                    eventos: eventos,
                    activo: activo
                })

            })

            if (response.ok) {

                // actualiza la lista y cierra el modal
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

                <h3>
                    Datos del usuario
                </h3>

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

                <h3>
                    Permisos
                </h3>

                <label>

                    <input
                        type="checkbox"
                        checked={administrador}
                        onChange={(e) =>
                            cambiarAdministrador(e.target.checked)
                        }
                    />

                    Administrador

                </label>

                <label>

                    <input
                        type="checkbox"
                        checked={editaEncuesta}
                        onChange={(e) =>
                            setEditaEncuesta(e.target.checked)
                        }
                    />

                    Edita encuestas

                </label>

                <label>

                    <input
                        type="checkbox"
                        checked={exportaExcel}
                        onChange={(e) =>
                            setExportaExcel(e.target.checked)
                        }
                    />

                    Exporta reportes

                </label>

                <h3>
                    Áreas que puede ver
                </h3>

                <label>

                    <input
                        type="checkbox"
                        checked={ceibo}
                        onChange={(e) =>
                            setCeibo(e.target.checked)
                        }
                    />

                    El Ceibo

                </label>

                <label>

                    <input
                        type="checkbox"
                        checked={faroles}
                        onChange={(e) =>
                            setFaroles(e.target.checked)
                        }
                    />

                    Faroles

                </label>

                <label>

                    <input
                        type="checkbox"
                        checked={hoyo19}
                        onChange={(e) =>
                            setHoyo19(e.target.checked)
                        }
                    />

                    Hoyo 19

                </label>

                <label>

                    <input
                        type="checkbox"
                        checked={pinRojo}
                        onChange={(e) =>
                            setPinRojo(e.target.checked)
                        }
                    />

                    Pin Rojo

                </label>

                <label>

                    <input
                        type="checkbox"
                        checked={canaBrava}
                        onChange={(e) =>
                            setCanaBrava(e.target.checked)
                        }
                    />

                    Caña Brava

                </label>

                <label>

                    <input
                        type="checkbox"
                        checked={eventos}
                        onChange={(e) =>
                            setEventos(e.target.checked)
                        }
                    />

                    Eventos

                </label>

                <h3>
                    Estado
                </h3>

                <label>

                    <input
                        type="checkbox"
                        checked={activo}
                        onChange={(e) =>
                            setActivo(e.target.checked)
                        }
                    />

                    Usuario activo

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
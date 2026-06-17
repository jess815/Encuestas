import { useEffect, useState } from 'react'
import ModalNuevoUsuario from '../componentes/ModalNuevoUsuario'

function Usuarios() {

    const [usuarios, setUsuarios] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [usuarioEditar, setUsuarioEditar] = useState(null)

    useEffect(() => {

        obtenerUsuarios()

    }, [])

    // Carga los usuarios desde el API
    const obtenerUsuarios = async () => {

        try {

            const response = await fetch('/api/Usuario')

            if (response.ok) {

                const data = await response.json()

                setUsuarios(data)

            }
            else if (response.status === 204) {

                setUsuarios([])

            }

        }
        catch (error) {

            console.error(error)

            alert('Error al cargar los usuarios')

        }

    }

    // Abre el modal para crear
    const abrirNuevo = () => {

        setUsuarioEditar(null)
        setMostrarModal(true)

    }

    // Abre el modal para editar
    const abrirEditar = (usuario) => {

        setUsuarioEditar(usuario)
        setMostrarModal(true)

    }

    // Cierra el modal
    const cerrarModal = () => {

        setUsuarioEditar(null)
        setMostrarModal(false)

    }

    // Elimina un usuario
    const eliminarUsuario = async (idUsuario) => {

        const confirmar = window.confirm('¿Está segura de eliminar este usuario?')

        if (!confirmar) {
            return
        }

        try {

            const response = await fetch(`/api/Usuario/${idUsuario}`, {
                method: 'DELETE'
            })

            if (response.ok) {

                await obtenerUsuarios()

            }
            else {

                alert('No fue posible eliminar el usuario')

            }

        }
        catch (error) {

            console.error(error)

            alert('Error al conectar con el servidor')

        }

    }

    return (

        <>

            <div className="tabla-contenedor">

                <div className="tabla-header">

                    <h2>
                        Administración de Usuarios
                    </h2>

                    <button
                        className="boton-agregar"
                        onClick={abrirNuevo}
                    >
                        Nuevo Usuario
                    </button>

                </div>

                <table className="tabla">

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Usuario</th>
                            <th>Administrador</th>
                            <th>Edita encuesta</th>
                            <th>Exporta Excel</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>

                    </thead>

                    <tbody>

                        {
                            usuarios.map((usuario) => (

                                <tr key={usuario.idUsuario}>

                                    <td>
                                        {usuario.idUsuario}
                                    </td>

                                    <td>
                                        {usuario.nombre}
                                    </td>

                                    <td>
                                        {usuario.usuario}
                                    </td>

                                    <td>
                                        {
                                            usuario.administrador
                                                ? 'Sí'
                                                : 'No'
                                        }
                                    </td>

                                    <td>
                                        {
                                            usuario.editaEncuesta
                                                ? 'Sí'
                                                : 'No'
                                        }
                                    </td>

                                    <td>
                                        {
                                            usuario.exportaExcel
                                                ? 'Sí'
                                                : 'No'
                                        }
                                    </td>

                                    <td>
                                        {
                                            usuario.activo
                                                ? 'Activo'
                                                : 'Inactivo'
                                        }
                                    </td>

                                    <td>

                                        <button
                                            className="boton-tabla editar"
                                            onClick={() => abrirEditar(usuario)}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            className="boton-tabla eliminar"
                                            onClick={() => eliminarUsuario(usuario.idUsuario)}
                                        >
                                            Eliminar
                                        </button>

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

            {
                mostrarModal &&

                <ModalNuevoUsuario
                    onCerrar={cerrarModal}
                    obtenerUsuarios={obtenerUsuarios}
                    usuarioEditar={usuarioEditar}
                />
            }

        </>

    )
}

export default Usuarios
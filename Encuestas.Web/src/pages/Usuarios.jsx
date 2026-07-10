import { useEffect, useState } from 'react'
import ModalNuevoUsuario from '../componentes/ModalNuevoUsuario'

function Usuarios() {

    const [usuarios, setUsuarios] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [usuarioEditar, setUsuarioEditar] = useState(null)

    useEffect(() => {

        obtenerUsuarios()

    }, [])

    // carga los usuarios desde el api
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

    // abre el modal para crear un usuario
    const abrirNuevo = () => {

        setUsuarioEditar(null)
        setMostrarModal(true)

    }

    // abre el modal para editar un usuario
    const abrirEditar = (usuario) => {

        setUsuarioEditar(usuario)
        setMostrarModal(true)

    }

    // cierra el modal
    const cerrarModal = () => {

        setUsuarioEditar(null)
        setMostrarModal(false)

    }

    // obtiene los permisos del usuario
    const obtenerPermisos = (usuario) => {

        if (usuario.administrador) {

            return 'Administrador'

        }

        const permisos = []

        if (usuario.editaEncuesta) {

            permisos.push('Edita encuestas')

        }

        if (usuario.exportaExcel) {

            permisos.push('Exporta reportes')

        }

        if (permisos.length === 0) {

            return 'Sin permisos adicionales'

        }

        return permisos.join(', ')

    }

    // obtiene las areas asignadas al usuario
    const obtenerAreas = (usuario) => {

        if (usuario.administrador) {

            return 'Todas las áreas'

        }

        const areas = []

        if (usuario.ceibo) {

            areas.push('El Ceibo')

        }

        if (usuario.faroles) {

            areas.push('Faroles')

        }

        if (usuario.hoyo19) {

            areas.push('Hoyo 19')

        }

        if (usuario.pinRojo) {

            areas.push('Pin Rojo')

        }

        if (usuario.canaBrava) {

            areas.push('Caña Brava')

        }

        if (usuario.eventos) {

            areas.push('Eventos')

        }

        if (areas.length === 0) {

            return 'Sin áreas asignadas'

        }

        return areas.join(', ')

    }

    // elimina un usuario
    const eliminarUsuario = async (idUsuario) => {

        const confirmar = window.confirm(
            '¿Está segura de eliminar este usuario?'
        )

        if (!confirmar) {

            return

        }

        try {

            const response = await fetch(
                `/api/Usuario/${idUsuario}`,
                {
                    method: 'DELETE'
                }
            )

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

                    <div>

                        <h2>
                            Administración de Usuarios
                        </h2>

                        <p>
                            Configure los permisos y las áreas que puede ver cada usuario.
                        </p>

                    </div>

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
                            <th>Nombre</th>
                            <th>Usuario</th>
                            <th>Permisos</th>
                            <th>Áreas asignadas</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>

                    </thead>

                    <tbody>

                        {
                            usuarios.map((usuario) => (

                                <tr key={usuario.idUsuario}>

                                    <td>
                                        {usuario.nombre}
                                    </td>

                                    <td>
                                        {usuario.usuario}
                                    </td>

                                    <td>
                                        {obtenerPermisos(usuario)}
                                    </td>

                                    <td>
                                        {obtenerAreas(usuario)}
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
                                            onClick={() =>
                                                abrirEditar(usuario)
                                            }
                                        >
                                            Editar
                                        </button>

                                        <button
                                            className="boton-tabla eliminar"
                                            onClick={() =>
                                                eliminarUsuario(
                                                    usuario.idUsuario
                                                )
                                            }
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
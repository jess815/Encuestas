import { useEffect, useState } from 'react'
import ModalNuevoUsuarioArea from '../componentes/ModalNuevoUsuarioArea'

function UsuarioAreas({ areas }) {

    const [usuarioAreas, setUsuarioAreas] = useState([])
    const [usuarios, setUsuarios] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [usuarioAreaEditar, setUsuarioAreaEditar] = useState(null)

    useEffect(() => {

        obtenerUsuarioAreas()
        obtenerUsuarios()

    }, [])

    // Carga las asignaciones de usuarios por área
    const obtenerUsuarioAreas = async () => {

        try {

            const response = await fetch('/api/UsuarioArea')

            if (response.ok) {

                const data = await response.json()

                setUsuarioAreas(data)

            }
            else if (response.status === 204) {

                setUsuarioAreas([])

            }

        }
        catch (error) {

            console.error(error)

            alert('Error al cargar las asignaciones')

        }

    }

    // Carga los usuarios para el select
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

        setUsuarioAreaEditar(null)
        setMostrarModal(true)

    }

    // Abre el modal para editar
    const abrirEditar = (usuarioArea) => {

        setUsuarioAreaEditar(usuarioArea)
        setMostrarModal(true)

    }

    // Cierra el modal
    const cerrarModal = () => {

        setUsuarioAreaEditar(null)
        setMostrarModal(false)

    }

    // Elimina una asignación
    const eliminarUsuarioArea = async (idUsuarioArea) => {

        const confirmar = window.confirm('¿Está segura de eliminar esta asignación?')

        if (!confirmar) {
            return
        }

        try {

            const response = await fetch(`/api/UsuarioArea/${idUsuarioArea}`, {
                method: 'DELETE'
            })

            if (response.ok) {

                await obtenerUsuarioAreas()

            }
            else {

                alert('No fue posible eliminar la asignación')

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
                        Asignación de Áreas por Usuario
                    </h2>

                    <button
                        className="boton-agregar"
                        onClick={abrirNuevo}
                    >
                        Nueva Asignación
                    </button>

                </div>

                <table className="tabla">

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Área</th>
                            <th>Puede ver</th>
                            <th>Acciones</th>
                        </tr>

                    </thead>

                    <tbody>

                        {
                            usuarioAreas.map((usuarioArea) => (

                                <tr key={usuarioArea.idUsuarioArea}>

                                    <td>
                                        {usuarioArea.idUsuarioArea}
                                    </td>

                                    <td>
                                        {usuarioArea.nombreUsuario}
                                    </td>

                                    <td>
                                        {usuarioArea.nombreArea}
                                    </td>

                                    <td>
                                        {
                                            usuarioArea.verArea
                                                ? 'Sí'
                                                : 'No'
                                        }
                                    </td>

                                    <td>

                                        <button
                                            className="boton-tabla editar"
                                            onClick={() => abrirEditar(usuarioArea)}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            className="boton-tabla eliminar"
                                            onClick={() => eliminarUsuarioArea(usuarioArea.idUsuarioArea)}
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

                <ModalNuevoUsuarioArea
                    onCerrar={cerrarModal}
                    obtenerUsuarioAreas={obtenerUsuarioAreas}
                    usuarioAreaEditar={usuarioAreaEditar}
                    usuarios={usuarios}
                    areas={areas}
                />
            }

        </>

    )
}

export default UsuarioAreas
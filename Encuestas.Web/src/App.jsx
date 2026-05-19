import { useState } from 'react'

function App() {

  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')

  const iniciarSesion = async () => {

  try {

    const response = await fetch('/api/Usuario/Login', {

      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        usuario: usuario,
        password: password
      })

    })

    if (response.ok) {

      const data = await response.json()

      console.log(data)

      alert('Inicio de sesión exitoso')

    }
    else {

      alert('Usuario o contraseña incorrectos')

    }

  }
  catch (error) {

    console.error(error)

    alert('No fue posible conectar con el servidor')

  }

}

  return (
    <div className="contenedor">

      <div className="tarjeta">

        <h1 className="titulo">
          Sistema de Encuestas
        </h1>

        <p className="subtitulo">
          Costa Rica Country Club
        </p>

        <input
          type="text"
          placeholder="Usuario"
          className="input"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="boton"
          onClick={iniciarSesion}
        >
          Ingresar
        </button>

      </div>

    </div>
  )
}

export default App
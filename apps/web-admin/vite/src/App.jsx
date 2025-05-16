// filepath: z:\VSCode\QRing_Workspace\QRing_Pro\web-admin\vite\src\App.jsx
import React, { useState, useEffect } from 'react';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    tipoPropiedad: 'PH',
    piso: '',
    dpto: ''
  });

  // Obtener registros desde el backend
  useEffect(() => {
    fetch('http://localhost:4000/api/registros')
      .then(response => response.json())
      .then(data => setUsuarios(data))
      .catch(error => console.error('Error al obtener los registros:', error));
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario({ ...nuevoUsuario, [name]: value });
  };

  // Enviar nuevo registro al backend
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/api/registros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoUsuario)
    })
      .then(() => {
        alert('Usuario agregado correctamente');
        window.location.reload(); // Recargar la página para actualizar la tabla
      })
      .catch(error => console.error('Error al agregar el usuario:', error));
  };

  return (
    <div>
      <h1>Gestión de Usuarios</h1>

      {/* Tabla de usuarios */}
      <table border="1">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Tipo Propiedad</th>
            <th>Piso</th>
            <th>Departamento</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.telefono}</td>
              <td>{usuario.direccion}</td>
              <td>{usuario.tipoPropiedad}</td>
              <td>{usuario.piso}</td>
              <td>{usuario.dpto}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario para agregar usuarios */}
      <h2>Agregar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={nuevoUsuario.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={nuevoUsuario.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={nuevoUsuario.telefono}
          onChange={handleChange}
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={nuevoUsuario.direccion}
          onChange={handleChange}
        />
        <select
          name="tipoPropiedad"
          value={nuevoUsuario.tipoPropiedad}
          onChange={handleChange}
        >
          <option value="PH">PH</option>
          <option value="EDIFICIO">Edificio</option>
        </select>
        {nuevoUsuario.tipoPropiedad === 'EDIFICIO' && (
          <>
            <input
              type="text"
              name="piso"
              placeholder="Piso"
              value={nuevoUsuario.piso}
              onChange={handleChange}
            />
            <input
              type="text"
              name="dpto"
              placeholder="Departamento"
              value={nuevoUsuario.dpto}
              onChange={handleChange}
            />
          </>
        )}
        {nuevoUsuario.tipoPropiedad === 'PH' && (
          <input
            type="text"
            name="dpto"
            placeholder="Departamento"
            value={nuevoUsuario.dpto}
            onChange={handleChange}
          />
        )}
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}

export default App;
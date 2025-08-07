'use client';

import { useState } from 'react';

export default function TestConfiguracionPage() {
  const [idUnico, setIdUnico] = useState('test123');
  const [userAdmin, setUserAdmin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [direccionCompleta, setDireccionCompleta] = useState('');
  const [resultado, setResultado] = useState('');

  const handleTest = async () => {
    try {
      const response = await fetch('/api/admin/configuracion-edificio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idUnico,
          userAdmin,
          password,
          direccionCompleta
        })
      });

      const data = await response.json();
      setResultado(JSON.stringify(data, null, 2));
    } catch (error) {
      setResultado(`Error: ${error}`);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Test Configuración Edificio</h1>
      
      <div style={{ marginBottom: '16px' }}>
        <label>ID Único: </label>
        <input
          type="text"
          value={idUnico}
          onChange={(e) => setIdUnico(e.target.value)}
          style={{ marginLeft: '8px', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label>Usuario Admin: </label>
        <input
          type="text"
          value={userAdmin}
          onChange={(e) => setUserAdmin(e.target.value)}
          style={{ marginLeft: '8px', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label>Contraseña: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginLeft: '8px', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label>Confirmar Contraseña: </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ marginLeft: '8px', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label>Dirección Completa: </label>
        <input
          type="text"
          value={direccionCompleta}
          onChange={(e) => setDireccionCompleta(e.target.value)}
          style={{ marginLeft: '8px', padding: '8px', width: '300px' }}
        />
      </div>

      <button 
        onClick={handleTest}
        style={{ 
          backgroundColor: '#1a4fa3', 
          color: 'white', 
          padding: '12px 24px', 
          border: 'none', 
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Probar Configuración
      </button>

      <div style={{ marginTop: '20px' }}>
        <h3>Resultado:</h3>
        <pre style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '16px', 
          borderRadius: '8px',
          whiteSpace: 'pre-wrap'
        }}>
          {resultado}
        </pre>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Links de prueba:</h3>
        <div>
          <a href={`/admin/${idUnico}`} target="_blank">
            Ir a configuración de edificio
          </a>
        </div>
        <div>
          <a href="/tienda/exito?idUnico=test123" target="_blank">
            Ir a página de éxito
          </a>
        </div>
      </div>
    </div>
  );
} 
'use client';
import React from 'react';

export default function InvitacionesPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0002', padding: 32, maxWidth: 340, width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ fontSize: 28, color: '#1a4fa3', fontWeight: 700 }}>Invitaciones</div>
        <div style={{ marginTop: 32 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Invitaciones (ejemplo):</div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f4f6fa', borderRadius: 8, padding: '8px 16px' }}>
              Invitación a Piso 1 - Dpto A
              <button style={{ background: '#c00', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 12px', marginLeft: 12, cursor: 'pointer' }} onClick={() => alert('Borrado!')}>Borrar</button>
            </li>
            <li style={{ marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f4f6fa', borderRadius: 8, padding: '8px 16px' }}>
              Invitación a Piso 2 - Dpto B
              <button style={{ background: '#c00', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 12px', marginLeft: 12, cursor: 'pointer' }} onClick={() => alert('Borrado!')}>Borrar</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 
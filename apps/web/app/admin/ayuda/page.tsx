'use client';

export default function AyudaPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #0002', padding: 32, maxWidth: 340, width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ fontSize: 28, color: '#1a4fa3', fontWeight: 700 }}>Ayuda</div>
        <div style={{ marginTop: 32, fontSize: 18, color: '#222', fontWeight: 400 }}>
          <div>Zona de pruebas de controles:</div>
          <select style={{ fontSize: 18, padding: 8, margin: 16 }}>
            <option>Piso 1</option>
            <option>Piso 2</option>
            <option>Piso 3</option>
            <option>Piso 4</option>
            <option>Piso 5</option>
          </select>
          <button style={{ fontSize: 18, padding: '8px 24px', background: '#1a4fa3', color: '#fff', border: 'none', borderRadius: 8, marginLeft: 12 }} onClick={() => alert('¡Funciona!')}>Test</button>
        </div>
      </div>
    </div>
  );
} 
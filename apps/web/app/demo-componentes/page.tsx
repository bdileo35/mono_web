'use client';

import { useState } from 'react';
import QRingContainer from '../components/QRingContainer';
import WizardOnboarding from '../components/WizardOnboarding';
import ConfigTimbres from '../components/ConfigTimbres';

// Datos de ejemplo para las demostraciones
const estructuraEjemplo = [
  { nombre: '5', dptos: ['A', 'B', 'C', 'D', 'E'] },
  { nombre: '4', dptos: ['A', 'B', 'C', 'D', 'E', 'F'] },
  { nombre: '3', dptos: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] },
  { nombre: '2', dptos: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] },
  { nombre: '1', dptos: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] },
  { nombre: 'PB', dptos: ['A'] }
];

const timbresEjemplo = [
  { id: '5-A', piso: '5', dpto: 'A', numero: '+5491122334455', metodo: 'mensaje', estado: 'activo', esPropio: false, estadoAsignacion: 'configurado' },
  { id: '4-B', piso: '4', dpto: 'B', numero: '+5491122334456', metodo: 'llamada', estado: 'activo', esPropio: false, estadoAsignacion: 'asignado' },
  { id: '3-C', piso: '3', dpto: 'C', numero: '', metodo: 'mensaje', estado: 'activo', esPropio: false, estadoAsignacion: 'solicitado' },
];

export default function DemoComponentes() {
  const [paso, setPaso] = useState(1);
  const [showRing, setShowRing] = useState(false);

  const handleTimbreTocado = (piso: string | number, dpto: string) => {
    setShowRing(true);
    setTimeout(() => {
      alert(`🔔 Timbre tocado: ${piso}${dpto}\n\nSimulando conexión con WhatsApp...`);
      setShowRing(false);
    }, 2000);
  };

  const renderPaso1 = () => (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f4f6fa', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ 
        background: 'white', 
        borderRadius: '16px', 
        padding: '32px', 
        boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#1a4fa3', fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>
          Componente 1: Selección Piso/Dpto
        </h1>
        <p style={{ color: '#666', fontSize: '16px', marginBottom: '32px' }}>
          Card con tabs Piso/Dpto y botón "Tocar Timbre" con animación Ring...Ring...
        </p>
        
        <QRingContainer
          calle="Tilcara"
          numero="2308"
          idUnico="demo123"
          estructura={estructuraEjemplo}
          onTimbreTocado={handleTimbreTocado}
          showBottomButtons={false}
        />
      </div>
    </div>
  );

  const renderPaso2 = () => (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f4f6fa', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ 
        background: 'white', 
        borderRadius: '16px', 
        padding: '32px', 
        boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
        maxWidth: '800px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#1a4fa3', fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>
          Componente 2: Configuración de Estructura
        </h1>
        <p style={{ color: '#666', fontSize: '16px', marginBottom: '32px' }}>
          Wizard con inputs de Calle, Altura, Pisos, Dptos y Check PB
        </p>
        
        <div style={{ 
          border: '2px solid #e0e3ea', 
          borderRadius: '12px', 
          padding: '20px',
          background: '#f8faff'
        }}>
          <WizardOnboarding />
        </div>
      </div>
    </div>
  );

  const renderPaso3 = () => (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f4f6fa', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ 
        background: 'white', 
        borderRadius: '16px', 
        padding: '32px', 
        boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
        maxWidth: '900px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#1a4fa3', fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>
          Componente 3: Configuración de Timbres
        </h1>
        <p style={{ color: '#666', fontSize: '16px', marginBottom: '32px' }}>
          Asignación de timbres con métodos de comunicación (Mensaje, Llamada, Video)
        </p>
        
        <div style={{ 
          border: '2px solid #e0e3ea', 
          borderRadius: '12px', 
          padding: '20px',
          background: '#f8faff'
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '40px repeat(8, 1fr)', 
            gap: '8px 4px', 
            justifyItems: 'center',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            {/* Cabecera de Letras */}
            <div />
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} style={{ textAlign: 'center', fontWeight: 700, color: '#1a4fa3' }}>
                {String.fromCharCode(65 + i)}
              </div>
            ))}
            
            {/* Grilla de Timbres */}
            <ConfigTimbres 
              estructura={estructuraEjemplo}
              timbres={timbresEjemplo}
              onChange={(nuevosTimbres) => console.log('Timbres actualizados:', nuevosTimbres)}
              maxDptos={8}
            />
          </div>
          
          <div style={{ 
            background: '#e8f5e9', 
            borderRadius: '8px', 
            padding: '16px', 
            marginTop: '20px',
            border: '1px solid #4caf50'
          }}>
            <h3 style={{ color: '#2e7d32', margin: '0 0 8px 0', fontSize: '16px' }}>
              Estados de los Timbres:
            </h3>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{ color: '#2e7d32' }}>🟢 Configurado</span>
              <span style={{ color: '#1976d2' }}>🔵 Asignado</span>
              <span style={{ color: '#9c27b0' }}>🟣 Solicitado</span>
              <span style={{ color: '#666' }}>⚪ Libre</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Header de navegación */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: '#1a4fa3',
        color: 'white',
        padding: '16px',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>
          Demo Componentes QRing - Paso {paso} de 3
        </h1>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setPaso(Math.max(1, paso - 1))}
            disabled={paso === 1}
            style={{
              background: paso === 1 ? '#ccc' : '#fff',
              color: paso === 1 ? '#999' : '#1a4fa3',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: paso === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            ← Anterior
          </button>
          
          <button
            onClick={() => setPaso(Math.min(3, paso + 1))}
            disabled={paso === 3}
            style={{
              background: paso === 3 ? '#ccc' : '#fff',
              color: paso === 3 ? '#999' : '#1a4fa3',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: paso === 3 ? 'not-allowed' : 'pointer'
            }}
          >
            Siguiente →
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div style={{ paddingTop: '80px' }}>
        {paso === 1 && renderPaso1()}
        {paso === 2 && renderPaso2()}
        {paso === 3 && renderPaso3()}
      </div>

      {/* Modal Ring...Ring... */}
      {showRing && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(30,40,60,0.18)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 24,
            boxShadow: '0 8px 32px #0003',
            padding: '48px 36px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: 320,
            animation: 'pop 0.3s',
          }}>
            <span style={{ fontSize: 54, color: '#1a4fa3', animation: 'shake 0.7s infinite' }}>🔔</span>
            <div style={{ fontWeight: 900, fontSize: 28, color: '#1a4fa3', margin: '18px 0 8px 0', letterSpacing: 1 }}>Ring... Ring...</div>
            <div style={{ color: '#222', fontSize: 18, textAlign: 'center', marginBottom: 8 }}>
              Tocando timbre en<br /><b>Tilcara 2308</b>
            </div>
            <div style={{ color: '#888', fontSize: 15, marginTop: 8 }}>Conectando con WhatsApp...</div>
          </div>
          <style>{`
            @keyframes shake {
              0% { transform: rotate(-10deg); }
              20% { transform: rotate(10deg); }
              40% { transform: rotate(-8deg); }
              60% { transform: rotate(8deg); }
              80% { transform: rotate(-4deg); }
              100% { transform: rotate(0deg); }
            }
            @keyframes pop {
              0% { transform: scale(0.7); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </>
  );
} 
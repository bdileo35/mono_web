'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TiendaPage() {
  const [cantidadTimbres, setCantidadTimbres] = useState(5);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Generar ID único para la compra
  const generarIdUnico = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleComprar = async () => {
    setLoading(true);
    
    try {
      const idUnico = generarIdUnico();
      
      const response = await fetch('/api/tienda/crear-preferencia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cantidadTimbres,
          idUnico
        }),
      });

      const data = await response.json();

      if (data.error) {
        alert('Error: ' + data.error);
        return;
      }

      // SIMULACIÓN - Ir directamente a la página de éxito
      console.log('Simulando pago exitoso...');
      window.location.href = `/tienda/exito?idUnico=${idUnico}&cantidad=${cantidadTimbres}&monto=${precioTotal}`;

    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar la compra');
    } finally {
      setLoading(false);
    }
  };

  const precioPorTimbre = 10;
  const precioTotal = cantidadTimbres * precioPorTimbre;

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f4f6fa', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: 500,
        width: '100%',
        background: '#fff',
        borderRadius: 24,
        boxShadow: '0 4px 24px #0002',
        padding: 40,
        textAlign: 'center'
      }}>
        <h1 style={{ 
          color: '#1a4fa3', 
          fontWeight: 800, 
          fontSize: 32, 
          marginBottom: 8 
        }}>
          Tienda QRing
        </h1>
        
        <p style={{ 
          color: '#666', 
          fontSize: 18, 
          marginBottom: 32 
        }}>
          Compra timbres para tu edificio
        </p>

        <div style={{
          background: '#f8faff',
          borderRadius: 16,
          padding: 24,
          marginBottom: 32,
          border: '2px solid #e0e6f3'
        }}>
          <h3 style={{ 
            color: '#1a4fa3', 
            fontWeight: 700, 
            fontSize: 20, 
            marginBottom: 16 
          }}>
            Selecciona cantidad de timbres
          </h3>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            marginBottom: 24
          }}>
            <button
              onClick={() => setCantidadTimbres(Math.max(5, cantidadTimbres - 5))}
              style={{
                background: '#1a4fa3',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                width: 40,
                height: 40,
                fontSize: 20,
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              -
            </button>
            
            <span style={{
              fontSize: 24,
              fontWeight: 700,
              color: '#1a4fa3',
              minWidth: 60
            }}>
              {cantidadTimbres}
            </span>
            
            <button
              onClick={() => setCantidadTimbres(cantidadTimbres + 5)}
              style={{
                background: '#1a4fa3',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                width: 40,
                height: 40,
                fontSize: 20,
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              +
            </button>
          </div>
          
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: 16,
            border: '2px solid #e0e6f3'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 8
            }}>
              <span style={{ color: '#666' }}>Precio por timbre:</span>
              <span style={{ fontWeight: 600 }}>${precioPorTimbre}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 20,
              fontWeight: 700,
              color: '#1a4fa3',
              borderTop: '1px solid #e0e6f3',
              paddingTop: 8
            }}>
              <span>Total:</span>
              <span>${precioTotal}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleComprar}
          disabled={loading}
          style={{
            background: loading ? '#ccc' : '#1a4fa3',
            color: '#fff',
            border: 'none',
            borderRadius: 16,
            padding: '16px 32px',
            fontSize: 20,
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            width: '100%',
            transition: 'all 0.2s'
          }}
        >
          {loading ? 'Procesando...' : 'Simular Compra (MP)'}
        </button>

        <p style={{
          color: '#999',
          fontSize: 14,
          marginTop: 16
        }}>
          Simulación de pago - Sin credenciales reales de MP
        </p>
      </div>
    </div>
  );
}

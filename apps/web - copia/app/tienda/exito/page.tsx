"use client";

import Header from '@/app/components/Header';
import CardContainer from '@/app/components/CardContainer';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ExitoPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [venta, setVenta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const idUnico = searchParams.get('idUnico');
    if (idUnico) {
      // Obtener datos de la venta desde la URL
      const ventaData = {
        idUnico: idUnico,
        cantidadTimbres: parseInt(searchParams.get('cantidad') || '5'),
        precioTotal: parseInt(searchParams.get('monto') || '5000')
      };
      setVenta(ventaData);
    setLoading(false);
    }
  }, [searchParams]);

  const handleGuardarVenta = async () => {
    if (!venta) return;
    
    setGuardando(true);
    try {
      const response = await fetch('/api/admin/ventas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idUnico: venta.idUnico,
          cantidadTimbres: venta.cantidadTimbres,
          monto: venta.precioTotal
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert('✅ Venta guardada exitosamente');
        // Redirigir a la configuración del edificio
        router.push(`/admin/${venta.idUnico}`);
      } else {
        alert('❌ Error al guardar: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error al guardar la venta');
    } finally {
      setGuardando(false);
    }
  };

  const handleConfigurar = async () => {
    if (!venta) return;
    
    setGuardando(true);
    try {
      // Primero guardar la venta
      const response = await fetch('/api/admin/ventas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idUnico: venta.idUnico,
          cantidadTimbres: venta.cantidadTimbres,
          monto: venta.precioTotal
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert('✅ Venta guardada y redirigiendo a configuración...');
        // Redirigir a la configuración del edificio
        router.push(`/admin/${venta.idUnico}`);
      } else {
        alert('❌ Error al guardar: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error al guardar la venta');
    } finally {
      setGuardando(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div style={{ textAlign: 'center', marginTop: 100 }}>
          <div style={{ fontSize: 24, color: '#1a4fa3' }}>Procesando pago...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <main style={{ paddingTop: 60, paddingBottom: 60, minHeight: '100vh', background: '#f4f6fa' }}>
        <CardContainer>
          <div style={{ textAlign: 'center', padding: 24 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h1 style={{ color: '#4CAF50', fontWeight: 800, fontSize: 24, marginBottom: 12 }}>
              ¡Pago Exitoso!
            </h1>
            <p style={{ color: '#333', fontSize: 16, marginBottom: 24, lineHeight: 1.4 }}>
              Tu compra de QRing ha sido procesada correctamente.
            </p>
            
            {venta && (
              <div style={{ background: '#f9f9f9', borderRadius: 12, padding: 20, marginBottom: 24 }}>
                <h2 style={{ color: '#1a4fa3', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
                  Detalles de tu compra
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#333', fontWeight: 600 }}>ID Único:</span>
                    <span style={{ color: '#1a4fa3', fontWeight: 700 }}>{venta.idUnico}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#333', fontWeight: 600 }}>Timbres:</span>
                    <span style={{ color: '#1a4fa3', fontWeight: 700 }}>{venta.cantidadTimbres}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#333', fontWeight: 600 }}>Total:</span>
                    <span style={{ color: '#1a4fa3', fontWeight: 700 }}>${venta.precioTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button 
                onClick={handleGuardarVenta}
                disabled={guardando}
                style={{ 
                  flex: 1,
                  maxWidth: 200,
                  background: guardando ? '#ccc' : '#28a745', 
                  color: '#fff', 
                  border: 'none',
                  padding: '14px 24px', 
                  borderRadius: 10, 
                  fontWeight: 700, 
                  fontSize: 16,
                  cursor: guardando ? 'not-allowed' : 'pointer',
                  boxShadow: '0 2px 8px #0001'
                }}
              >
                {guardando ? 'Guardando...' : '💾 Ver en Panel'}
              </button>
              
              <button 
                onClick={handleConfigurar}
                disabled={guardando}
                style={{ 
                  flex: 1,
                  maxWidth: 200,
                  background: guardando ? '#ccc' : '#1a4fa3', 
                  color: '#fff', 
                  border: 'none',
                  padding: '14px 24px', 
                  borderRadius: 10, 
                  fontWeight: 700, 
                  fontSize: 16,
                  cursor: guardando ? 'not-allowed' : 'pointer',
                  boxShadow: '0 2px 8px #0001'
                }}
              >
                {guardando ? 'Guardando...' : '⚙️ Configurar'}
              </button>
            </div>
            
            <p style={{ color: '#666', fontSize: 12, marginTop: 12 }}>
              <strong>Ver en Panel:</strong> Solo guarda la venta en el panel de administración<br/>
              <strong>Configurar:</strong> Guarda la venta y va directo a configurar el edificio
            </p>
          </div>
        </CardContainer>
      </main>
    </>
  );
} 
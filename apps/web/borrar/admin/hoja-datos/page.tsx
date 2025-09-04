"use client";

import { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import CardContainer from '@/app/components/CardContainer';

export default function HojaDatosPage() {
  const [ventas, setVentas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cargar datos al montar el componente
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/ventas');
      const data = await response.json();

      if (data.success) {
        setVentas(data.ventas || []);
        console.log('📊 Datos cargados:', data.ventas);
      } else {
        setError(data.error || 'Error al cargar datos');
      }
    } catch (error) {
      setError('Error de conexión');
      console.error('❌ Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatearFecha = (fecha: any) => {
    if (!fecha) return 'N/A';
    return new Date(fecha).toLocaleDateString('es-ES');
  };

  const formatearPrecio = (monto: number) => {
    return `$${monto.toLocaleString()}`;
  };

  return (
    <>
      <Header />
      <main style={{ paddingTop: 80, paddingBottom: 40, minHeight: '100vh', background: '#f4f6fa' }}>
        <CardContainer>
          <div style={{ padding: 24 }}>
            <h1 style={{ color: '#1a4fa3', fontWeight: 800, fontSize: 28, marginBottom: 24, textAlign: 'center' }}>
              📊 Hoja de Datos - Ventas
            </h1>

            {/* Controles */}
            <div style={{ marginBottom: 24, textAlign: 'center' }}>
              <button
                onClick={cargarDatos}
                disabled={loading}
                style={{
                  background: loading ? '#ccc' : '#1a4fa3',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 24px',
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  marginRight: 12
                }}
              >
                {loading ? '🔄 Cargando...' : '🔄 Actualizar'}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: '#ffebee',
                color: '#c62828',
                padding: 16,
                borderRadius: 8,
                marginBottom: 24,
                textAlign: 'center',
                fontWeight: 600
              }}>
                ❌ {error}
              </div>
            )}

            {/* Tabla Principal - Ventas */}
            {ventas.length > 0 && (
              <div style={{ marginTop: 24 }}>
                <h2 style={{ color: '#333', fontWeight: 700, fontSize: 20, marginBottom: 16 }}>
                  📋 Ventas ({ventas.length})
                </h2>
                
                {/* Headers de la tabla */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 100px 120px 120px 120px',
                  gap: 12,
                  padding: '12px 16px',
                  background: '#1a4fa3',
                  color: '#fff',
                  fontWeight: 700,
                  borderRadius: '8px 8px 0 0',
                  fontSize: 14
                }}>
                  <div>IDU</div>
                  <div style={{ textAlign: 'center' }}>Timbres</div>
                  <div style={{ textAlign: 'center' }}>Fecha Venta</div>
                  <div style={{ textAlign: 'center' }}>Fecha Act</div>
                  <div style={{ textAlign: 'center' }}>Monto</div>
                </div>

                {/* Filas de datos */}
                <div style={{ display: 'grid', gap: 1 }}>
                  {ventas.map((venta, index) => (
                    <div key={venta.id}>
                      {/* Fila principal - Venta */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 100px 120px 120px 120px',
                        gap: 12,
                        padding: '12px 16px',
                        background: index % 2 === 0 ? '#fff' : '#f8f9fa',
                        borderBottom: '1px solid #e0e0e0',
                        alignItems: 'center',
                        fontSize: 14
                      }}>
                        {/* IDU */}
                        <div style={{ fontWeight: 600, color: '#1a4fa3' }}>
                          {venta.idUnico}
                        </div>

                        {/* Timbres */}
                        <div style={{ textAlign: 'center', fontWeight: 600 }}>
                          {venta.cantidadTimbres}
                        </div>

                        {/* Fecha Venta */}
                        <div style={{ textAlign: 'center', fontSize: 12, color: '#666' }}>
                          {formatearFecha(venta.createdAt)}
                        </div>

                        {/* Fecha Act */}
                        <div style={{ textAlign: 'center', fontSize: 12, color: '#666' }}>
                          {formatearFecha(venta.updatedAt)}
                        </div>

                        {/* Monto */}
                        <div style={{ textAlign: 'center', fontWeight: 600, color: '#388e3c' }}>
                          {formatearPrecio(venta.monto)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sin ventas */}
            {!loading && ventas.length === 0 && !error && (
              <div style={{
                background: '#e3f2fd',
                color: '#1976d2',
                padding: 24,
                borderRadius: 8,
                textAlign: 'center',
                fontWeight: 600
              }}>
                📭 No hay ventas para mostrar
              </div>
            )}
          </div>
        </CardContainer>
      </main>
    </>
  );
}


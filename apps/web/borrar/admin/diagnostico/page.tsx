"use client";

import { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import CardContainer from '@/app/components/CardContainer';

export default function DiagnosticoPage() {
  const [ventas, setVentas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Cargar todas las ventas al montar el componente
  useEffect(() => {
    cargarVentas();
  }, []);

  const cargarVentas = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/ventas');
      const data = await response.json();

      if (data.success) {
        // Usar directamente los datos de ventas
        setVentas(data.ventas || []);
        console.log('📊 Ventas cargadas:', data.ventas);
        console.log('📊 Ventas cargadas:', data.ventas);
      } else {
        setError(data.error || 'Error al cargar ventas');
      }
    } catch (error) {
      setError('Error de conexión');
      console.error('❌ Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const formatearFecha = (fecha: any) => {
    if (!fecha) return 'N/A';
    if (typeof fecha === 'object' && fecha.local) {
      return fecha.local;
    }
    return new Date(fecha).toLocaleString('es-ES');
  };

  const formatearPrecio = (monto: number) => {
    return `$${monto.toLocaleString()}`;
  };

  // Función para obtener timbres de un piso específico
  const getTimbresPorPiso = (timbres: any[], piso: string) => {
    return timbres.filter(timbre => timbre.piso === piso);
  };

  return (
    <>
      <Header />
      <main style={{ paddingTop: 80, paddingBottom: 40, minHeight: '100vh', background: '#f4f6fa' }}>
        <CardContainer>
          <div style={{ padding: 24 }}>
            <h1 style={{ color: '#1a4fa3', fontWeight: 800, fontSize: 28, marginBottom: 24, textAlign: 'center' }}>
              🔍 Diagnóstico de Ventas
            </h1>

            {/* Botón de recargar */}
            <div style={{ marginBottom: 24, textAlign: 'center' }}>
              <button
                onClick={cargarVentas}
                disabled={loading}
                style={{
                  background: loading ? '#ccc' : '#1a4fa3',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 24px',
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? '🔄 Cargando...' : '🔄 Recargar Datos'}
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

            {/* Tabla de ventas */}
            {ventas.length > 0 && (
              <div style={{ marginTop: 24 }}>
                <h2 style={{ color: '#333', fontWeight: 700, fontSize: 20, marginBottom: 16 }}>
                  📊 Ventas ({ventas.length})
                </h2>
                
                <div style={{ display: 'grid', gap: 12 }}>
                  {ventas.map((diagnostico, index) => (
                    <div key={diagnostico.venta.id} style={{
                      background: '#fff',
                      border: '1px solid #e0e0e0',
                      borderRadius: 8,
                      overflow: 'hidden'
                    }}>
                      {/* Fila principal - Venta */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '40px 1fr 120px 120px 120px 120px 150px',
                        gap: 12,
                        padding: '16px 20px',
                        background: '#f8faff',
                        borderBottom: '1px solid #e0e0e0',
                        alignItems: 'center'
                      }}>
                        {/* Botón expandir */}
                        <button
                          onClick={() => toggleExpanded(`venta-${diagnostico.venta.id}`)}
                          style={{
                            background: 'none',
                            border: 'none',
                            fontSize: 18,
                            cursor: 'pointer',
                            color: '#1a4fa3',
                            fontWeight: 700,
                            width: 24,
                            height: 24,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {expandedItems.has(`venta-${diagnostico.venta.id}`) ? '−' : '+'}
                        </button>

                        {/* IDU */}
                        <div style={{ fontWeight: 600, color: '#1a4fa3' }}>
                          {diagnostico.venta.idUnico}
                        </div>

                        {/* Cantidad */}
                        <div style={{ textAlign: 'center', fontWeight: 600 }}>
                          {diagnostico.venta.cantidadTimbres} timbres
                        </div>

                        {/* Monto */}
                        <div style={{ textAlign: 'center', fontWeight: 600, color: '#388e3c' }}>
                          {formatearPrecio(diagnostico.venta.monto)}
                        </div>

                        {/* Estado */}
                        <div style={{ textAlign: 'center' }}>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 600,
                            background: diagnostico.venta.estado === 'PAGADA' ? '#e8f5e9' : '#fff3e0',
                            color: diagnostico.venta.estado === 'PAGADA' ? '#2e7d32' : '#f57c00',
                            border: `1px solid ${diagnostico.venta.estado === 'PAGADA' ? '#4caf50' : '#ff9800'}`
                          }}>
                            {diagnostico.venta.estado}
                          </span>
                        </div>

                        {/* Fecha */}
                        <div style={{ textAlign: 'center', fontSize: 12, color: '#666' }}>
                          {formatearFecha(diagnostico.venta.createdAt)}
                        </div>

                        {/* Resumen */}
                        <div style={{ textAlign: 'center', fontSize: 12, color: '#666' }}>
                          {diagnostico.direccion ? (
                            <span>
                              {diagnostico.direccion.timbres.length} timbres
                              {diagnostico.direccion.timbres.filter((t: any) => t.numero).length > 0 && (
                                <span style={{ color: '#4caf50' }}>
                                  {' '}({diagnostico.direccion.timbres.filter((t: any) => t.numero).length} con número)
                                </span>
                              )}
                            </span>
                          ) : (
                            'Sin dirección'
                          )}
                        </div>
                      </div>

                      {/* Contenido expandible */}
                      {expandedItems.has(`venta-${diagnostico.venta.id}`) && (
                        <div style={{ padding: '20px' }}>
                          {/* Información de venta */}
                          <div style={{ marginBottom: 20 }}>
                            <h3 style={{ color: '#1a4fa3', fontWeight: 700, fontSize: 16, marginBottom: 12 }}>
                              💰 Detalles de Venta
                            </h3>
                            <div style={{
                              background: '#f9f9f9',
                              borderRadius: 6,
                              padding: 12,
                              display: 'grid',
                              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                              gap: 8
                            }}>
                              <div><strong>ID:</strong> {diagnostico.venta.id}</div>
                              <div><strong>IDU:</strong> {diagnostico.venta.idUnico}</div>
                              <div><strong>Cantidad:</strong> {diagnostico.venta.cantidadTimbres} timbres</div>
                              <div><strong>Monto:</strong> {formatearPrecio(diagnostico.venta.monto)}</div>
                              <div><strong>Estado:</strong> {diagnostico.venta.estado}</div>
                              <div><strong>Creada:</strong> {formatearFecha(diagnostico.venta.createdAt)}</div>
                              <div><strong>Actualizada:</strong> {formatearFecha(diagnostico.venta.updatedAt)}</div>
                            </div>
                          </div>

                          {/* Información de dirección */}
                          {diagnostico.direccion && (
                            <div style={{ marginBottom: 20 }}>
                              <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 40px',
                                gap: 12,
                                alignItems: 'center',
                                marginBottom: 12
                              }}>
                                <h3 style={{ color: '#1a4fa3', fontWeight: 700, fontSize: 16, margin: 0 }}>
                                  🏢 Dirección: {diagnostico.direccion.nombre}
                                </h3>
                                <button
                                  onClick={() => toggleExpanded(`direccion-${diagnostico.venta.id}`)}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: 16,
                                    cursor: 'pointer',
                                    color: '#1a4fa3',
                                    fontWeight: 700,
                                    width: 24,
                                    height: 24,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}
                                >
                                  {expandedItems.has(`direccion-${diagnostico.venta.id}`) ? '−' : '+'}
                                </button>
                              </div>

                              {/* Detalles de dirección expandibles */}
                              {expandedItems.has(`direccion-${diagnostico.venta.id}`) && (
                                <div style={{ paddingLeft: 20 }}>
                                  {/* Info básica de dirección */}
                                  <div style={{
                                    background: '#f9f9f9',
                                    borderRadius: 6,
                                    padding: 12,
                                    marginBottom: 16,
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                    gap: 8
                                  }}>
                                    <div><strong>Nombre:</strong> {diagnostico.direccion.nombre}</div>
                                    <div><strong>Calle:</strong> {diagnostico.direccion.calle}</div>
                                    <div><strong>Número:</strong> {diagnostico.direccion.numero}</div>
                                    <div><strong>Ciudad:</strong> {diagnostico.direccion.ciudad}</div>
                                    <div><strong>Creada:</strong> {formatearFecha(diagnostico.direccion.createdAt)}</div>
                                    <div><strong>Actualizada:</strong> {formatearFecha(diagnostico.direccion.updatedAt)}</div>
                                  </div>

                                  {/* Estructura con timbres expandibles por piso */}
                                  <div style={{ marginBottom: 16 }}>
                                    <h4 style={{ color: '#333', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>
                                      🏗️ Estructura y Timbres ({diagnostico.direccion.estructura.length} pisos)
                                    </h4>
                                    <div style={{ display: 'grid', gap: 8 }}>
                                      {diagnostico.direccion.estructura.map((piso: any) => {
                                        const timbresDelPiso = getTimbresPorPiso(diagnostico.direccion.timbres, piso.nombre);
                                        const timbresConNumero = timbresDelPiso.filter((t: any) => t.numero).length;
                                        
                                        return (
                                          <div key={piso.id} style={{
                                            background: '#fff',
                                            border: '1px solid #e0e0e0',
                                            borderRadius: 6,
                                            overflow: 'hidden'
                                          }}>
                                            {/* Fila del piso */}
                                            <div style={{
                                              display: 'grid',
                                              gridTemplateColumns: '40px 1fr 120px 120px',
                                              gap: 12,
                                              padding: '12px 16px',
                                              background: '#f5f5f5',
                                              borderBottom: '1px solid #e0e0e0',
                                              alignItems: 'center'
                                            }}>
                                              {/* Botón expandir piso */}
                                              <button
                                                onClick={() => toggleExpanded(`piso-${piso.id}`)}
                                                style={{
                                                  background: 'none',
                                                  border: 'none',
                                                  fontSize: 16,
                                                  cursor: 'pointer',
                                                  color: '#1a4fa3',
                                                  fontWeight: 700,
                                                  width: 24,
                                                  height: 24,
                                                  display: 'flex',
                                                  alignItems: 'center',
                                                  justifyContent: 'center'
                                                }}
                                              >
                                                {expandedItems.has(`piso-${piso.id}`) ? '−' : '+'}
                                              </button>

                                              {/* Nombre del piso */}
                                              <div style={{ fontWeight: 600, color: '#333' }}>
                                                Piso {piso.nombre}: {piso.dptos.join(', ')}
                                              </div>

                                              {/* Cantidad de timbres */}
                                              <div style={{ textAlign: 'center', fontSize: 12, color: '#666' }}>
                                                {timbresDelPiso.length} timbres
                                              </div>

                                              {/* Timbres con número */}
                                              <div style={{ textAlign: 'center', fontSize: 12 }}>
                                                {timbresConNumero > 0 ? (
                                                  <span style={{ color: '#4caf50', fontWeight: 600 }}>
                                                    {timbresConNumero} con número
                                                  </span>
                                                ) : (
                                                  <span style={{ color: '#f44336' }}>
                                                    Sin números
                                                  </span>
                                                )}
                                              </div>
                                            </div>

                                            {/* Timbres del piso expandibles */}
                                            {expandedItems.has(`piso-${piso.id}`) && (
                                              <div style={{ padding: '16px' }}>
                                                <h5 style={{ color: '#666', fontWeight: 600, fontSize: 12, marginBottom: 8 }}>
                                                  🔔 Timbres del Piso {piso.nombre} ({timbresDelPiso.length} total)
                                                </h5>
                                                <div style={{ display: 'grid', gap: 6 }}>
                                                  {timbresDelPiso.map((timbre: any) => (
                                                    <div key={timbre.id} style={{
                                                      background: '#fafafa',
                                                      border: '1px solid #e0e0e0',
                                                      borderRadius: 4,
                                                      padding: 8
                                                    }}>
                                                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 6 }}>
                                                        <div><strong>Timbre:</strong> {timbre.nombre}</div>
                                                        <div>
                                                          <strong>Número:</strong> 
                                                          <span style={{ 
                                                            color: timbre.numero ? '#4caf50' : '#f44336',
                                                            fontWeight: timbre.numero ? 600 : 400,
                                                            marginLeft: 4
                                                          }}>
                                                            {timbre.numero || 'Sin configurar'}
                                                          </span>
                                                        </div>
                                                        <div><strong>Método:</strong> {timbre.metodo}</div>
                                                        <div>
                                                          <strong>Estado:</strong> 
                                                          <span style={{
                                                            padding: '2px 4px',
                                                            borderRadius: 3,
                                                            fontSize: 10,
                                                            fontWeight: 600,
                                                            background: timbre.estado === 'activo' ? '#e8f5e9' : '#fff3e0',
                                                            color: timbre.estado === 'activo' ? '#2e7d32' : '#f57c00',
                                                            marginLeft: 4
                                                          }}>
                                                            {timbre.estado}
                                                          </span>
                                                        </div>
                                                        <div>
                                                          <strong>Asignación:</strong> 
                                                          <span style={{
                                                            padding: '2px 4px',
                                                            borderRadius: 3,
                                                            fontSize: 10,
                                                            fontWeight: 600,
                                                            background: timbre.estadoAsignacion === 'configurado' ? '#e3f2fd' : '#fff3e0',
                                                            color: timbre.estadoAsignacion === 'configurado' ? '#1976d2' : '#f57c00',
                                                            marginLeft: 4
                                                          }}>
                                                            {timbre.estadoAsignacion}
                                                          </span>
                                                        </div>
                                                        <div><strong>Propio:</strong> {timbre.esPropio ? 'Sí' : 'No'}</div>
                                                      </div>
                                                      <div style={{ fontSize: 10, color: '#666', marginTop: 4 }}>
                                                        Creado: {formatearFecha(timbre.createdAt)} | Actualizado: {formatearFecha(timbre.updatedAt)}
                                                      </div>
                                                    </div>
                                                  ))}
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Sin dirección */}
                          {!diagnostico.direccion && (
                            <div style={{
                              background: '#fff3e0',
                              color: '#f57c00',
                              padding: 12,
                              borderRadius: 6,
                              textAlign: 'center',
                              fontWeight: 600
                            }}>
                              ⚠️ Esta venta no tiene dirección asociada
                            </div>
                          )}
                        </div>
                      )}
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

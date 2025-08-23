'use client';
import { useState } from 'react';

interface Venta {
  id: string;
  idUnico: string;
  cantidadTimbres: number;
  monto: number;
  estado: 'PAGADA' | 'PENDIENTE' | 'CANCELADA';
  fecha: string;
  edificio?: {
    direccion: string;
    admin: string;
    timbresConfigurados: number;
    timbresAsignados: number;
  };
}

export default function DashboardAdmin() {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // Datos simulados
  const ventas: Venta[] = [
    {
      id: 'V001',
      idUnico: 'EDIF_001',
      cantidadTimbres: 15,
      monto: 150,
      estado: 'PAGADA',
      fecha: '2024-01-15',
      edificio: {
        direccion: 'Av. Siempre Viva 123',
        admin: 'Juan Pérez',
        timbresConfigurados: 12,
        timbresAsignados: 8
      }
    },
    {
      id: 'V002',
      idUnico: 'EDIF_002',
      cantidadTimbres: 20,
      monto: 200,
      estado: 'PENDIENTE',
      fecha: '2024-01-16',
      edificio: {
        direccion: 'Calle Principal 456',
        admin: 'María García',
        timbresConfigurados: 18,
        timbresAsignados: 15
      }
    }
  ];

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#1a4fa3', fontSize: '24px', marginBottom: '20px' }}>
        Dashboard - Ventas
      </h1>
      
      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        overflow: 'hidden',
        backgroundColor: '#fff'
      }}>
        {/* Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '50px 1fr 100px 100px 100px 120px',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #ddd',
          fontWeight: 'bold',
          fontSize: '14px'
        }}>
          <div style={{ padding: '12px', textAlign: 'center' }}>+</div>
          <div style={{ padding: '12px' }}>ID Único</div>
          <div style={{ padding: '12px', textAlign: 'center' }}>Timbres</div>
          <div style={{ padding: '12px', textAlign: 'center' }}>Monto</div>
          <div style={{ padding: '12px', textAlign: 'center' }}>Estado</div>
          <div style={{ padding: '12px', textAlign: 'center' }}>Fecha</div>
        </div>

        {/* Rows */}
        {ventas.map((venta) => (
          <div key={venta.id}>
            {/* Main Row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '50px 1fr 100px 100px 100px 120px',
              borderBottom: '1px solid #eee',
              cursor: 'pointer',
              backgroundColor: expandedRows.has(venta.id) ? '#f0f8ff' : '#fff'
            }}
            onClick={() => toggleRow(venta.id)}>
              <div style={{ padding: '12px', textAlign: 'center', fontSize: '18px' }}>
                {expandedRows.has(venta.id) ? '−' : '+'}
              </div>
              <div style={{ padding: '12px', fontWeight: 'bold' }}>{venta.idUnico}</div>
              <div style={{ padding: '12px', textAlign: 'center' }}>{venta.cantidadTimbres}</div>
              <div style={{ padding: '12px', textAlign: 'center' }}>${venta.monto}</div>
              <div style={{ 
                padding: '12px', 
                textAlign: 'center',
                color: venta.estado === 'PAGADA' ? '#28a745' : venta.estado === 'PENDIENTE' ? '#ffc107' : '#dc3545'
              }}>
                {venta.estado}
              </div>
              <div style={{ padding: '12px', textAlign: 'center' }}>{venta.fecha}</div>
            </div>

            {/* Expanded Details */}
            {expandedRows.has(venta.id) && venta.edificio && (
              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '16px',
                borderBottom: '1px solid #eee'
              }}>
                <h4 style={{ margin: '0 0 12px 0', color: '#1a4fa3' }}>Detalles del Edificio</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div>
                    <strong>Dirección:</strong> {venta.edificio.direccion}
                  </div>
                  <div>
                    <strong>Admin:</strong> {venta.edificio.admin}
                  </div>
                  <div>
                    <strong>Configurados:</strong> {venta.edificio.timbresConfigurados}
                  </div>
                  <div>
                    <strong>Asignados:</strong> {venta.edificio.timbresAsignados}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 
"use client";
import { useEffect, useState } from "react";
import React from "react";
import QRCodeDisplay from "@/app/components/QRCodeDisplay";
import CardContainer from "@/app/components/CardContainer";
import Header from '@/app/components/Header';

// Ruta de la imagen de los 3 pasos (ajustar si la pones en public)
const pasosImg = "/3steps_qring.png"; // Cambia el nombre si usas otro
const logoImg = "/logo_qring.png"; // Cambia el nombre si usas otro

export default function AdminRootPage() {
  const [tab, setTab] = useState<'Piso' | 'Dpto'>('Piso');
  const [pisoSel, setPisoSel] = useState<number | null>(null);
  const pisos = [1,2,3,4,5,6,7,8,9,10,11,12];

  // Ancho fijo para tabs y botón, igual que la grilla
  const controlWidth = 320;

  return (
    <>
      <Header />
      <div style={{ minHeight: '100vh', background: '#f4f6fa', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: 40 }}>
        <CardContainer>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Tabs */}
            <div style={{ display: 'flex', borderRadius: 12, overflow: 'hidden', border: '1.5px solid #e0e6f3', marginBottom: 18, width: controlWidth }}>
              <button
                onClick={() => setTab('Piso')}
                style={{
                  flex: 1,
                  background: tab === 'Piso' ? '#2563eb' : '#f4f6fa',
                  color: tab === 'Piso' ? '#fff' : '#2563eb',
                  fontWeight: 700,
                  fontSize: 18,
                  border: 'none',
                  padding: '12px 0',
                  transition: 'all 0.2s',
                  outline: 'none',
                  cursor: 'pointer',
                  borderRight: '1.5px solid #e0e6f3',
                }}
              >Piso</button>
              <button
                onClick={() => setTab('Dpto')}
                style={{
                  flex: 1,
                  background: tab === 'Dpto' ? '#2563eb' : '#f4f6fa',
                  color: tab === 'Dpto' ? '#fff' : '#2563eb',
                  fontWeight: 700,
                  fontSize: 18,
                  border: 'none',
                  padding: '12px 0',
                  transition: 'all 0.2s',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >Dpto</button>
            </div>
            {/* Grilla de botones Piso */}
            {tab === 'Piso' && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 12,
                marginBottom: 18,
                width: controlWidth,
              }}>
                {pisos.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPisoSel(p)}
                    disabled={p > 8}
                    style={{
                      fontSize: 24,
                      fontWeight: 600,
                      border: pisoSel === p ? '2px solid #2563eb' : '1.5px solid #e0e6f3',
                      background: p > 8 ? '#f4f6fa' : pisoSel === p ? '#2563eb' : '#fff',
                      color: p > 8 ? '#bbb' : pisoSel === p ? '#fff' : '#2563eb',
                      borderRadius: 12,
                      padding: '16px 0',
                      boxShadow: p > 8 ? 'none' : '0 2px 8px #0001',
                      cursor: p > 8 ? 'not-allowed' : 'pointer',
                      opacity: p > 8 ? 0.5 : 1,
                      transition: 'all 0.2s',
                      width: '100%',
                    }}
                  >{p}</button>
                ))}
              </div>
            )}
            {/* Botón Tocar Timbre */}
            <button
              style={{
                width: controlWidth,
                background: '#e0e0e0',
                color: '#bbb',
                border: 'none',
                borderRadius: 12,
                padding: '16px 0',
                fontSize: 20,
                fontWeight: 700,
                marginTop: 8,
                cursor: 'not-allowed',
                opacity: 0.7,
                boxShadow: '0 2px 8px #0001',
                transition: 'all 0.2s',
              }}
              disabled
            >Tocar Timbre</button>
          </div>
        </CardContainer>
      </div>
    </>
  );
} 
"use client";
import { useState, useEffect } from "react";
import Header from '@/app/components/Header';
import CardContainer from '@/app/components/CardContainer';
import QRCodeDisplay from '@/app/components/QRCodeDisplay';

interface PisoConfig {
  nombre: string;
  dptos: string[];
}

interface TimbreConfig {
  id: string;
  piso: string;
  dpto: string;
  numero: string;
  metodo: string;
  estado: string;
  esPropio: boolean;
  estadoAsignacion: string;
}

export default function Home() {
  const [tab, setTab] = useState<'Piso' | 'Dpto'>('Piso');
  const [pisoSel, setPisoSel] = useState<string | null>(null);
  const [dptoSel, setDptoSel] = useState<string | null>(null);
  const [estructura, setEstructura] = useState<PisoConfig[]>([]);
  const [timbres, setTimbres] = useState<TimbreConfig[]>([]);
  const [direccion, setDireccion] = useState("Av. Siempre Viva 1234");
  const [idUnico, setIdUnico] = useState("test-id");
  
  const azul = "#1a4fa3";
  const controlWidth = 320;
  const controlRadius = 24;

  // Cargar datos del wizard desde localStorage
  useEffect(() => {
    const datosGuardados = localStorage.getItem('wizardData');
    if (datosGuardados) {
      const data = JSON.parse(datosGuardados);
      setEstructura(data.estructura || []);
      setTimbres(data.timbres || []);
      setDireccion(`${data.calle || 'Av. Siempre Viva'} ${data.numero || '1234'}`);
      setIdUnico(data.idUnico || 'test-id');
    }
  }, []);

  // Derivar listas de pisos y dptos de la estructura
  const pisos = estructura?.map((piso: PisoConfig) => piso.nombre) || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const dptosDelPisoSel = pisoSel ? 
    estructura?.find((p: PisoConfig) => p.nombre === pisoSel)?.dptos || ["A", "B", "C", "D", "E", "F", "G", "H"] : 
    ["A", "B", "C", "D", "E", "F", "G", "H"];

  // Función para verificar si un timbre está configurado
  const isTimbreConfigurado = (piso: string, dpto: string) => {
    const timbre = timbres.find(t => t.piso === piso && t.dpto === dpto);
    return timbre && (timbre.estadoAsignacion === 'configurado' || timbre.estadoAsignacion === 'asignado');
  };

  // Función para obtener el estilo de un botón según su estado
  const getButtonStyle = (isSelected: boolean, isConfigurado: boolean, value: string | number) => {
    const baseStyle = {
      borderRadius: 10,
      padding: '10px 0',
      textAlign: 'center' as const,
      fontWeight: 800,
      fontSize: 18,
      border: '2px solid',
      outline: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s',
      minWidth: 0
    };

    if (isSelected) {
      return {
        ...baseStyle,
        background: azul,
        color: '#fff',
        borderColor: azul,
        boxShadow: '0 2px 8px #0002'
      };
    }

    if (isConfigurado) {
      return {
        ...baseStyle,
        background: '#eaf4ff',
        color: azul,
        borderColor: azul,
        boxShadow: '0 1px 4px rgba(26, 79, 163, 0.2)'
      };
    }

    return {
      ...baseStyle,
      background: '#f8f9fa',
      color: '#999',
      borderColor: '#e0e0e0',
      boxShadow: 'none'
    };
  };

  const handlePisoSelect = (piso: string) => {
    setPisoSel(piso);
    setDptoSel(null);
  };

  const handleDptoSelect = (dpto: string) => {
    setDptoSel(dpto);
  };

  const handleTocarTimbre = () => {
    if (!pisoSel || !dptoSel) return;
    
    // Verificar si el timbre está configurado
    if (!isTimbreConfigurado(pisoSel, dptoSel)) {
      alert('Este timbre no está configurado. Contacta al administrador del edificio.');
      return;
    }

    // Comportamiento por defecto: abrir WhatsApp
    const mensaje = encodeURIComponent(`Hola, estoy en la puerta de ${direccion}, timbre ${pisoSel}${dptoSel}.`);
    const numeroWhatsApp = '+5491122334455'; // Número de ejemplo
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, '_blank');
  };

  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", background: "#f4f6fa", paddingTop: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 420, width: '100%', margin: '0 auto', marginTop: 4 }}>
          <CardContainer>
            <div style={{ fontWeight: 800, fontSize: 22, color: azul, marginBottom: 4, textAlign: 'center', lineHeight: 1.1 }}>{direccion}</div>
            {/* QR con recuadro, sin texto ni campanitas */}
            <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 8px #0001', padding: 8, margin: '4px 0 0 0', display: 'flex', justifyContent: 'center' }}>
              <div style={{
                background: 'linear-gradient(#e3e6ec 0 0) padding-box, linear-gradient(135deg, #bfc5d2 60%, #fff 100%) border-box',
                border: '8px double #bfc5d2',
                borderRadius: 18,
                padding: 12,
                margin: '0 auto',
                boxShadow: '0 2px 8px #bfc5d288',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <QRCodeDisplay value={`https://qring.app/acceso/${idUnico}`} />
              </div>
            </div>
            {/* Marco del control Piso/Dpto envuelve las tabs y la grilla */}
            <div style={{
              width: controlWidth,
              background: '#f8faff',
              border: `1px solid ${azul}`,
              borderRadius: `${controlRadius}px`,
              boxShadow: '0 2px 12px #0001',
              padding: '0 0 0 0',
              margin: '0 auto 10px auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minHeight: 220,
              justifyContent: 'space-between',
            }}>
              {/* Tabs dentro del marco, sin espacio superior */}
              <div style={{ display: 'flex', gap: 0, justifyContent: 'center', margin: 0, width: '100%' }}>
                {['Piso', 'Dpto'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => setTab(opt as 'Piso' | 'Dpto')}
                    style={{
                      flex: 1,
                      border: 'none',
                      borderRadius: opt === 'Piso' ? `${controlRadius}px 0 0 0` : `0 ${controlRadius}px 0 0`,
                      padding: '10px 0',
                      fontSize: 18,
                      fontWeight: tab === opt ? 700 : 400,
                      background: tab === opt ? azul : '#eaf4ff',
                      color: tab === opt ? '#fff' : azul,
                      boxShadow: tab === opt ? '0 2px 8px #0002' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      outline: tab === opt ? `2px solid ${azul}` : 'none',
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {/* Grilla de selección */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, margin: '10px auto 0 auto', width: '90%' }}>
                {tab === 'Piso' && pisos.map((p) => {
                  const isConfigurado = estructura.some(piso => 
                    piso.nombre === p && piso.dptos.some(dpto => 
                      isTimbreConfigurado(piso.nombre, dpto)
                    )
                  ) || false;
                  return (
                    <button 
                      key={p} 
                      onClick={() => handlePisoSelect(p)} 
                      style={getButtonStyle(pisoSel === p, isConfigurado, p)}
                    >
                      {p}
                    </button>
                  );
                })}
                {tab === 'Dpto' && dptosDelPisoSel.map((d) => {
                  const isConfigurado = pisoSel ? isTimbreConfigurado(pisoSel, d) : false;
                  const isSelected = dptoSel !== null && dptoSel === d;
                  return (
                    <button 
                      key={d} 
                      onClick={() => handleDptoSelect(d)} 
                      style={getButtonStyle(isSelected, isConfigurado, d)}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
              {/* Botón Tocar Timbre pegado al borde inferior */}
              <button
                onClick={handleTocarTimbre}
                style={{
                  marginTop: 12,
                  width: '100%',
                  background: pisoSel && dptoSel ? azul : '#e0e0e0',
                  color: pisoSel && dptoSel ? '#fff' : '#888',
                  border: 'none',
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  borderBottomLeftRadius: controlRadius,
                  borderBottomRightRadius: controlRadius,
                  padding: '14px 0',
                  fontSize: 24,
                  fontWeight: 700,
                  boxShadow: '0 2px 8px #0002',
                  transition: 'all 0.2s',
                  minHeight: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  cursor: pisoSel && dptoSel ? 'pointer' : 'not-allowed',
                  opacity: pisoSel && dptoSel ? 1 : 0.7,
                  marginBottom: 0,
                }}
                disabled={!(pisoSel && dptoSel)}
              >
                Tocar Timbre
                {(pisoSel || dptoSel) && (
                  <span style={{ fontSize: 26, fontWeight: 900, marginLeft: 14, letterSpacing: 2 }}>{pisoSel} <span style={{fontWeight:900}}>{dptoSel}</span></span>
                )}
              </button>
            </div>
          </CardContainer>
          {/* Botones grandes debajo del CardContainer */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 24 }}>
            <button
              style={{
                background: azul,
                color: '#fff',
                border: 'none',
                borderRadius: 18,
                padding: '16px 32px',
                fontSize: 20,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px #0002',
                transition: 'background 0.2s',
              }}
              onClick={() => window.location.href = '/tienda'}
            >
              Visita la Tienda
            </button>
            <button
              style={{
                background: '#eee',
                color: azul,
                border: 'none',
                borderRadius: 18,
                padding: '16px 32px',
                fontSize: 20,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px #0001',
                transition: 'background 0.2s',
              }}
              onClick={() => window.location.href = '/login'}
            >
              Solo Registrados
            </button>
          </div>
        </div>
      </main>
    </>
  );
} 
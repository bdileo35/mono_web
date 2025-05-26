"use client"
import { useEffect, useState } from 'react';

// Ruta de la imagen de los 3 pasos (ajustar si la pones en public)
const pasosImg = "/3steps_qring.png"; // Cambia el nombre si usas otro
const logoImg = "/logo_qring.png"; // Cambia el nombre si usas otro

export default function AccesoPage({ params }: { params: { idUnico: string } }) {
  const [data, setData] = useState<any>(null);
  const [timbreSel, setTimbreSel] = useState<any>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [tab, setTab] = useState<'Piso' | 'Dpto'>('Piso');
  const [pisoSel, setPisoSel] = useState<string | number | null>(null);
  const [dptoSel, setDptoSel] = useState<string | null>(null);
  const pisos = ["PB", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const dptos = ["A", "B", "C", "D", "E", "F", "G", "H"];
  // Simulación: pisos 1, 2, 4 y dpto A, B, D están configurados
  const pisosConfig = ["PB", 1, 2, 4];
  const dptosConfig = ["A", "B", "D"];

  useEffect(() => {
    if (!params?.idUnico) return;
    fetch(`/api/publico/${params.idUnico}`)
      .then(res => res.json())
      .then(setData);
  }, [params?.idUnico]);

  // Estilos QRing
  const azul = "#1a4fa3";
  const blanco = "#fff";
  const gris = "#f4f6fa";
  const borderRadius = 18;
  const btnStyle = {
    background: azul,
    color: blanco,
    border: "none",
    borderRadius,
    padding: "16px 32px",
    fontSize: 20,
    margin: "12px 0",
    cursor: "pointer",
    fontWeight: 600,
    boxShadow: "0 2px 8px #0001",
    transition: "background 0.2s",
  };

  if (!data)
    return (
      <div style={{ minHeight: "100vh", background: gris, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <img src={logoImg} alt="QRing logo" style={{ width: 120, marginBottom: 24 }} />
        <div style={{ fontSize: 22, color: azul, fontWeight: 600 }}>Cargando...</div>
      </div>
    );

  // Wizard: Selección de timbre
  if (!timbreSel) {
    return (
      <div style={{ minHeight: "100vh", background: gris, padding: 0, fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 420, width: '100%', margin: "0 auto", background: blanco, borderRadius, boxShadow: "0 2px 16px #0002", padding: 32, marginTop: 32, position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{ color: azul, fontWeight: 800, fontSize: 28, marginBottom: 8 }}>Comunidad QRing</h1>
          <div style={{ color: '#1a4fa3', fontWeight: 600, fontSize: 18, marginBottom: 18, background: '#eaf1fb', borderRadius: 12, padding: 12, textAlign: 'center' }}>
            Aquí podés comunicarte con cualquier usuario/timbre de esta dirección.<br />
            <span style={{ fontSize: 15, color: '#444', fontWeight: 400 }}>
              (Visitantes y residentes pueden usar este canal para contactarse)
            </span>
          </div>
          {/* Tabs Piso/Dpto */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 18 }}>
            <button onClick={() => setTab('Piso')} style={{ fontWeight: tab === 'Piso' ? 700 : 400, fontSize: 18, border: 'none', background: tab === 'Piso' ? '#1a4fa3' : '#eee', color: tab === 'Piso' ? '#fff' : '#1a4fa3', borderRadius: 8, padding: '8px 24px', boxShadow: tab === 'Piso' ? '0 2px 8px #0002' : 'none', transition: 'all 0.2s' }}>Piso {pisoSel !== null && <span style={{ fontSize: 28, fontWeight: 800, marginLeft: 8 }}>{pisoSel}</span>}</button>
            <button onClick={() => setTab('Dpto')} style={{ fontWeight: tab === 'Dpto' ? 700 : 400, fontSize: 18, border: 'none', background: tab === 'Dpto' ? '#1a4fa3' : '#eee', color: tab === 'Dpto' ? '#fff' : '#1a4fa3', borderRadius: 8, padding: '8px 24px', boxShadow: tab === 'Dpto' ? '0 2px 8px #0002' : 'none', transition: 'all 0.2s' }}>Dpto {dptoSel && <span style={{ fontSize: 28, fontWeight: 800, marginLeft: 8 }}>{dptoSel}</span>}</button>
          </div>
          {/* Grilla de selección */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
            {tab === 'Piso' && pisos.map((p, i) => (
              <button key={i} onClick={() => setPisoSel(p)} disabled={!pisosConfig.includes(p)} style={{
                fontSize: 20,
                fontWeight: 700,
                border: 'none',
                borderRadius: 12,
                padding: '18px 0',
                background: pisosConfig.includes(p) ? '#fff' : '#f4f6fa',
                color: pisosConfig.includes(p) ? '#1a4fa3' : '#bbb',
                boxShadow: pisosConfig.includes(p) ? '0 2px 8px #0002' : 'none',
                opacity: pisosConfig.includes(p) ? 1 : 0.5,
                cursor: pisosConfig.includes(p) ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
              }}>{p}</button>
            ))}
            {tab === 'Dpto' && dptos.map((d, i) => (
              <button key={i} onClick={() => setDptoSel(d)} disabled={!dptosConfig.includes(d)} style={{
                fontSize: 20,
                fontWeight: 700,
                border: 'none',
                borderRadius: 12,
                padding: '18px 0',
                background: dptosConfig.includes(d) ? '#fff' : '#f4f6fa',
                color: dptosConfig.includes(d) ? '#1a4fa3' : '#bbb',
                boxShadow: dptosConfig.includes(d) ? '0 2px 8px #0002' : 'none',
                opacity: dptosConfig.includes(d) ? 1 : 0.5,
                cursor: dptosConfig.includes(d) ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
              }}>{d}</button>
            ))}
          </div>
          {/* Botón Tocar Timbre */}
          <button style={{ background: '#1a4fa3', color: '#fff', border: 'none', borderRadius: 12, padding: '18px 0', fontSize: 22, fontWeight: 700, width: '100%', boxShadow: '0 2px 8px #0002', marginTop: 8, opacity: pisoSel && dptoSel ? 1 : 0.5, cursor: pisoSel && dptoSel ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }} disabled={!(pisoSel && dptoSel)}>
            Tocar Timbre
          </button>
        </div>
        <button style={{ ...btnStyle, background: "#eee", color: azul, marginTop: 24 }} onClick={() => setShowHelp(true)}>
          ¿Cómo funciona?
        </button>
        {/* Modal de ayuda */}
        {showHelp && (
          <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "#0008", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowHelp(false)}>
            <div style={{ background: blanco, borderRadius, padding: 24, maxWidth: 380, boxShadow: "0 2px 16px #0003" }} onClick={e => e.stopPropagation()}>
              <img src={pasosImg} alt="Pasos QRing" style={{ width: "100%", borderRadius: 12, marginBottom: 8 }} />
              <div style={{ color: azul, fontWeight: 600, fontSize: 16 }}>¿Cómo funciona?</div>
              <div style={{ color: "#444", fontSize: 15, marginTop: 4 }}>1. Escaneá el QR<br />2. Elegí el timbre<br />3. Contactá al residente</div>
              <button style={{ ...btnStyle, background: azul, color: blanco, marginTop: 18 }} onClick={() => setShowHelp(false)}>Cerrar</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Teléfono activo
  const tel = timbreSel.usuario?.telefonos.find((t: any) => t.activo);

  return (
    <div style={{ minHeight: "100vh", background: gris, padding: 0, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 420, margin: "0 auto", background: blanco, borderRadius, boxShadow: "0 2px 16px #0002", padding: 32, marginTop: 32 }}>
        <h2 style={{ color: azul, fontWeight: 800, fontSize: 24, marginBottom: 8 }}>
          Timbre: Piso {timbreSel.piso} &bull; Dpto {timbreSel.dpto}
        </h2>
        <p style={{ color: "#333", fontSize: 17, marginBottom: 18 }}>Usted tiene la posibilidad de:</p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {tel?.whatsapp && (
            <li style={{ marginBottom: 10 }}>
              <a href={`https://wa.me/${tel.numero.replace("+", "")}`} target="_blank" rel="noopener noreferrer" style={{ ...btnStyle, display: "block", background: "#25d366", color: "#fff" }}>
                📱 Enviar mensaje por WhatsApp
              </a>
            </li>
          )}
          {tel?.voz && (
            <li style={{ marginBottom: 10 }}>
              <a href={`tel:${tel.numero}`} style={{ ...btnStyle, display: "block", background: azul, color: blanco }}>
                📞 Hacer llamada de voz
              </a>
            </li>
          )}
          {tel?.video && (
            <li style={{ marginBottom: 10 }}>
              <a href={`https://wa.me/${tel.numero.replace("+", "")}?text=Videollamada`} target="_blank" rel="noopener noreferrer" style={{ ...btnStyle, display: "block", background: "#1a4fa3", color: "#fff" }}>
                🎥 Hacer videollamada (WhatsApp)
              </a>
            </li>
          )}
        </ul>
        {!tel && <div style={{ color: "#c00", fontWeight: 600, marginBottom: 12 }}>No hay teléfono activo configurado para este timbre.</div>}
        <button style={{ ...btnStyle, background: "#eee", color: azul, marginTop: 18 }} onClick={() => setTimbreSel(null)}>
          Volver
        </button>
        <button style={{ ...btnStyle, background: "#eee", color: azul, marginTop: 8 }} onClick={() => setShowHelp(true)}>
          ¿Cómo funciona?
        </button>
      </div>
      {/* Ayuda siempre visible eliminada */}
      {/* Modal de ayuda */}
      {showHelp && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "#0008", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowHelp(false)}>
          <div style={{ background: blanco, borderRadius, padding: 24, maxWidth: 380, boxShadow: "0 2px 16px #0003" }} onClick={e => e.stopPropagation()}>
            <img src={pasosImg} alt="Pasos QRing" style={{ width: "100%", borderRadius: 12, marginBottom: 8 }} />
            <div style={{ color: azul, fontWeight: 600, fontSize: 16 }}>¿Cómo funciona?</div>
            <div style={{ color: "#444", fontSize: 15, marginTop: 4 }}>1. Escaneá el QR<br />2. Elegí el timbre<br />3. Contactá al residente</div>
            <button style={{ ...btnStyle, background: azul, color: blanco, marginTop: 18 }} onClick={() => setShowHelp(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
} 
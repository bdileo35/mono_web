import React, { useState } from 'react';
import Header from '@/app/components/Header';

const pisos = ['PB', '1', '2', '3', '4', '5'];
const dptosPorPiso: Record<string, string[]> = {
  'PB': ['A'],
  '1': ['A','B','C','D','E','F','G','H'],
  '2': ['A','B','C','D','E','F','G','H'],
  '3': ['A','B','C','D','E','F','G','H'],
  '4': ['A','B','C','D','E','F','G','H'],
  '5': ['A','B','C','D','E'],
};

// Estado inicial: todos los dptos no configurados
const initialConfig: Record<string, any> = {};
for (const piso of pisos) {
  for (const dpto of dptosPorPiso[piso]) {
    initialConfig[`${piso}-${dpto}`] = {
      configurado: false,
      numero: '',
      metodo: 'mensaje',
      dnd: false,
    };
  }
}

export default function ConfigTimbresMockup() {
  const [config, setConfig] = useState(initialConfig);
  const [pisoSel, setPisoSel] = useState('PB');
  const [dptoSel, setDptoSel] = useState<string|null>(null);
  const [showConfig, setShowConfig] = useState(false);
  const azul = '#1a4fa3';
  const gris = '#e0e0e0';
  const grisSuave = '#f4f6fa';

  const handleOpenConfig = (dpto: string) => {
    setDptoSel(dpto);
    setShowConfig(true);
  };

  const handleSave = () => {
    if (!dptoSel) return;
    setConfig({
      ...config,
      [`${pisoSel}-${dptoSel}`]: {
        ...config[`${pisoSel}-${dptoSel}`],
        configurado: true,
        numero: config[`${pisoSel}-${dptoSel}`].numero,
        metodo: 'mensaje',
        dnd: config[`${pisoSel}-${dptoSel}`].dnd,
      },
    });
    setShowConfig(false);
    setDptoSel(null);
  };

  return (
    <>
      <Header />
      <div style={{ maxWidth: 520, margin: '40px auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px #0002', padding: 32 }}>
        <h2 style={{ color: azul, fontWeight: 800, fontSize: 26, marginBottom: 18, textAlign: 'center' }}>Configuración de Timbres (Mockup)</h2>
        {/* Selector de piso */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24, justifyContent: 'center' }}>
          {pisos.map(p => (
            <button
              key={p}
              onClick={() => setPisoSel(p)}
              style={{
                background: pisoSel === p ? azul : grisSuave,
                color: pisoSel === p ? '#fff' : azul,
                fontWeight: 700,
                fontSize: 18,
                border: 'none',
                borderRadius: 12,
                padding: '10px 22px',
                boxShadow: pisoSel === p ? '0 2px 8px #1a4fa355' : 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >{p}</button>
          ))}
        </div>
        {/* Grilla de dptos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 14, marginBottom: 18 }}>
          {dptosPorPiso[pisoSel].map(d => {
            const key = `${pisoSel}-${d}`;
            const conf = config[key];
            return (
              <button
                key={d}
                onClick={() => handleOpenConfig(d)}
                disabled={conf.configurado === false ? false : false}
                style={{
                  background: conf.configurado ? azul : gris,
                  color: conf.configurado ? '#fff' : '#888',
                  fontWeight: 800,
                  fontSize: 22,
                  border: 'none',
                  borderRadius: 14,
                  boxShadow: conf.configurado ? '0 4px 16px #1a4fa355' : '0 2px 8px #bbb2',
                  padding: '24px 0',
                  cursor: 'pointer',
                  opacity: conf.configurado ? 1 : 0.7,
                  transition: 'all 0.2s',
                  position: 'relative',
                }}
              >
                {d}
                {conf.configurado && (
                  <span style={{ position: 'absolute', top: 8, right: 10, fontSize: 16, color: '#fff', background: '#4CAF50', borderRadius: 8, padding: '2px 8px', fontWeight: 600 }}>✔</span>
                )}
              </button>
            );
          })}
        </div>
        {/* Modal de configuración */}
        {showConfig && dptoSel && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(30,40,60,0.18)', zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 8px 32px #0003', padding: 36, minWidth: 320, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h3 style={{ color: azul, fontWeight: 800, fontSize: 22, marginBottom: 18 }}>Configurar {pisoSel}-{dptoSel}</h3>
              <label style={{ fontWeight: 600, color: '#222', marginBottom: 8 }}>Número de teléfono</label>
              <input
                type="text"
                value={config[`${pisoSel}-${dptoSel}`].numero}
                onChange={e => setConfig({ ...config, [`${pisoSel}-${dptoSel}`]: { ...config[`${pisoSel}-${dptoSel}`], numero: e.target.value } })}
                placeholder="Ej: 1122334455"
                style={{ padding: 10, borderRadius: 8, border: '1.5px solid #bbb', fontSize: 18, marginBottom: 18, width: '100%' }}
              />
              <label style={{ fontWeight: 600, color: '#222', marginBottom: 8 }}>Método de contacto</label>
              <select
                value={config[`${pisoSel}-${dptoSel}`].metodo}
                onChange={e => setConfig({ ...config, [`${pisoSel}-${dptoSel}`]: { ...config[`${pisoSel}-${dptoSel}`], metodo: e.target.value } })}
                style={{ padding: 10, borderRadius: 8, border: '1.5px solid #bbb', fontSize: 18, marginBottom: 18, width: '100%' }}
              >
                <option value="mensaje">Mensaje (WhatsApp)</option>
                <option value="llamada" disabled>Llamada (Próximamente)</option>
                <option value="video" disabled>Videollamada (Próximamente)</option>
              </select>
              <label style={{ fontWeight: 600, color: '#222', marginBottom: 8 }}>No molestar (DND)</label>
              <input
                type="checkbox"
                checked={config[`${pisoSel}-${dptoSel}`].dnd}
                onChange={e => setConfig({ ...config, [`${pisoSel}-${dptoSel}`]: { ...config[`${pisoSel}-${dptoSel}`], dnd: e.target.checked } })}
                style={{ marginBottom: 18, width: 22, height: 22 }}
              />
              <button
                onClick={handleSave}
                style={{ background: azul, color: '#fff', fontWeight: 700, fontSize: 18, borderRadius: 10, padding: '12px 32px', border: 'none', boxShadow: '0 2px 8px #1a4fa355', marginTop: 12, cursor: 'pointer' }}
              >
                Guardar
              </button>
              <button
                onClick={() => setShowConfig(false)}
                style={{ background: gris, color: azul, fontWeight: 700, fontSize: 16, borderRadius: 10, padding: '8px 24px', border: 'none', marginTop: 10, cursor: 'pointer' }}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
} 
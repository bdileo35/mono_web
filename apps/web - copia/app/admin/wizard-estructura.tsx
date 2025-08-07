import React, { useState } from 'react';
import Header from '@/app/components/Header';

const letras = ['A','B','C','D','E','F','G','H'];

export default function WizardEstructura() {
  const [step, setStep] = useState(1);
  const [pb, setPb] = useState(false);
  const [pbDptos, setPbDptos] = useState(1);
  const [pisos, setPisos] = useState(5);
  const [dptosPorPiso, setDptosPorPiso] = useState(8);
  const [custom, setCustom] = useState<{[piso:number]:number}>({});

  // Generar estructura
  const estructura: {[piso:string]:string[]} = {};
  if(pb) estructura['PB'] = letras.slice(0, pbDptos);
  for(let i=1; i<=pisos; i++) {
    const cant = custom[i] || dptosPorPiso;
    estructura[i] = letras.slice(0, cant);
  }

  const azul = '#1a4fa3';
  const gris = '#e0e0e0';
  const grisSuave = '#f4f6fa';

  return (
    <>
      <Header />
      <div style={{ maxWidth: 520, margin: '40px auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px #0002', padding: 32 }}>
        <h2 style={{ color: azul, fontWeight: 800, fontSize: 26, marginBottom: 18, textAlign: 'center' }}>Wizard: Estructura del Edificio</h2>
        {/* Paso 1: PB */}
        {step === 1 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 18 }}>¿Hay departamentos en PB?</div>
            <button onClick={() => {setPb(true); setStep(2);}} style={{ background: azul, color: '#fff', fontWeight: 700, fontSize: 18, borderRadius: 10, padding: '12px 32px', border: 'none', margin: 8, cursor: 'pointer' }}>Sí</button>
            <button onClick={() => {setPb(false); setStep(2);}} style={{ background: gris, color: azul, fontWeight: 700, fontSize: 18, borderRadius: 10, padding: '12px 32px', border: 'none', margin: 8, cursor: 'pointer' }}>No</button>
            {pb && (
              <div style={{ marginTop: 18 }}>
                <label style={{ fontWeight: 600, color: '#222', marginRight: 8 }}>¿Cuántos dptos en PB?</label>
                <select value={pbDptos} onChange={e => setPbDptos(Number(e.target.value))} style={{ padding: 8, borderRadius: 8, border: '1.5px solid #bbb', fontSize: 18 }}>
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{letras.slice(0,n).join(', ')}</option>)}
                </select>
              </div>
            )}
          </div>
        )}
        {/* Paso 2: Pisos */}
        {step === 2 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 18 }}>¿Cuántos pisos tiene el edificio?</div>
            <input type="number" min={1} max={20} value={pisos} onChange={e => setPisos(Number(e.target.value))} style={{ padding: 10, borderRadius: 8, border: '1.5px solid #bbb', fontSize: 18, width: 80, marginBottom: 18 }} />
            <div>
              <button onClick={() => setStep(1)} style={{ background: gris, color: azul, fontWeight: 700, fontSize: 16, borderRadius: 10, padding: '8px 24px', border: 'none', margin: 8, cursor: 'pointer' }}>Atrás</button>
              <button onClick={() => setStep(3)} style={{ background: azul, color: '#fff', fontWeight: 700, fontSize: 16, borderRadius: 10, padding: '8px 24px', border: 'none', margin: 8, cursor: 'pointer' }}>Siguiente</button>
            </div>
          </div>
        )}
        {/* Paso 3: Dptos por piso y personalización */}
        {step === 3 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 18 }}>¿Cuántos dptos por piso?</div>
            <select value={dptosPorPiso} onChange={e => setDptosPorPiso(Number(e.target.value))} style={{ padding: 8, borderRadius: 8, border: '1.5px solid #bbb', fontSize: 18, marginBottom: 18 }}>
              {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{letras.slice(0,n).join(', ')}</option>)}
            </select>
            <div style={{ margin: '18px 0 8px 0', fontWeight: 600 }}>¿Querés personalizar algún piso?</div>
            {[...Array(pisos)].map((_,i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                Piso {i+1}: 
                <select value={custom[i+1] || dptosPorPiso} onChange={e => setCustom({...custom, [i+1]: Number(e.target.value)})} style={{ padding: 6, borderRadius: 6, border: '1.5px solid #bbb', fontSize: 16, marginLeft: 8 }}>
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{letras.slice(0,n).join(', ')}</option>)}
                </select>
              </div>
            ))}
            <div>
              <button onClick={() => setStep(2)} style={{ background: gris, color: azul, fontWeight: 700, fontSize: 16, borderRadius: 10, padding: '8px 24px', border: 'none', margin: 8, cursor: 'pointer' }}>Atrás</button>
              <button onClick={() => setStep(4)} style={{ background: azul, color: '#fff', fontWeight: 700, fontSize: 16, borderRadius: 10, padding: '8px 24px', border: 'none', margin: 8, cursor: 'pointer' }}>Siguiente</button>
            </div>
          </div>
        )}
        {/* Paso 4: Resumen visual */}
        {step === 4 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 18 }}>Resumen de la estructura</div>
            <div style={{ marginBottom: 24 }}>
              {Object.entries(estructura).map(([piso, dptos]) => (
                <div key={piso} style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontWeight: 700, color: azul, minWidth: 38 }}>{piso}</span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {dptos.map(d => (
                      <span key={d} style={{ background: grisSuave, color: azul, fontWeight: 700, fontSize: 18, borderRadius: 8, padding: '8px 16px', boxShadow: '0 1px 4px #0001' }}>{d}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setStep(3)} style={{ background: gris, color: azul, fontWeight: 700, fontSize: 16, borderRadius: 10, padding: '8px 24px', border: 'none', margin: 8, cursor: 'pointer' }}>Atrás</button>
            <button onClick={() => alert('¡Estructura confirmada! (aquí se guardaría en la base de datos)')} style={{ background: azul, color: '#fff', fontWeight: 700, fontSize: 16, borderRadius: 10, padding: '8px 24px', border: 'none', margin: 8, cursor: 'pointer' }}>Confirmar</button>
          </div>
        )}
      </div>
    </>
  );
} 
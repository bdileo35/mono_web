"use client";

import { useState, useEffect, useRef } from "react";
import CInfo from "../components/CInfo";
import CardContainer from '../components/CardContainer';
import { MdLocationCity } from "react-icons/md";
import ConfigTimbres, { TimbreConfig } from "../components/ConfigTimbres";
import QRCodeDisplay from '../components/QRCodeDisplay';
import TimbreHeader from '../components/TimbreHeader';

const PRECIO_POR_TIMBRE = 5900;

interface PisoConfig {
  nombre: string;
  dptos: string[];
}

interface CompraData {
  idUnico: string;
  email: string;
  nombre: string;
  password: string;
}

// Componente de navegación reutilizado
const NavegacionWizard = ({ paso, totalPasos, onAnterior, onSiguiente, puedeAvanzar = true, esPasoFinal = false }: { 
  paso: number, 
  totalPasos: number, 
  onAnterior: () => void, 
  onSiguiente: () => void, 
  puedeAvanzar?: boolean, 
  esPasoFinal?: boolean 
}) => {
  return (
    <div style={{ display: 'flex', gap: 12, width: '100%', justifyContent: 'center', marginTop: 16 }}>
      {paso > 1 && (
        <button onClick={onAnterior} style={{ 
          background: '#bbb', 
          color: '#fff', 
          border: 'none', 
          borderRadius: 10, 
          padding: '12px 24px', 
          fontWeight: 700, 
          fontSize: 16, 
          cursor: 'pointer',
          width: 120
        }}>
          ← Anterior
        </button>
      )}
      <button 
        onClick={onSiguiente} 
        style={{ 
          background: '#1a4fa3', 
          color: '#fff', 
          border: 'none', 
          borderRadius: 10, 
          padding: '12px 24px', 
          fontWeight: 700, 
          fontSize: 16, 
          cursor: 'pointer',
          width: 120
        }}
      >
        {esPasoFinal ? 'Finalizar' : 'Next →'}
      </button>
    </div>
  );
};

// SVGs para QR difuminado y edificio
const QR_SVG = (
  <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.13 }}>
    <image href="/images/edificio2.png" width="140" height="140" />
  </svg>
);

export default function WizardCompra() {
  const [paso, setPaso] = useState(1);
  const totalPasos = 7;

  // ESTADO - Paso 1: Selección de Producto
  const [cantidadTimbres, setCantidadTimbres] = useState(5);

  // ESTADO - Paso 2: Datos de Contacto
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  // ESTADO - Paso 3: Pago
  const [procesando, setProcesando] = useState(false);

  // ESTADO - Paso 4: Éxito
  const [compraData, setCompraData] = useState<CompraData | null>(null);

  // ESTADO - Paso 5: Dirección y Estructura
  const [calle, setCalle] = useState("Av. Siempre Viva");
  const [numero, setNumero] = useState("742");
  const [tienePB, setTienePB] = useState(true);
  const [pbDptosCount, setPbDptosCount] = useState(1);
  const [cantPisos, setCantPisos] = useState(1);
  const [dptosPorPiso, setDptosPorPiso] = useState(1);
  const [estructura, setEstructura] = useState<PisoConfig[]>([]);

  // ESTADO - Paso 6: Timbres
  const [timbres, setTimbres] = useState<TimbreConfig[]>([]);

  // ESTADO - Paso 7: Finalizar
  const [idUnico, setIdUnico] = useState<string | null>(null);

  const isInitialMount = useRef(true);

  // --- EFECTOS DE CARGA Y SINCRONIZACIÓN ---

  // 1. Cargar desde LocalStorage
  useEffect(() => {
    const datosGuardados = localStorage.getItem('wizardCompraData');
    console.log('Datos guardados encontrados:', datosGuardados);
    
    if (datosGuardados) {
      const data = JSON.parse(datosGuardados);
      console.log('Cargando datos:', data);
      setPaso(data.paso || 1);
      setCantidadTimbres(data.cantidadTimbres || 5);
      setNombre(data.nombre || "");
      setEmail(data.email || "");
      setCompraData(data.compraData || null);
      setCalle(data.calle || "Av. Siempre Viva");
      setNumero(data.numero || "742");
      setTienePB(data.tienePB === undefined ? true : data.tienePB);
      setPbDptosCount(data.pbDptosCount || 1);
      setCantPisos(data.cantPisos || 1);
      setDptosPorPiso(data.dptosPorPiso || 1);
      setEstructura(data.estructura || []);
      setTimbres(data.timbres || []);
      setIdUnico(data.idUnico || null);
    } else {
      console.log('No hay datos guardados, usando valores por defecto');
    }
    isInitialMount.current = false;
  }, []);

  // 2. Sincronizar 'timbres' con 'estructura'
  useEffect(() => {
    if (isInitialMount.current && timbres.length > 0) {
      return;
    }

    const timbresDesdeEstructura: TimbreConfig[] = estructura.flatMap(piso =>
      piso.dptos.map(dpto => {
        const id = `${piso.nombre}-${dpto}`;
        const existente = timbres.find(t => t.id === id);
        return {
          id: id,
          piso: piso.nombre,
          dpto: dpto,
          numero: existente?.numero || '',
          metodo: existente?.metodo || 'mensaje',
          estado: existente?.estado || 'activo',
          esPropio: existente?.esPropio || false,
          estadoAsignacion: existente?.estadoAsignacion || 'libre',
        };
      })
    );

    setTimbres(timbresDesdeEstructura);
  }, [estructura]);

  // 3. Guardar en LocalStorage
  useEffect(() => {
    if (isInitialMount.current) return;

    const dataToSave = {
      paso,
      cantidadTimbres,
      nombre,
      email,
      compraData,
      calle,
      numero,
      tienePB,
      pbDptosCount,
      cantPisos,
      dptosPorPiso,
      estructura,
      timbres,
      idUnico,
      timestamp: Date.now()
    };

    localStorage.setItem('wizardCompraData', JSON.stringify(dataToSave));
    console.log('Datos guardados:', dataToSave);
  }, [paso, cantidadTimbres, nombre, email, compraData, calle, numero, tienePB, pbDptosCount, cantPisos, dptosPorPiso, estructura, timbres, idUnico]);

  // --- FUNCIONES DE NAVEGACIÓN ---

  const siguiente = () => setPaso(p => Math.min(p + 1, totalPasos));
  const anterior = () => setPaso(p => Math.max(p - 1, 1));

  // --- FUNCIONES ESPECÍFICAS POR PASO ---

  // Paso 1: Stepper inteligente
  const handleStepper = (dir: 1 | -1) => {
    let step = cantidadTimbres < 50 ? 5 : 10;
    let next = cantidadTimbres + dir * step;
    if (next < 5) next = 5;
    if (next > 100) next = 100;
    setCantidadTimbres(next);
  };

  // Paso 3: Procesar pago
  const procesarPago = async () => {
    if (!nombre || !email) {
      alert('Por favor completa todos los campos');
      return;
    }
    setProcesando(true);
    try {
      // Simulación de pago exitoso
      const fakeId = 'qr_' + Math.random().toString(36).substring(2, 10);
      const compra: CompraData = {
        idUnico: fakeId,
        email,
        nombre,
        password: '1234'
      };
      setCompraData(compra);
      setIdUnico(fakeId);
      siguiente();
    } finally {
      setProcesando(false);
    }
  };

  // Paso 5: Generar estructura
  const generarEstructura = () => {
    const nuevaEstructura: PisoConfig[] = [];
    
    // Agregar PB si tiene
    if (tienePB) {
      nuevaEstructura.push({
        nombre: 'PB',
        dptos: Array.from({ length: pbDptosCount }, (_, i) => String.fromCharCode(65 + i))
      });
    }
    
    // Agregar pisos
    for (let i = 1; i <= cantPisos; i++) {
      nuevaEstructura.push({
        nombre: i.toString(),
        dptos: Array.from({ length: dptosPorPiso }, (_, j) => String.fromCharCode(65 + j))
      });
    }
    
    setEstructura(nuevaEstructura);
  };

  // Paso 7: Descargar etiqueta
  const descargarEtiquetaQR = () => {
    const node = document.getElementById('etiqueta-qr-preview');
    if (!node) return;
    import('html-to-image').then(htmlToImage => {
      htmlToImage.toPng(node)
        .then(function (dataUrl) {
          const link = document.createElement('a');
          link.download = `Etiqueta-QRing-${calle}-${numero}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch(function (error) {
          alert('Error al generar la imagen: ' + error);
        });
    });
  };

  // --- RENDERIZADO DE PASOS ---

  const renderPaso1_Producto = () => (
    <>
      {/* Imagen edificio visible arriba del CardContainer */}
      <div style={{ width: 90, height: 90, margin: '8px auto 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src="/images/edificio2.png"
          alt="Edificio"
          style={{ width: 90, height: 90, objectFit: 'contain', display: 'block' }}
          onError={e => {
            const parent = (e.target as HTMLImageElement).parentElement;
            if (parent) {
              parent.innerHTML = `<svg width='90' height='90' viewBox='0 0 90 90' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='90' height='90' rx='18' fill='#e3eaf5'/><rect x='25' y='30' width='40' height='35' rx='6' fill='#1a4fa3'/><rect x='35' y='40' width='8' height='8' rx='2' fill='#fff'/><rect x='47' y='40' width='8' height='8' rx='2' fill='#fff'/><rect x='35' y='52' width='8' height='8' rx='2' fill='#fff'/><rect x='47' y='52' width='8' height='8' rx='2' fill='#fff'/></svg>`;
            }
          }}
        />
      </div>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        {/* Bloque de cantidad y total, botones, etc. (sin CInfo aquí) */}
        <div style={{
          width: '100%',
          maxWidth: 340,
          background: '#f9f9f9',
          borderRadius: 14,
          boxShadow: '0 1px 8px #0001',
          padding: '18px 18px 24px 18px', // padding superior achicado
          border: '1.5px solid #e3eaf5',
          marginTop: 8,
          marginBottom: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, justifyContent: 'center' }}>
            <span style={{ color: '#1a4fa3', fontWeight: 700, fontSize: 15, background: '#fff', borderRadius: 8, border: '1.5px solid #e3eaf5', padding: '2px 10px', boxShadow: '0 2px 8px #0001' }}>Timbres</span>
            <button onClick={() => handleStepper(-1)} style={{ fontSize: 18, fontWeight: 700, background: '#e3eaf5', border: 'none', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', color: '#1a4fa3', boxShadow: '0 1px 4px #0001' }}>-</button>
            <input
              type="number"
              min={5}
              max={100}
              value={cantidadTimbres}
              readOnly
              style={{
                width: 38,
                padding: 4,
                borderRadius: 8,
                border: '2px solid #1a4fa3',
                fontSize: 16,
                textAlign: 'center',
                fontWeight: 700,
                background: '#fff',
                color: '#1a4fa3',
                boxShadow: '0 1px 4px #0001'
              }}
            />
            <button onClick={() => handleStepper(1)} style={{ fontSize: 18, fontWeight: 700, background: '#e3eaf5', border: 'none', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', color: '#1a4fa3', boxShadow: '0 1px 4px #0001' }}>+</button>
          </div>
          <div style={{ color: '#1a4fa3', fontWeight: 700, fontSize: 16, marginBottom: 2, textAlign: 'center' }}>
            {cantidadTimbres} timbres × ${PRECIO_POR_TIMBRE.toLocaleString()}
          </div>
          <div style={{ color: '#1976d2', fontWeight: 800, fontSize: 24, marginBottom: 0, textAlign: 'center', letterSpacing: 1 }}>
            Total: ${ (cantidadTimbres * PRECIO_POR_TIMBRE).toLocaleString() }
          </div>
          {/* Botones en línea dentro del CC */}
          <div style={{ display: 'flex', gap: 8, width: '100%', marginTop: 16 }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#eee',
                color: '#333',
                border: '1.5px solid #bbb',
                borderRadius: 10,
                padding: '14px 0',
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer',
                width: '50%'
              }}
            >
              Salir
            </button>
            <button
              onClick={siguiente}
              style={{
                background: '#1a4fa3',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '14px 0',
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer',
                width: '50%'
              }}
            >
              Agregar a la tienda
            </button>
          </div>
        </div>
      </div>
    </>
  );

  const renderPaso2_Contacto = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 0 }}>
        <span style={{ fontSize: 78, color: '#1976d2', marginBottom: 18 }}>👤</span>
        <div style={{ fontWeight: 800, fontSize: 22, color: '#1976d2', textAlign: 'center', marginTop: 0, marginBottom: 12 }}>
          Datos de Contacto
        </div>
      </div>
      
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 340,
        background: '#f9f9f9',
        borderRadius: 18,
        boxShadow: '0 1px 8px #0001',
        padding: '24px 18px 18px 18px',
        border: '1.5px solid #e3eaf5'
      }}>
        <div style={{
          position: 'absolute',
          top: -18,
          left: 18,
          background: '#fff',
          padding: '0 12px',
          fontWeight: 700,
          fontSize: 15,
          color: '#1a4fa3',
          borderRadius: 8,
          border: '1.5px solid #e3eaf5',
          zIndex: 2
        }}>
          Información Personal
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            style={{
              padding: 12,
              borderRadius: 8,
              border: '1.5px solid #bfc5d2',
              fontSize: 16,
              background: '#fff',
              color: '#222',
              boxShadow: '0 1px 4px #0001',
              outline: 'none',
              width: '100%',
              transition: 'border 0.2s, box-shadow 0.2s',
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              padding: 12,
              borderRadius: 8,
              border: '1.5px solid #bfc5d2',
              fontSize: 16,
              background: '#fff',
              color: '#222',
              boxShadow: '0 1px 4px #0001',
              outline: 'none',
              width: '100%',
              transition: 'border 0.2s, box-shadow 0.2s',
            }}
          />
        </div>
      </div>
    </div>
  );

  const renderPaso3_Pago = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 0 }}>
        <span style={{ fontSize: 78, color: '#1976d2', marginBottom: 18 }}>💳</span>
        <div style={{ fontWeight: 800, fontSize: 22, color: '#1976d2', textAlign: 'center', marginTop: 0, marginBottom: 12 }}>
          Procesar Pago
        </div>
      </div>
      
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 340,
        background: '#f9f9f9',
        borderRadius: 18,
        boxShadow: '0 1px 8px #0001',
        padding: '24px 18px 18px 18px',
        border: '1.5px solid #e3eaf5'
      }}>
        <div style={{
          position: 'absolute',
          top: -18,
          left: 18,
          background: '#fff',
          padding: '0 12px',
          fontWeight: 700,
          fontSize: 15,
          color: '#1a4fa3',
          borderRadius: 8,
          border: '1.5px solid #e3eaf5',
          zIndex: 2
        }}>
          Resumen de Compra
        </div>
        
        <div style={{ color: '#1a4fa3', fontWeight: 700, fontSize: 18, marginBottom: 8, textAlign: 'center' }}>
          QRing - {cantidadTimbres} timbres
        </div>
        <div style={{ color: '#1976d2', fontWeight: 700, fontSize: 28, marginBottom: 16, textAlign: 'center' }}>
          Total: ${(cantidadTimbres * PRECIO_POR_TIMBRE).toLocaleString()}
        </div>
        
        <div style={{ fontSize: 14, color: '#666', marginBottom: 16, textAlign: 'center' }}>
          <strong>Nombre:</strong> {nombre}<br/>
          <strong>Email:</strong> {email}
        </div>
        
        <button
          onClick={procesarPago}
          disabled={procesando}
          style={{
            background: procesando ? '#ccc' : '#43a047',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            padding: '12px 24px',
            fontWeight: 700,
            fontSize: 16,
            cursor: procesando ? 'not-allowed' : 'pointer',
            opacity: procesando ? 0.7 : 1,
            width: '100%'
          }}
        >
          {procesando ? 'Procesando...' : 'Simular Pago'}
        </button>
      </div>
    </div>
  );

  const renderPaso4_Exito = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 0 }}>
        <span style={{ fontSize: 78, color: '#43a047', marginBottom: 18 }}>✅</span>
        <div style={{ fontWeight: 800, fontSize: 22, color: '#43a047', textAlign: 'center', marginTop: 0, marginBottom: 12 }}>
          ¡Compra Exitosa!
        </div>
      </div>
      
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 340,
        background: '#f9f9f9',
        borderRadius: 18,
        boxShadow: '0 1px 8px #0001',
        padding: '24px 18px 18px 18px',
        border: '1.5px solid #e3eaf5'
      }}>
        <div style={{
          position: 'absolute',
          top: -18,
          left: 18,
          background: '#fff',
          padding: '0 12px',
          fontWeight: 700,
          fontSize: 15,
          color: '#1a4fa3',
          borderRadius: 8,
          border: '1.5px solid #e3eaf5',
          zIndex: 2
        }}>
          Datos de Acceso
        </div>
        
        <div style={{ width: '100%', marginBottom: 16 }}>
          <CInfo texto="Guarda estos datos para ingresar al configurador o continúa para configurar tu edificio ahora." />
        </div>
        
        <div style={{ fontSize: 15, color: '#1976d2', marginBottom: 8 }}><b>ID Único:</b> {compraData?.idUnico}</div>
        <div style={{ fontSize: 15, color: '#1976d2', marginBottom: 8 }}><b>Email:</b> {compraData?.email}</div>
        <div style={{ fontSize: 15, color: '#1976d2', marginBottom: 16 }}><b>Password:</b> {compraData?.password}</div>
      </div>
    </div>
  );

  const renderPaso5_Estructura = () => {
    const renderDireccion = () => (
      <div style={{ position: 'relative', width: '100%', border: '1.5px solid #bbb', borderRadius: 12, padding: '24px 16px 16px', background: '#f8faff', marginBottom: 16 }}>
        <div style={{ position: 'absolute', top: '-12px', left: '12px', background: '#f8faff', padding: '0 8px', fontSize: '14px', color: '#1a4fa3', fontWeight: 600, zIndex: 1 }}>
          Dirección
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <input
            type="text"
            placeholder="Calle"
            value={calle}
            onChange={e => setCalle(e.target.value)}
            style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd', fontSize: 16 }}
          />
          <input
            type="text"
            placeholder="Número"
            value={numero}
            onChange={e => setNumero(e.target.value)}
            style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd', fontSize: 16 }}
          />
        </div>
      </div>
    );

    const renderEstructura = () => (
      <div style={{ position: 'relative', width: '100%', border: '1.5px solid #bbb', borderRadius: 12, padding: '24px 16px 16px', background: '#f8faff' }}>
        <div style={{ position: 'absolute', top: '-12px', left: '12px', background: '#f8faff', padding: '0 8px', fontSize: '14px', color: '#1a4fa3', fontWeight: 600, zIndex: 1 }}>
          Estructura
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <input type="checkbox" id="tienePB" checked={tienePB} onChange={e => setTienePB(e.target.checked)} style={{ width: 18, height: 18 }} />
            <label htmlFor="tienePB" style={{ fontWeight: 600, color: '#333' }}>Tiene Planta Baja</label>
          </div>
          
          {tienePB && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <label style={{ fontWeight: 600, color: '#333', minWidth: 80 }}>Dptos PB:</label>
              <input
                type="number"
                min={1}
                max={10}
                value={pbDptosCount}
                onChange={e => setPbDptosCount(Number(e.target.value))}
                style={{ width: 60, padding: 8, borderRadius: 6, border: '1px solid #ddd', textAlign: 'center' }}
              />
            </div>
          )}
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <label style={{ fontWeight: 600, color: '#333', minWidth: 80 }}>Pisos:</label>
            <input
              type="number"
              min={1}
              max={20}
              value={cantPisos}
              onChange={e => setCantPisos(Number(e.target.value))}
              style={{ width: 60, padding: 8, borderRadius: 6, border: '1px solid #ddd', textAlign: 'center' }}
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <label style={{ fontWeight: 600, color: '#333', minWidth: 80 }}>Dptos:</label>
            <input
              type="number"
              min={1}
              max={10}
              value={dptosPorPiso}
              onChange={e => setDptosPorPiso(Number(e.target.value))}
              style={{ width: 60, padding: 8, borderRadius: 6, border: '1px solid #ddd', textAlign: 'center' }}
            />
          </div>
          
          <button
            onClick={generarEstructura}
            style={{
              background: '#1a4fa3',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 20px',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              alignSelf: 'flex-start'
            }}
          >
            Generar Estructura
          </button>
        </div>
        
        {estructura.length > 0 && (
          <div style={{ marginTop: 16, padding: 12, background: '#fff', borderRadius: 8, border: '1px solid #ddd' }}>
            <div style={{ fontWeight: 700, color: '#1a4fa3', marginBottom: 8 }}>Vista Previa:</div>
            {estructura.map((piso, idx) => (
              <div key={idx} style={{ fontSize: 14, color: '#333', marginBottom: 4 }}>
                <strong>{piso.nombre}:</strong> {piso.dptos.join(', ')}
              </div>
            ))}
          </div>
        )}
      </div>
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
        {renderDireccion()}
        {renderEstructura()}
      </div>
    );
  };

  const renderPaso6_Timbres = () => {
    const totalTimbres = estructura.reduce((acc, piso) => acc + piso.dptos.length, 0);
    const timbresConfigurados = timbres.filter(t => t.estadoAsignacion === 'configurado').length;
    const timbresAsignados = timbres.filter(t => t.estadoAsignacion === 'asignado').length;
    const timbresSolicitados = timbres.filter(t => t.estadoAsignacion === 'solicitado').length;
    const timbresLibres = timbres.filter(t => t.estadoAsignacion === 'libre').length;
    const maxDptos = Math.max(0, ...estructura.map(p => p.dptos.length));

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
        {/* Dirección arriba */}
        <div style={{ position: 'relative', width: '100%', border: '1.5px solid #bbb', borderRadius: 12, padding: '24px 16px 16px', background: '#f8faff' }}>
          <div style={{ position: 'absolute', top: '-12px', left: '12px', background: '#f8faff', padding: '0 8px', fontSize: '14px', color: '#1a4fa3', fontWeight: 600, zIndex: 1 }}>
            Dirección
          </div>
          <div style={{ fontWeight: 700, fontSize: 18, color: '#333', textAlign: 'center' }}>
            {calle} {numero}
          </div>
        </div>
        
        {/* Grilla de timbres debajo */}
        <div style={{ position: 'relative', width: '100%', border: '1.5px solid #bbb', borderRadius: 12, padding: '24px 16px 16px', background: '#f8faff', minHeight: 450 }}>
          <div style={{ position: 'absolute', top: '-12px', left: '12px', background: '#f8faff', padding: '0 8px', fontSize: '14px', color: '#1a4fa3', fontWeight: 600, zIndex: 1 }}>
            Timbres
          </div>
          <div style={{ padding: 16, border: '1px solid #ddd', borderRadius: 12, background: '#fcfdff' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: `40px repeat(${maxDptos}, 1fr)`, 
              gap: '8px 4px', 
              justifyItems: 'center',
              alignItems: 'center'
            }}>
              {/* Cabecera de Letras */}
              <div />
              {Array.from({ length: maxDptos }, (_, i) => <div key={i} style={{ textAlign: 'center', fontWeight: 700, color: '#1a4fa3' }}>{String.fromCharCode(65 + i)}</div>)}
              {/* Filas de Timbres */}
              <ConfigTimbres 
                estructura={estructura}
                timbres={timbres}
                onChange={setTimbres}
                maxDptos={maxDptos}
              />
            </div>
          </div>
          {/* Header debajo de la grilla de timbres */}
          <div style={{ width: '100%', marginTop: 16 }}>
            <TimbreHeader 
              total={totalTimbres} 
              configurados={timbresConfigurados} 
              asignados={timbresAsignados} 
              solicitados={timbresSolicitados}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderPaso7_Finalizar = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      {/* Contenedor Central para Finalizar */}
      <div style={{ position: 'relative', width: '100%', border: '1.5px solid #bbb', borderRadius: 12, padding: '16px 16px 8px', background: '#f8faff', minHeight: 'auto' }}>
        <div style={{ position: 'absolute', top: '-12px', left: '12px', background: '#f8faff', padding: '0 8px', fontSize: '14px', color: '#1a4fa3', fontWeight: 600, zIndex: 1 }}>
          Finalizar e Imprimir
        </div>

        {/* Contenedor "Grande" para Vista Previa */}
        <div style={{ background: '#fff', borderRadius: 12, padding: '16px', border: '1.5px solid #e0e0e0', width: '100%', marginBottom: 8, textAlign: 'center' }}>
          {/* Marco Doble para la etiqueta */}
          <div id="etiqueta-qr-preview" style={{
              padding: '4px',
              border: '1px solid #e0e0e0',
              borderRadius: '16px',
              display: 'inline-block',
              background: '#e8e8e8',
              boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
          }}>
              <div style={{padding: '20px', border: '1px solid #fff', borderRadius: '12px', background: '#fff'}}>
                  <h3 style={{color: '#1a4fa3', fontWeight: 800, fontSize: 22, margin: '0 0 10px 0'}}>
                    🔔 TIMBRE 🔔
                  </h3>
                  <p style={{fontWeight: 700, fontSize: 22, margin: '0 0 12px 0', color: '#888'}}>{calle} {numero}</p>
                  <QRCodeDisplay value={`https://qring.app/acceso/${idUnico || 'test-id'}`} />
                  <p style={{fontSize: 14, color: '#333', margin: '6px auto 0 auto', width: '180px'}}>Escaneá para tocar timbre</p>
                  <p style={{fontWeight: 600, fontSize: 14, color: '#1a4fa3', margin: '12px 0 0 0'}}>QRing 2.0</p>
              </div>
          </div>
        </div>

        {/* Contenedor "Chico" para Opciones */}
        <div style={{ background: '#fff', borderRadius: 12, padding: '16px', border: '1px solid #e0e0e0', width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            onClick={() => descargarEtiquetaQR()}
            style={{width: '100%', background: '#2e7d32', color: '#fff', border: 'none', borderRadius: 8, padding: '12px', fontWeight: 700, fontSize: 16, cursor: 'pointer'}}>
            ⬇️ Descargar etiqueta digital
          </button>
          <a
            href="https://ciudaddellaser.com.ar/"
            target="_blank"
            rel="noopener noreferrer"
            style={{textDecoration: 'none', width: '100%'}}
          >
            <button style={{width: '100%', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 8, padding: '12px', fontWeight: 700, fontSize: 16, cursor: 'pointer'}}>
              ⚡ Cotizar grabado láser
            </button>
          </a>
        </div>
      </div>
    </div>
  );

  // --- RENDERIZADO PRINCIPAL ---

  const renderContenido = () => {
    switch (paso) {
      case 1:
        return renderPaso1_Producto();
      case 2:
        return renderPaso2_Contacto();
      case 3:
        return renderPaso3_Pago();
      case 4:
        return renderPaso4_Exito();
      case 5:
        return renderPaso5_Estructura();
      case 6:
        return renderPaso6_Timbres();
      case 7:
        return renderPaso7_Finalizar();
      default:
        return <div>Paso desconocido</div>;
    }
  };

  const infoTextos: {[key: number]: string} = {
    1: "Selecciona la cantidad de timbres que necesitas para tu edificio. El precio es por timbre individual.",
    2: "Completa tus datos de contacto para procesar la compra y recibir las credenciales de acceso.",
    3: "Revisa el resumen de tu compra y procede con el pago seguro a través de MercadoPago.",
    4: "¡Compra exitosa! Guarda estos datos para acceder al configurador de tu edificio.",
    5: "Define la dirección y la estructura de tu edificio. Puedes ajustar la grilla a la perfección.",
    6: "¡Es hora de dar vida a los timbres! Configura cada departamento con su número de WhatsApp.",
    7: "¡Todo listo! Aquí podrás generar e imprimir los códigos QR para las entradas de tu edificio."
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0}}>
      <CardContainer>
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0}}>
          {renderContenido()}
          {/* Navegación siempre visible */}
          <NavegacionWizard
            paso={paso}
            totalPasos={totalPasos}
            onAnterior={anterior}
            onSiguiente={siguiente}
            esPasoFinal={paso === totalPasos}
          />
        </div>
      </CardContainer>
      <div style={{width: 480, paddingTop: 0, marginTop: 12}}>
        <CInfo texto={infoTextos[paso] || ""} />
      </div>
    </div>
  );
} 
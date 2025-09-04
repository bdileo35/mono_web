"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import QRingContainer from '../../components/QRingContainer';
import CInfo from '../../components/CInfo';
import SolicitudTimbreModal from '../../components/SolicitudTimbreModal';

interface PisoConfig {
  nombre: string;
  dptos: string[];
}

interface TimbreConfig {
  id: string;
  nombre: string;
  piso: string;
  dpto: string;
  numero: string;
  metodo: string;
  estado: string;
  esPropio: boolean;
  estadoAsignacion: string;
}

interface DireccionData {
  idUnico: string;
  calle: string;
  numero: string;
  ciudad?: string;
  nombre: string;
  estructura: PisoConfig[];
  timbres: TimbreConfig[];
}

export default function AccesoPage() {
  const params = useParams<{ idUnico: string }>();
  const router = useRouter();
  const [data, setData] = useState<DireccionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSolicitudModal, setShowSolicitudModal] = useState(false);
  
  useEffect(() => {
    const cargarDatos = async () => {
      if (!params.idUnico) {
        setError('ID único requerido');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/publico/${params.idUnico}`);
        const result = await response.json();
        
        if (result.success) {
          setData(result.data);
          // Guardar el IDU en localStorage para que el Admin pueda acceder
          localStorage.setItem('ventaIdUnico', params.idUnico);
        } else {
          setError(result.error || 'Error al cargar los datos');
        }
      } catch (err) {
        console.error('Error cargando datos:', err);
        setError('Error de conexión');
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [params.idUnico]);

  // Verificar si debe mostrar el modal de solicitud
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const shouldShowModal = localStorage.getItem('showSolicitudModal');
      if (shouldShowModal === 'true') {
        setShowSolicitudModal(true);
        localStorage.removeItem('showSolicitudModal');
      }
    }
  }, []);

  const handleSolicitudTimbre = async (data: { nombre: string; telefono: string; departamento: string }) => {
    try {
      const response = await fetch('/api/publico/solicitud-timbre', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idUnico: params.idUnico,
          nombre: data.nombre,
          telefono: data.telefono,
          departamento: data.departamento
        })
      });

      const result = await response.json();
      
      if (result.success) {
        alert(`✅ Solicitud enviada: ${data.nombre} del ${data.departamento}\n\nEl administrador revisará tu solicitud y te contactará por WhatsApp.`);
        setShowSolicitudModal(false);
        
        // Recargar los datos para mostrar la solicitud
        window.location.reload();
      } else {
        alert(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error enviando solicitud:', error);
      alert('❌ Error al enviar la solicitud. Intenta nuevamente.');
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        background: "#f4f6fa", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center",
        padding: '20px'
      }}>
        <div style={{ textAlign: 'center', color: '#1a4fa3', fontSize: 18 }}>
          Cargando timbres...
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        background: "#f4f6fa", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center",
        padding: '20px'
      }}>
        <div style={{ textAlign: 'center', color: '#d32f2f', fontSize: 18 }}>
          {error || 'No se encontraron timbres para esta dirección'}
        </div>
        <button 
          onClick={() => router.push('/tienda')}
          style={{
            marginTop: 20,
            background: '#1a4fa3',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 24px',
            fontSize: 16,
            cursor: 'pointer'
          }}
        >
          Ir a la tienda
        </button>
      </div>
    );
  }

  if (!data.estructura?.length) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        background: "#f4f6fa", 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center",
        padding: '20px'
      }}>
        <div style={{ textAlign: 'center', color: '#d32f2f', fontSize: 18 }}>
          No hay timbres configurados para esta dirección.
        </div>
      </div>
    );
  }
  
  return (
    <>
      <div style={{ minHeight: "10vh", background: "#f4f6fa", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: '10px 0' }}>
        {/* Contenedor Principal usando el componente compartido */}
        <QRingContainer
          calle={data.calle}
          numero={data.numero}
          idUnico={data.idUnico}
          estructura={data.estructura}
          timbres={data.timbres}
          showBottomButtons={true}
          onTiendaClick={() => {
            if (typeof window !== 'undefined') {
              localStorage.setItem('publicVisit', '1');
            }
            router.push('/tienda');
          }}
          onUsuariosClick={() => router.push('/login')}
        />
        
        {/* CInfo inferior */}
        <div style={{ maxWidth: 380, width: '100%', margin: '18px auto 0 auto' }}>
          <CInfo texto="Escaneá el código QR para tocar timbres. Los residentes pueden acceder a su panel privado desde el botón de Usuarios." />
        </div>
      </div>

      {/* Modal de solicitud de timbre */}
      <SolicitudTimbreModal
        isOpen={showSolicitudModal}
        onClose={() => setShowSolicitudModal(false)}
        onSubmit={handleSolicitudTimbre}
        estructura={data.estructura}
        timbres={data.timbres}
      />
    </>
  );
}

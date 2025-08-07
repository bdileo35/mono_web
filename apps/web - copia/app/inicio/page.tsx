"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import QRingContainer from '../components/QRingContainer';
import NavBar from '../components/NavBar';
import CInfo from '../components/CInfo';
import { MdApartment, MdNotificationsActive, MdPerson } from "react-icons/md";

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

export default function InicioPage() {
  const router = useRouter();
  const [wizardData, setWizardData] = useState<any>(null);

  // Cargar datos del wizard desde localStorage
  useEffect(() => {
    const datosGuardados = localStorage.getItem('wizardData');
    if (datosGuardados) {
      const data = JSON.parse(datosGuardados);
      setWizardData(data);
    } else {
      // Si no hay datos, redirigir a la tienda
      router.push('/tienda');
    }
  }, [router]);

  if (!wizardData) {
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
          Cargando configuración...
        </div>
      </div>
    );
  }

  // Calcular estadísticas
  const totalTimbres = wizardData.estructura?.reduce((acc: number, piso: PisoConfig) => acc + piso.dptos.length, 0) || 0;
  const timbresConfigurados = wizardData.timbres?.filter((t: TimbreConfig) => t.estadoAsignacion === 'configurado').length || 0;
  const timbresAsignados = wizardData.timbres?.filter((t: TimbreConfig) => t.estadoAsignacion === 'asignado').length || 0;

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "#f4f6fa", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      padding: '10px 0',
      paddingBottom: '80px' // Espacio para NavBar
    }}>
      {/* Contenedor Principal usando el componente compartido */}
      <QRingContainer
        calle={wizardData.calle}
        numero={wizardData.numero}
        idUnico={wizardData.idUnico || 'test-id'}
        estructura={wizardData.estructura}
        showBottomButtons={false}
      />

      {/* Estadísticas de configuración */}
      <div style={{ 
        display: 'flex', 
        gap: 12, 
        marginTop: 24, 
        width: '100%', 
        maxWidth: 380, 
        justifyContent: 'center',
        background: '#fff',
        borderRadius: 16,
        padding: '16px',
        boxShadow: '0 2px 8px #0001'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#1a4fa3', fontWeight: 700 }}>
          <MdApartment size={20} />
          <span>{totalTimbres} timbres</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#388e3c', fontWeight: 700 }}>
          <MdNotificationsActive size={20} />
          <span>{timbresConfigurados} configurados</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#1976d2', fontWeight: 700 }}>
          <MdPerson size={20} />
          <span>{timbresAsignados} asignados</span>
        </div>
      </div>

      {/* CInfo inferior */}
      <div style={{ maxWidth: 380, width: '100%', margin: '18px auto 0 auto' }}>
        <CInfo texto="¡Tu sistema QRing está configurado y funcionando! Los visitantes pueden escanear el código QR para tocar timbres. Usa el menú de abajo para configurar más opciones." />
      </div>

      {/* NavBar fijo en la parte inferior */}
      <div style={{ width: '100vw', position: 'fixed', left: 0, bottom: 0, zIndex: 200 }}>
        <NavBar role="User" />
      </div>
    </div>
  );
} 
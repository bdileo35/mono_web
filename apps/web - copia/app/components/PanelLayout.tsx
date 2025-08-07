'use client';
import React from 'react';
import { IconType } from 'react-icons';

interface PanelLayoutProps {
  // Configuración del header
  title: string;
  headerIcon?: React.ReactNode;
  
  // Configuración del sidebar
  sections: Array<{
    key: string;
    label: string;
    icon: IconType;
  }>;
  currentSection: string;
  onSectionChange: (section: string) => void;
  
  // Contenido central
  children: React.ReactNode;
  
  // Footer dinámico
  footerContent?: React.ReactNode;
  footerDescription?: string;
  
  // Configuración adicional
  showSidebar?: boolean;
  sidebarWidth?: number;
  containerWidth?: number;
}

export default function PanelLayout({
  title,
  headerIcon,
  sections,
  currentSection,
  onSectionChange,
  children,
  footerContent,
  footerDescription,
  showSidebar = true,
  sidebarWidth = 60,
  containerWidth = 1400
}: PanelLayoutProps) {
  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "#f4f6fa", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "flex-start", 
      justifyContent: "flex-start",
      padding: "20px 20px 20px 40px"
    }}>
      <div style={{
        width: containerWidth,
        height: 'calc(100vh - 120px)',
        maxWidth: '95vw',
        background: "#fff",
        borderRadius: 0,
        boxShadow: "0 2px 12px #0003",
        padding: 0,
        margin: '0',
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "flex-start",
        border: '1px solid #d0d7de',
        overflow: 'hidden'
      }}>
        {/* Sidebar con menú */}
        {showSidebar && (
          <div style={{
            width: sidebarWidth,
            background: "#f8faff",
            borderRight: "1px solid #d0d7de",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            gap: 16,
            paddingTop: 20,
            flexShrink: 0
          }}>
            {sections.map((item) => {
              const Icon = item.icon;
              const selected = currentSection === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => onSectionChange(item.key)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 48,
                    height: 48,
                    background: selected ? "#eaf4ff" : "none",
                    color: selected ? "#1a4fa3" : "#222",
                    border: "none",
                    borderRadius: 12,
                    fontWeight: selected ? 700 : 500,
                    fontSize: 17,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  title={item.label}
                >
                  <Icon size={28} style={{ minWidth: 28 }} />
                </button>
              );
            })}
          </div>
        )}

        {/* Contenido principal */}
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          height: '100%',
          overflow: 'hidden'
        }}>
          {/* Header con título e iconos */}
          <div style={{
            background: '#f8faff',
            borderBottom: '1px solid #d0d7de',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            flexShrink: 0,
            boxShadow: '0 1px 3px #0001'
          }}>
            <h2 style={{ 
              color: "#1a4fa3", 
              fontWeight: 900, 
              fontSize: 24, 
              margin: 0, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 10 
            }}>
              {headerIcon && headerIcon}
              {title}
            </h2>
          </div>

          {/* Contenido central - ocupa todo el espacio disponible */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            minHeight: 0
          }}>
            {children}
          </div>

          {/* Footer dinámico */}
          <div style={{
            background: '#f8faff',
            borderTop: '1px solid #d0d7de',
            padding: '8px 24px',
            color: "#666",
            fontSize: 12,
            textAlign: "center",
            flexShrink: 0,
            minHeight: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 -1px 3px #0001'
          }}>
            {footerContent ? footerContent : (
              <span>{footerDescription || "Panel de administración"}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
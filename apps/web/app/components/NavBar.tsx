"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const navItems = [
  { icon: "🏠", label: "Inicio", path: "/admin/dashboard" },
  { icon: "🔔", label: "Invitaciones", path: "/admin/invitaciones" },
  { icon: "❓", label: "Ayuda", path: "/admin/ayuda" },
];

export default function NavBar({ role = "User" }: { role?: "User" | "Admin" | "SuperAdmin" }) {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  return (
    <nav style={{ position: "fixed", bottom: 0, left: 0, width: "100%", background: "#fff", borderTop: "1px solid #eee", display: "flex", justifyContent: "space-around", alignItems: "center", height: 60, zIndex: 100 }}>
      {navItems.map((item) => (
        <button key={item.label} onClick={() => router.push(item.path)} style={{ background: "none", border: "none", fontSize: 26, color: "#1a4fa3", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span>{item.icon}</span>
          <span style={{ fontSize: 12 }}>{item.label}</span>
        </button>
      ))}
      {/* Menú hamburguesa */}
      <button onClick={() => setShowMenu((v) => !v)} style={{ background: "none", border: "none", fontSize: 26, color: "#1a4fa3", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <span>☰</span>
        <span style={{ fontSize: 12 }}>Config</span>
      </button>
      {showMenu && (
        <div style={{ position: "fixed", bottom: 70, right: 16, background: "#fff", border: "1px solid #eee", borderRadius: 12, boxShadow: "0 2px 16px #0002", padding: 18, minWidth: 180, zIndex: 200 }}>
          <div style={{ fontWeight: 700, color: "#1a4fa3", marginBottom: 8 }}>Menú {role}</div>
          {role === "User" && <div>Perfil<br />Teléfonos<br />Ayuda</div>}
          {role === "Admin" && <div>Usuarios<br />Timbres<br />Packs<br />Invitaciones<br />Ayuda</div>}
          {role === "SuperAdmin" && <div>Global<br />Direcciones<br />Packs<br />Ventas<br />Usuarios<br />Ayuda</div>}
        </div>
      )}
    </nav>
  );
} 

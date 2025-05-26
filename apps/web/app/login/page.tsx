'use client';
import React, { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin" && password === "1234") {
      window.location.href = "/admin/dashboard";
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f4f6fa" }}>
      <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px #0002", padding: 32, maxWidth: 340, width: "100%", textAlign: "center", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ color: "#1a4fa3", fontWeight: 700, marginBottom: 16 }}>Bienvenido a QRing_Pro</h2>
        <p style={{ fontSize: 15, color: "#333", marginBottom: 18 }}>
          Iniciá sesión para acceder a la administración.<br />
          <span style={{ fontSize: 13, color: "#888" }}>*Utilizá el mail que usaste en la compra*</span>
        </p>
        <form style={{ marginBottom: 18, width: '100%' }} onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12, textAlign: "left" }}>
            <label style={{ fontSize: 14, color: "#555" }}>E-Mail</label>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #ccc", marginTop: 4 }} />
          </div>
          <div style={{ marginBottom: 12, textAlign: "left" }}>
            <label style={{ fontSize: 14, color: "#555" }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #ccc", marginTop: 4 }} />
          </div>
          {error && <div style={{ color: '#c00', fontWeight: 600, marginBottom: 10, textAlign: 'center' }}>{error}</div>}
          <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
            <button type="button" style={{ flex: 1, background: "#eee", color: "#1a4fa3", border: "none", borderRadius: 8, padding: 10, fontWeight: 600, cursor: "pointer" }}>Cancelar</button>
            <button type="submit" style={{ flex: 1, background: "#1a4fa3", color: "#fff", border: "none", borderRadius: 8, padding: 10, fontWeight: 600, cursor: "pointer" }}>Aceptar</button>
          </div>
        </form>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 8, marginTop: 8 }}>
          <button style={{ background: "#fff", border: "1px solid #ccc", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, cursor: "pointer", padding: 0 }}>
            <Image src="/google-icon.png" alt="Google" width={24} height={24} />
          </button>
          <button style={{ background: "#fff", border: "1px solid #ccc", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, cursor: "pointer", padding: 0 }}>
            <Image src="/facebook-icon.png" alt="Facebook" width={24} height={24} />
          </button>
        </div>
      </div>
    </div>
  );
} 
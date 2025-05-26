import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import NavBar from "./components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QRing Pro",
  description: "Control de accesos y gestión de visitantes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0, background: "#f4f6fa", minHeight: "100vh", position: "relative" }}>
        {/* Mosaico de logos QRing en los laterales (solo desktop) */}
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
          display: "flex",
          justifyContent: "space-between",
          opacity: 0.10,
        }}>
          {/* Lateral izquierdo */}
          <div style={{ width: "calc((100vw - 440px)/2)", height: "100vh", display: "flex", flexDirection: "column", gap: 48, alignItems: "flex-end", padding: "32px 0" }}>
            {[...Array(4)].map((_, i) => (
              <Image key={i} src="/logo_qring.png" alt="QRing logo" width={90} height={90} style={{ marginRight: 12, opacity: 0.5 }} />
            ))}
          </div>
          {/* Lateral derecho */}
          <div style={{ width: "calc((100vw - 440px)/2)", height: "100vh", display: "flex", flexDirection: "column", gap: 48, alignItems: "flex-start", padding: "32px 0" }}>
            {[...Array(4)].map((_, i) => (
              <Image key={i} src="/logo_qring.png" alt="QRing logo" width={90} height={90} style={{ marginLeft: 12, opacity: 0.5 }} />
            ))}
          </div>
        </div>
        {/* Logo QRing tenue de fondo */}
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          opacity: 0.07
        }}>
          <Image src="/logo_qring.png" alt="QRing logo" width={420} height={420} style={{ objectFit: "contain" }} />
        </div>
        {/* Header QRing */}
        <header style={{ width: "100%", height: 64, background: "#fff", display: "flex", alignItems: "center", padding: "0 24px", boxSizing: "border-box", boxShadow: "0 2px 8px #0001", position: "fixed", top: 0, left: 0, zIndex: 10 }}>
          <Image src="/logo_qring.png" alt="QRing logo" width={48} height={48} style={{ objectFit: "contain" }} />
        </header>
        <main style={{ minHeight: "calc(100vh - 64px)", maxWidth: 440, margin: "64px auto 0 auto", position: "relative", zIndex: 10 }}>{children}</main>
        <NavBar role="Admin" />
      </body>
    </html>
  );
}

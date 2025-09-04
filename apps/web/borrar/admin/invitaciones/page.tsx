'use client';
import React, { useState } from 'react';
import CardContainer from "@/app/components/CardContainer";
import { FaCog, FaEdit, FaEnvelope } from "react-icons/fa";
import Header from '@/app/components/Header';

const TIMBRES_POR_PAGINA = 10;

const timbresIniciales = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  piso: i % 2 === 0 ? `${Math.floor(i / 2) + 1}` : "",
  dpto: i % 2 === 0 ? String.fromCharCode(65 + (i % 2)) : "",
  estado: ["sin_asignar", "configurando", "configurado"][i % 3] as "sin_asignar" | "configurando" | "configurado",
  numero: "",
  tipo: "texto"
}));

const estadoConfig = {
  sin_asignar: { color: "#888", texto: "Sin asignar" },
  configurando: { color: "#1976d2", texto: "Asignado" },
  configurado: { color: "#4CAF50", texto: "Configurado" },
};

export default function InvitacionesPage() {
  const [timbres, setTimbres] = useState(timbresIniciales);
  const [abierto, setAbierto] = useState<number | null>(null);
  const [form, setForm] = useState({ piso: "", dpto: "", numero: "", tipo: "texto" });
  const [pisoFiltro, setPisoFiltro] = useState<string>("");
  const [dptoFiltro, setDptoFiltro] = useState<string>("");
  const [estadoFiltro, setEstadoFiltro] = useState<string>("");
  const [pagina, setPagina] = useState(1);

  const pisos = Array.from(new Set(timbres.map(t => t.piso).filter(Boolean)));
  const dptos = Array.from(new Set(timbres.map(t => t.dpto).filter(Boolean)));

  const timbresFiltrados = timbres.filter(t =>
    (pisoFiltro ? t.piso === pisoFiltro : true) &&
    (dptoFiltro ? t.dpto === dptoFiltro : true) &&
    (estadoFiltro ? t.estado === estadoFiltro : true)
  );

  // Paginación
  const totalPaginas = Math.ceil(timbresFiltrados.length / TIMBRES_POR_PAGINA);
  const inicio = (pagina - 1) * TIMBRES_POR_PAGINA;
  const fin = inicio + TIMBRES_POR_PAGINA;
  const timbresPagina = timbresFiltrados.slice(inicio, fin);

  const handleAbrir = (id: number) => {
    setAbierto(abierto === id ? null : id);
    const t = timbres.find(t => t.id === id);
    setForm({ 
      piso: t?.piso || "", 
      dpto: t?.dpto || "", 
      numero: t?.numero || "", 
      tipo: t?.tipo || "texto"
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGuardar = (id: number) => {
    setTimbres(timbres.map(t =>
      t.id === id
        ? { ...t, piso: form.piso, dpto: form.dpto, numero: form.numero, tipo: form.tipo, estado: "configurado" }
        : t
    ));
    setAbierto(null);
  };

  const handlePagina = (nueva: number) => {
    if (nueva >= 1 && nueva <= totalPaginas) setPagina(nueva);
  };

  return (
    <>
      <Header />
      <div style={{ width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', background: '#f4f6fa', paddingTop: 80 }}>
        <CardContainer>
          {/* Header y filtros SIEMPRE visibles */}
          <div style={{ width: "98%", margin: "0 auto", background: "#e5e7eb", borderRadius: 12, zIndex: 2 }}>
            <div style={{ fontSize: 28, color: '#1a4fa3', fontWeight: 700, marginBottom: 12, textAlign: "center" }}>Invitaciones</div>
            {/* Encabezados */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "40px 1fr 1fr 1fr",
                alignItems: "center",
                padding: "0 12px 6px 12px",
                fontWeight: 600,
                color: "#222",
                fontSize: 16,
                background: "#e5e7eb",
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12
              }}
            >
              <span style={{ color: "#444", textAlign: "center" }}>#</span>
              <span style={{ color: "#444", textAlign: "left" }}>Timbre</span>
              <span style={{ color: "#444", textAlign: "center" }}>Estado</span>
              <span style={{ color: "#444", textAlign: "right" }}>Acciones</span>
            </div>
            {/* Filtros */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "40px 1fr 1fr 1fr",
                alignItems: "center",
                padding: "0 12px 10px 12px",
                background: "#e5e7eb",
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
                marginBottom: 4
              }}
            >
              <div />
              <div style={{ display: "flex", gap: 6, justifyContent: "flex-start" }}>
                <select value={pisoFiltro} onChange={e => setPisoFiltro(e.target.value)} style={{ padding: 4, borderRadius: 6, border: '1px solid #bbb', width: 48, fontSize: 13 }} >
                  <option value="">Piso</option>
                  {pisos.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <select value={dptoFiltro} onChange={e => setDptoFiltro(e.target.value)} style={{ padding: 4, borderRadius: 6, border: '1px solid #bbb', width: 48, fontSize: 13 }} >
                  <option value="">Dpto</option>
                  {dptos.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div style={{ display: "flex", gap: 8, justifyContent: "flex-start" }}>
                {Object.entries(estadoConfig).map(([key, val]) => (
                  <span
                    key={key}
                    title={val.texto}
                    onClick={() => setEstadoFiltro(estadoFiltro === key ? "" : key)}
                    style={{
                      display: "inline-block",
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: val.color,
                      border: estadoFiltro === key ? "2px solid #1976d2" : "1px solid #bbb",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
              <div />
            </div>
          </div>
          {/* SOLO la tabla scrollea */}
          <div style={{ width: "98%", margin: "0 auto", flex: 1, overflowY: "auto", background: "#fff", borderRadius: 12 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "transparent" }}>
              <tbody>
                {timbresPagina.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center", color: "#888", padding: 24 }}>No hay timbres para mostrar.</td>
                  </tr>
                ) : timbresPagina.map((timbre, idx) => (
                  <React.Fragment key={timbre.id}>
                    <tr
                      style={{
                        borderBottom: "1px solid #eee",
                        background: abierto === timbre.id ? "#eaf2fd" : "#fff",
                        transition: "background 0.2s"
                      }}
                    >
                      <td style={{ padding: "10px 4px", textAlign: "center", color: "#888", fontWeight: 600 }}>
                        {(inicio + idx + 1)}
                      </td>
                      <td style={{ padding: "10px 8px", color: "#222", fontWeight: 600 }}>
                        {(timbre.piso || "-") + "-" + (timbre.dpto || "-")}
                      </td>
                      <td style={{ padding: "10px 8px", textAlign: "center" }}>
                        <span
                          style={{
                            display: "inline-block",
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            background: estadoConfig[timbre.estado].color,
                            verticalAlign: "middle",
                            marginRight: 4,
                            border: "1px solid #ccc"
                          }}
                          title={estadoConfig[timbre.estado].texto}
                        />
                      </td>
                      <td style={{ padding: "10px 8px", textAlign: "center" }}>
                        <button title="Configurar" style={{ background: "none", border: "none", cursor: "pointer", marginRight: 10, color: "#1976d2" }} onClick={() => handleAbrir(timbre.id)}>
                          <FaCog size={18} />
                        </button>
                        <button title="Editar" style={{ background: "none", border: "none", cursor: "pointer", marginRight: 10, color: "#1976d2" }}>
                          <FaEdit size={18} />
                        </button>
                        <button title="Invitar" style={{ background: "none", border: "none", cursor: "pointer", color: "#1976d2" }}>
                          <FaEnvelope size={18} />
                        </button>
                      </td>
                    </tr>
                    {abierto === timbre.id && (
                      <tr>
                        <td colSpan={4} style={{
                          background: "#eaf2fd",
                          padding: 0,
                          borderBottomLeftRadius: 8,
                          borderBottomRightRadius: 8
                        }}>
                          <div style={{
                            width: "100%",
                            margin: 0,
                            background: "transparent",
                            borderRadius: 0,
                            padding: "16px 16px 12px 16px",
                            border: '1px solid #ddd',
                            borderTop: "none"
                          }}>
                            {/* Primera línea: Piso y Dpto */}
                            <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
                              <label style={{ color: '#222', marginRight: 4 }}>Piso:</label>
                              <input
                                name="piso"
                                value={form.piso}
                                onChange={handleChange}
                                style={{
                                  padding: '4px 6px',
                                  borderRadius: 4,
                                  border: '1.5px solid #bbb',
                                  background: '#f3f3f3',
                                  color: '#222',
                                  width: 32,
                                  marginRight: 8
                                }}
                              />
                              <label style={{ color: '#222', marginRight: 4 }}>Dpto:</label>
                              <input
                                name="dpto"
                                value={form.dpto}
                                onChange={handleChange}
                                style={{
                                  padding: '4px 6px',
                                  borderRadius: 4,
                                  border: '1.5px solid #bbb',
                                  background: '#f3f3f3',
                                  color: '#222',
                                  width: 32,
                                  marginRight: 8
                                }}
                              />
                            </div>
                            {/* Segunda línea: Nro, Combo, DND, Guardar */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8, flexWrap: "wrap" }}>
                              <label style={{ color: '#222', marginRight: 4 }}>Nro:</label>
                              <input
                                name="numero"
                                value={form.numero}
                                onChange={handleChange}
                                style={{
                                  padding: '4px 6px',
                                  borderRadius: 4,
                                  border: '1.5px solid #bbb',
                                  background: '#f3f3f3',
                                  color: '#222',
                                  width: 100,
                                  marginRight: 8
                                }}
                              />
                              <select
                                name="tipo"
                                value={form.tipo}
                                onChange={handleChange}
                                style={{
                                  padding: '4px 6px',
                                  borderRadius: 4,
                                  border: '1.5px solid #bbb',
                                  background: '#f3f3f3',
                                  color: '#222',
                                  width: 90,
                                  marginRight: 0
                                }}
                              >
                                <option value="texto">Texto</option>
                                <option value="llamada" disabled>Llamada (Próximamente)</option>
                                <option value="video" disabled>Video (Próximamente)</option>
                              </select>
                              <button
                                style={{
                                  padding: '5px 12px',
                                  borderRadius: 6,
                                  border: 'none',
                                  background: '#bbb',
                                  color: '#fff',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                  marginLeft: 8,
                                  marginRight: 0
                                }}
                                disabled
                                title="No molestar (Próximamente)"
                              >
                                DND
                              </button>
                              <button
                                style={{
                                  padding: '6px 16px',
                                  borderRadius: 6,
                                  border: 'none',
                                  background: '#1976d2',
                                  color: '#fff',
                                  fontWeight: 600,
                                  cursor: 'pointer',
                                  marginLeft: 0
                                }}
                                onClick={() => handleGuardar(timbre.id)}
                              >
                                Guardar
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          {/* Paginación */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, margin: "10px 0 0 0" }}>
            <button
              onClick={() => handlePagina(pagina - 1)}
              disabled={pagina === 1}
              style={{
                padding: "4px 12px",
                borderRadius: 6,
                border: "1px solid #bbb",
                background: pagina === 1 ? "#eee" : "#fff",
                color: "#1976d2",
                fontWeight: 600,
                cursor: pagina === 1 ? "not-allowed" : "pointer"
              }}
            >
              {"<"}
            </button>
            <span style={{ fontWeight: 600, color: "#222" }}>
              Página {pagina} de {totalPaginas}
            </span>
            <button
              onClick={() => handlePagina(pagina + 1)}
              disabled={pagina === totalPaginas}
              style={{
                padding: "4px 12px",
                borderRadius: 6,
                border: "1px solid #bbb",
                background: pagina === totalPaginas ? "#eee" : "#fff",
                color: "#1976d2",
                fontWeight: 600,
                cursor: pagina === totalPaginas ? "not-allowed" : "pointer"
              }}
            >
              {">"}
            </button>
        </div>
        </CardContainer>
      </div>
    </>
  );
} 
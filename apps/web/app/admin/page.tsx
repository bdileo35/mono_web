'use client'

import React, { useState } from "react";
import Head from "next/head";
//import styles from "../styles/admin.module.css";


interface Timbre {
id: number;
nombre: string;
usuario: string;
}

export default function Dashboard() {
const [timbres, setTimbres] = useState<Timbre[]>([]);
const [nombre, setNombre] = useState("");
const [usuario, setUsuario] = useState("");
const [editando, setEditando] = useState<number | null>(null);

const handleAgregar = () => {
if (!nombre || !usuario) return;
setTimbres([...timbres, { id: Date.now(), nombre, usuario }]);
setNombre("");
setUsuario("");
};

const handleEditar = (timbre: Timbre) => {
setEditando(timbre.id);
setNombre(timbre.nombre);
setUsuario(timbre.usuario);
};

const handleGuardar = () => {
if (!nombre || !usuario || editando === null) return;
setTimbres(
timbres.map((t) =>
t.id === editando ? { ...t, nombre, usuario } : t
)
);
setEditando(null);
setNombre("");
setUsuario("");
};

const handleBorrar = (id: number) => {
setTimbres(timbres.filter((t) => t.id !== id));
};

return (
<>
<Head>
<title>Admin QRing</title>
</Head>
<main className={styles.main}>
<h1>Panel de Administración QRing Pro</h1>
<h2>Timbres</h2>
<ul>
{timbres.map((t) => (
<li key={t.id} style={{ marginBottom: 10 }}>
<b>{t.nombre}</b> - Usuario: {t.usuario}
<button onClick={() => handleEditar(t)} style={{ marginLeft: 10 }}>Editar</button>
<button onClick={() => handleBorrar(t.id)} style={{ marginLeft: 5, color: "red" }}>Borrar</button>
</li>
))}
</ul>
<input
type="text"
placeholder="Nombre del timbre"
value={nombre}
onChange={(e) => setNombre(e.target.value)}
style={{ marginRight: 10 }}
/>
<input
type="text"
placeholder="Usuario asignado"
value={usuario}
onChange={(e) => setUsuario(e.target.value)}
style={{ marginRight: 10 }}
/>
{editando ? (
<button onClick={handleGuardar}>Guardar cambios</button>
) : (
<button onClick={handleAgregar}>Agregar timbre</button>
)}
</main>
</>
);
}
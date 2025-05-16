import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  const [usuarios, setUsuarios] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "usuarios"));
      setUsuarios(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Usuarios en Firestore</h1>
      <ul>
        {usuarios.map(u => (
          <li key={u.id}>{u.nombre} ({u.email})</li>
        ))}
      </ul>
    </div>
  );
}
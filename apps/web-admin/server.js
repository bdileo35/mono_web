const express = require('express');
const admin = require('firebase-admin');
const app = express();
const PORT = 4000;

// Inicializar Firebase Admin SDK
const serviceAccount = require('./firebaseConfig.json'); // Archivo descargado desde Firebase Console
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<tu-proyecto>.firebaseio.com', // Reemplaza con tu URL
});

const db = admin.firestore(); // Conexión a Firestore

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Servir imágenes estáticas
app.use('/images', express.static('pages/images'));

// Página principal
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Servidor</title>
      </head>
      <body>
        <h1>Bienvenido al servidor</h1>
        <img src="/images/logo.png" alt="Logo" style="width:200px;height:auto;">
        <p>Visita <a href="/api/registros">/api/registros</a> para ver los datos.</p>
        <p>Este es un ejemplo de contenido HTML más elaborado.</p>
      </body>
    </html>
  `);
});

// Obtener todos los registros
app.get('/api/registros', async (req, res) => {
  try {
    const snapshot = await db.collection('usuarios').get();
    const registros = snapshot.docs.map(doc => ({
      id: doc.id, // ID del documento
      ...doc.data() // Datos del documento
    }));
    res.json(registros);
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    res.status(500).send('Error al obtener los registros');
  }
});

// Crear un nuevo registro
app.post('/api/registros', async (req, res) => {
  try {
    const nuevoUsuario = req.body; // Datos enviados en el cuerpo de la solicitud
    const docRef = await db.collection('usuarios').add(nuevoUsuario);
    res.status(201).json({ id: docRef.id, ...nuevoUsuario });
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).send('Error al crear el registro');
  }
});

// Actualizar un registro existente
app.put('/api/registros/:id', async (req, res) => {
  try {
    const { id } = req.params; // ID del documento
    const datosActualizados = req.body; // Datos enviados en el cuerpo de la solicitud
    await db.collection('usuarios').doc(id).update(datosActualizados);
    res.status(200).send('Registro actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
    res.status(500).send('Error al actualizar el registro');
  }
});

// Eliminar un registro
app.delete('/api/registros/:id', async (req, res) => {
  try {
    const { id } = req.params; // ID del documento
    await db.collection('usuarios').doc(id).delete();
    res.status(200).send('Registro eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
    res.status(500).send('Error al eliminar el registro');
  }
});

// Iniciar el servidor
console.log('Iniciando el servidor...');
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
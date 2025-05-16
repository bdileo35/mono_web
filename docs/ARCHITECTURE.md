# Arquitectura y Flujos

## Descripción
La arquitectura de QRing Pro está basada en una solución modular que incluye:
- **Frontend**: App móvil y panel web.
- **Backend**: Firebase (Firestore, Functions, Auth).
- **Infraestructura**: Despliegue en Vercel y Expo.

## Flujos principales
1. **Inicio de sesión**:
   - El usuario se autentica mediante email/contraseña o redes sociales.
2. **Gestión de accesos**:
   - Los administradores configuran los accesos y gestionan usuarios.
3. **Notificaciones**:
   - Los usuarios reciben notificaciones en tiempo real mediante FCM. 
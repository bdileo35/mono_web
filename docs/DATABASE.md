# Base de Datos

## Estructura de Firestore
1. **Usuarios**:
   - `users/{userId}`
   - Campos: `name`, `email`, `role`, `createdAt`.
2. **Accesos**:
   - `accesses/{accessId}`
   - Campos: `userId`, `type`, `timestamp`.
3. **Notificaciones**:
   - `notifications/{notificationId}`
   - Campos: `userId`, `message`, `read`.

## Relaciones
- Un usuario puede tener múltiples accesos.
- Las notificaciones están vinculadas a usuarios.
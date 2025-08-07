# PonerseAlDia.md

## 1. Análisis General del Proyecto QRing Pro

### ¿Qué es QRing Pro?
QRing Pro es una plataforma para control de accesos y gestión de visitantes en edificios, con:
- App web (Next.js)
- App móvil (en desarrollo)
- Backend con Prisma y SQLite (desarrollo local)
- Arquitectura monorepo (TurboRepo)
- Funcionalidad de timbres inteligentes, invitaciones, usuarios, comunidad, etc.

---

### Estructura del Proyecto

- **monorepo/**
  - **apps/**
    - **web/**: App principal (Next.js)
      - **app/**: Páginas, componentes, API routes
      - **public/**: Imágenes, logos, assets
      - **lib/**: Prisma client singleton
      - **services/**: Lógica de negocio (ej: ventaService)
      - **next.config.ts**: Configuración Next.js
    - **mobile-app/**: App móvil (en desarrollo)
  - **packages/**: Librerías compartidas (ui, utils, firebase)
  - **prisma/**: Esquema y migraciones de base de datos
  - **docs/**: Documentación técnica y funcional

---

### Documentación relevante en `/docs`:
- **README_COMPLETO.md** y **README_NEW.md**:  
  Explican la arquitectura, tecnologías, estructura de carpetas, flujo de usuario y buenas prácticas.
- **ErrorPersistente.md**:  
  Detalla el problema con Prisma Client en Windows, diagnóstico, hipótesis y pasos sugeridos.
- **ayuda.md**:  
  Comandos útiles para desarrollo y administración.
- **contexto-wizard-qring.md**:  
  Explica el flujo y mejoras del wizard de onboarding/configuración.

---

## 2. Estado Actual del Problema Prisma/WSL

### Problema:
- Prisma Client da error en Windows:  
  `Error: @prisma/client did not initialize yet`
- El error ocurre al llamar a la API `/api/tienda/simular-pago` y otras rutas que usan Prisma.

### Diagnóstico:
- El código y la estructura están bien (singleton, dependencias, generación del cliente, etc).
- El motor de Prisma está generado (`query_engine-windows.dll.node` existe).
- El problema es del entorno Windows: permisos, antivirus, o virtualización.

### Acciones realizadas:
- Se intentó instalar WSL Ubuntu para probar en entorno Linux.
- Se habilitaron las características de Windows Subsystem for Linux, VirtualMachinePlatform, Hyper-V y Containers.
- Se usó `bcdedit` para alternar el hipervisor.
- **No se pudo instalar WSL2/Ubuntu** por el error:  
  `HCS_E_SERVICE_NOT_AVAILABLE`
- **Dato importante:** El usuario utiliza VirtualBox para otras tareas (ej. Home Assistant/Hassio), lo que genera un conflicto de hipervisores y hace inviable el uso de WSL2/Hyper-V en este entorno sin afectar VirtualBox.

### Decisión:
- **Se deja el problema de Prisma/WSL en Parking** hasta que se disponga de un entorno Linux o Docker independiente.
- Se continúa el desarrollo y pruebas usando el flujo demo/localStorage.

---

## 3. ¿Dónde se guardan los datos actualmente?

- **Modo demo/desarrollo:**  
  Los datos del wizard, login y configuraciones se guardan en el **localStorage** del navegador (`wizardData`, `isAdmin`, etc).
- **Modo real (objetivo):**  
  Los datos deberían guardarse en la base de datos vía Prisma, usando las rutas API de Next.js.

---

## 4. Próximos pasos recomendados (Plan de trabajo actual)

### A) Próxima tarea prioritaria (en espera):
- **Rediseñar la pantalla de la tienda:**
  - Eliminar el selector de tipo de solución.
  - Usar un input de cantidad con step de 5 en 5 hasta 50, luego de 10 en 10 hasta 100.
  - Mostrar un edificio vectorial simple (SVG) con un QR difuminado de fondo.
  - Darle mayor importancia visual al dibujo.
- El resto del flujo (carrito, login, wizard, etc.) sigue igual y funcionando en modo demo/local.

### B) Si en el futuro se dispone de un entorno Linux/WSL2/Docker:
- Retomar la integración real con Prisma y la base de datos.

---

## 5. Checklist de pruebas de flujo real

1. **Tienda:** Comprar producto y simular pago.
2. **Login:** Acceder con mail e IDUnico.
3. **Wizard:** Completar dirección, estructura y timbres.
4. **Etiqueta:** Imprimir y escanear QR.
5. **Acceso:** Probar acceso como visitante y residente.

---

## 6. Comandos útiles

- Instalar dependencias:  
  `npm install`
- Levantar servidor Next.js:  
  `npm run dev` (en `apps/web`)
- Generar cliente Prisma:  
  `npx prisma generate`
- Ejecutar migraciones:  
  `npx prisma migrate dev`
- Ver base de datos:  
  `npx prisma studio`

---

## 7. Si necesitas ayuda extra

- Consulta los archivos en `/docs`
- Pide ayuda con la instalación de WSL, Docker o configuración de Prisma.
- Si tienes dudas sobre el flujo, pide el checklist detallado de pruebas.

---

**¡Listo! El estado actual es: esperando rediseño de la pantalla de la tienda con QR y edificio SVG, y el resto del flujo sigue funcionando en modo demo/localStorage.** 
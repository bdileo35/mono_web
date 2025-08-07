<<<<<<< HEAD
# QRing Pro - Documentación Completa y Histórico del Proyecto

## 🎯 ¿Qué es QRing Pro?

QRing Pro es una **solución integral para el control de accesos y la gestión de visitantes** en edificios, barrios, consorcios y oficinas. Permite administrar timbres inteligentes, usuarios y accesos desde una app móvil y un panel web, facilitando la comunicación y la seguridad entre residentes, visitantes y encargados.

**Características principales:**
- 🏢 **Gestión de edificios** con estructura personalizable (pisos, departamentos)
- 📱 **Panel web de administración** para configurar usuarios y timbres
- 🛒 **Tienda online** para comprar sistemas QRing
- 🔐 **Sistema de invitaciones** y gestión de comunidad
- 📋 **Wizard de configuración** paso a paso
- 🏷️ **Generación de etiquetas QR** para pegar en edificios

---

## 🏗️ Arquitectura Técnica

### Tecnologías Utilizadas
- **Next.js 15.3.2**: Framework para construir la web (React 18.3.1, SSR, API routes)
- **React 18.3.1**: Librería para construir interfaces de usuario
- **TypeScript**: Lenguaje que agrega tipado a JavaScript
- **Prisma 6.10.1**: ORM para manejar la base de datos de forma sencilla y segura
- **SQLite**: Base de datos liviana para desarrollo local
- **TurboRepo**: Herramienta para organizar y acelerar el desarrollo de monorepos
- **Node.js**: Entorno para ejecutar JavaScript en el servidor
- **React Icons**: Librería de íconos para React
- **QRCode.react**: Componente para generar códigos QR en React

### Estructura del Monorepo
```
monorepo/
├── apps/
│   ├── web/                    # Aplicación web principal (Next.js)
│   │   ├── app/               # Páginas y componentes de la web
│   │   │   ├── acceso/        # Página pública de acceso por QR
│   │   │   ├── admin/         # Panel de administración
│   │   │   ├── api/           # Endpoints API (Next.js API routes)
│   │   │   ├── tienda/        # Tienda online de productos
│   │   │   ├── login/         # Sistema de autenticación
│   │   │   └── components/    # Componentes reutilizables
│   │   ├── public/            # Imágenes, logos, assets estáticos
│   │   ├── lib/               # Prisma client singleton
│   │   └── services/          # Lógica de negocio
│   └── mobile-app/            # App móvil (en desarrollo)
├── packages/
│   ├── ui/                    # Componentes UI compartidos
│   ├── utils/                 # Funciones utilitarias compartidas
│   └── firebase/              # Integración con Firebase (futuro)
├── prisma/
│   ├── migrations/            # Migraciones de la base de datos
│   ├── schema.prisma          # Definición del modelo de datos
│   └── seed.ts                # Script para poblar la base
└── docs/                      # Documentación técnica y funcional
=======
# QRing Pro - Documentación Completa

## ¿Qué es QRing Pro?
QRing Pro es una solución integral para el control de accesos y la gestión de visitantes en edificios, barrios, consorcios y oficinas. Permite administrar timbres inteligentes, usuarios y accesos desde una app móvil y un panel web, facilitando la comunicación y la seguridad entre residentes, visitantes y encargados.

---

## Tecnologías utilizadas
- **Next.js**: Framework para construir la web (React, SSR, API routes).
- **React**: Librería para construir interfaces de usuario.
- **TypeScript**: Lenguaje que agrega tipado a JavaScript (más seguro y fácil de mantener).
- **Prisma**: ORM para manejar la base de datos de forma sencilla y segura.
- **SQLite**: Base de datos liviana para desarrollo local.
- **TurboRepo**: Herramienta para organizar y acelerar el desarrollo de monorepos (varios proyectos juntos).
- **Node.js**: Entorno para ejecutar JavaScript en el servidor.
- **Firebase**: (Opcional) Para autenticación, notificaciones o almacenamiento en la nube.
- **CSS Modules**: Para estilos personalizados y aislados por componente.

---

## Estructura del proyecto  

```
apps/
  web/
    app/
      acceso/         # Página pública de acceso por QR (wizard para visitantes y usuarios)
      admin/          # Panel de administración (gestión de usuarios, timbres, invitaciones)
      api/            # Endpoints API (Next.js API routes)
      tienda/         # (Futuro) Tienda online de productos domóticos
      web/            # (Futuro) Otras páginas públicas o landings
      admin.module.css
      favicon.ico
      globals.css     # Estilos globales de la web
      layout.tsx      # Layout general (header, footer, navegación)
      page.module.css
    public/           # Imágenes, logos, assets estáticos accesibles desde la web
    .gitignore
    next-env.d.ts
    next.config.js
    package-lock.json
    package.json
    README.md
    tsconfig.json
node_modules/
packages/
  firebase/           # Lógica y utilidades para integración con Firebase (si usás)
  ui/                 # Componentes de UI reutilizables (botones, cards, etc)
  utils/              # Funciones utilitarias compartidas
prisma/
  migrations/         # Migraciones de la base de datos Prisma
  dev.db              # Base de datos SQLite local (desarrollo)
  schema.prisma       # Definición del modelo de datos
  seed.ts             # Script para poblar la base con datos de ejemplo
.gitignore
package-lock.json
package.json
>>>>>>> b601f9ffd0ea8c42c32e4f3c6ec4e54597eef1aa
```

---

<<<<<<< HEAD
## 📋 Estado Actual del Proyecto

### ✅ **Última Actualización: 22/06/2025**
- **Flujo de Tienda + Wizard Modal**: ✅ COMPLETADO
- **Integración Wizard desde Tienda**: ✅ COMPLETADO  
- **UI/UX Coherente y Mejorada**: ✅ COMPLETADO
- **Modales con nombre de timbre editable, títulos dinámicos, CInfo azulado y paddings ajustados**: ✅ COMPLETADO
- **Flujo de Compra Demo**: ✅ FUNCIONANDO
- **Panel de Administración**: ⚠️ EN PROGRESO
- **Roles y Accesos**: ⚠️ EN PROGRESO
- **Prisma y Mercado Pago**: ⚠️ PENDIENTE DE INTEGRACIÓN REAL
- **Persistencia local de datos en wizard**: ⚠️ PENDIENTE (próximo paso)

### 🎯 **Próximos Pasos y Hoja de Ruta**
1. Guardar datos de cada paso del wizard (compra y config) en localStorage.
2. Terminar la página de Inicio (dashboard privado) y verificar que muestre los datos reales tras el wizard.
3. Definir y proteger el Panel de Administración solo para el super user.
4. Implementar y testear la lógica de roles (super user, admin, residente, visitante).
5. Resolver los errores de Prisma y Mercado Pago.
6. Publicar y lanzar la campaña de venta.
7. Limpieza de archivos/componentes en desuso.

---

## 🚀 Flujo Completo Implementado y Planificado

### 1. **Tienda → Carrito → Pago → Wizard Modal → Inicio**
```
Usuario → Tienda → Selecciona timbres → Carrito → Datos contacto → 
Simular Pago → Modal éxito → Botón "Configurar ahora" → Wizard Modal (3 pasos) → Página de Inicio (dashboard privado)
```

### 2. **Componentes Clave Integrados**
- ✅ `TiendaPage` con icono edificio centrado
- ✅ `CInfo` para mensajes informativos
- ✅ `WizardOnboarding` como modal
- ✅ Flujo de localStorage para `idUnico`
- ✅ Panel de administración (en progreso)
- ✅ Modales de timbre con nombre editable, títulos dinámicos y CInfo azulado

### 3. **Características Implementadas**
- **Icono edificio centrado** sobre QR difuminado
- **Stepper inteligente** (5-50: paso 5, 50-100: paso 10)
- **Contenedores coherentes** (340px max-width)
- **Modal de éxito** con datos del usuario
- **Wizard modal** con backdrop y botón de cierre
- **Persistencia de datos** en localStorage (en wizard, pendiente de refuerzo)
- **Roles y paneles protegidos** (en progreso)

---

## 📁 Estructura de Archivos y Pantallas (para limpieza futura)

### Esquema gráfico de páginas y componentes principales

```
apps/web/app/
├── acceso/
│   └── [idUnico]/page.tsx         # Página pública de acceso QR
├── tienda/
│   ├── page.tsx                   # Página principal de tienda y carrito
│   └── exito/page.tsx             # Modal de compra exitosa
├── inicio/
│   └── page.tsx                   # Dashboard privado (en progreso)
├── admin/
│   ├── page.tsx                   # Panel de administración
│   ├── [idUnico]/page.tsx         # Panel por edificio
│   ├── panel/                     # Subpaneles
│   ├── invitaciones/              # Invitaciones
│   ├── dashboard/                 # Dashboard admin
│   ├── ayuda/                     # Ayuda admin
│   └── wizard-estructura/         # Wizard estructura admin
├── login/
│   └── page.tsx                   # Login (en progreso)
├── components/
│   ├── WizardOnboarding.tsx       # Wizard de configuración
│   ├── WizardCompra.tsx           # Wizard de compra
│   ├── ConfigTimbres.tsx          # Grilla y modal de timbres
│   ├── SolicitudTimbreModal.tsx   # Modal de solicitud de timbre
│   ├── TimbreHeader.tsx           # Header de contadores
│   ├── CInfo.tsx                  # Mensajes informativos
│   ├── QRingContainer.tsx         # Contenedor central QR
│   ├── NavBar.tsx                 # Barra de navegación
│   ├── CardContainer.tsx          # Contenedor de tarjetas
│   ├── Header.tsx / Footer.tsx    # Encabezado y pie
│   └── ...                        # Otros componentes auxiliares
```

### Archivos/componentes en uso
- Todos los listados arriba, más los subcomponentes de cada wizard y panel.
- Los endpoints de `/api/` para tienda, acceso, admin, etc.

### Archivos/componentes posiblemente en desuso o a revisar
- `page.bak.tsx` (en varias carpetas): backups antiguos, pueden eliminarse si no se usan.
- `config-timbres-mockup.tsx`: mockup de pruebas, eliminar si no se usa en producción.
- `wizard-estructura.tsx` y subcarpetas: revisar si se usan en el flujo real.
- Componentes de pruebas o duplicados en `/components/` (ej: PanelAcceso, ConfiguradorEdificio, GrillaEditableEstructura, AdminPageHandler, etc).
- Archivos en `/web/public/` y `/web/styles/` que no estén referenciados.
- Cualquier archivo en `/tienda/utils/`, `/tienda/api/` vacío o sin uso.
- Ejecutables como `ngrok.exe` (solo si no se usa en desarrollo).

---

## 🔄 Flujo de Datos y Persistencia

- Todos los datos del wizard y la compra se guardan en localStorage bajo la clave `wizardData` (próximamente se reforzará para guardar en cada paso).
- Al finalizar el wizard, se redirige a la página de Inicio y se muestran los datos reales configurados.
- El panel de administración y los roles controlan el acceso a la información sensible.

---

## 🛠️ Problemas Técnicos y Mejoras Pendientes

- **Prisma:** Resolver errores de acceso y generación en Windows (o migrar a Docker/WSL).
- **Mercado Pago:** Integrar el flujo real de pago y validación.
- **Persistencia local en wizard:** Guardar datos en cada paso, no solo al final.
- **Testing:** Probar todos los flujos con datos reales y edge cases.
- **Publicación:** Subir la web, publicar en redes y preparar el material de venta.
- **Limpieza:** Eliminar archivos/componentes en desuso listados arriba.

---

*Última actualización: 22/06/2025 - Planificación, mejoras UI/UX y estructura para cierre y limpieza del proyecto.*
=======
## ¿Para qué sirve cada carpeta/archivo?

- **acceso/**  
  Página pública a la que accede un visitante al escanear el QR.  
  Muestra los timbres configurados y permite contactar a los usuarios (WhatsApp, llamada, video).

- **admin/**  
  Panel de administración para el usuario dueño de la dirección.  
  Permite gestionar usuarios, timbres, teléfonos, invitaciones, etc.

- **api/**  
  Endpoints de la API (por ejemplo, para obtener datos de la dirección, usuarios, etc).

- **tienda/**  
  (Futuro) Sección para la tienda online de productos domóticos, automatización, cámaras, etc.

- **web/**  
  (Futuro) Otras páginas públicas, landings, o secciones informativas.

- **public/**  
  Imágenes, logos y archivos estáticos accesibles desde la web (por ejemplo, el logo QRing, imágenes de ayuda, etc).

- **globals.css**  
  Estilos globales para toda la web.

- **layout.tsx**  
  Layout general de la app: define el header, footer y la estructura base de todas las páginas.

- **page.module.css**  
  Estilos específicos para la página principal.

- **ui/**  
  Componentes de interfaz reutilizables (botones, cards, modales, etc).

- **utils/**  
  Funciones utilitarias compartidas entre web y mobile.

- **schema.prisma**  
  Modelo de datos de la base (Dirección, Timbre, Usuario, Teléfono, etc).

- **seed.ts**  
  Script para poblar la base con datos de ejemplo/demo.

- **migrations/**  
  Historial de migraciones de la base de datos.

---

## Herramientas de control y administración

- **Prisma Studio**  
  Interfaz visual para ver y editar los datos de la base.  
  Se abre con:  
  ```
npx prisma studio
```

- **TurboRepo**  
  Permite correr varios proyectos (web, mobile, etc) juntos y compartir código fácilmente.

- **Next.js Dev Server**  
  Para levantar la web en modo desarrollo:  
  ```
  cd apps/web
  npm run dev
  ```

- **Seed de datos**  
  Para poblar la base con datos de ejemplo:  
  ```
  npx prisma db seed
```

---

## Glosario básico

- **Monorepo:** Un solo repositorio que contiene varios proyectos (web, mobile, librerías compartidas).
- **ORM:** Herramienta que traduce entre la base de datos y el código (en este caso, Prisma).
- **Endpoint:** Ruta de la API que devuelve o recibe datos.
- **CRUD:** Crear, Leer, Actualizar, Borrar (operaciones básicas de datos).

---

## Ejemplo de flujo de uso

1. El visitante escanea el QR de la dirección.
2. Accede a la página pública y elige el timbre (piso/dpto).
3. Puede contactar al usuario por WhatsApp, llamada o videollamada.
4. El administrador puede gestionar usuarios, timbres y teléfonos desde el panel admin.

---

## Tips y buenas prácticas

- Mantené la estructura de carpetas clara y ordenada.
- Usá componentes reutilizables para evitar repetir código.
- Documentá cada función o componente importante.
- Usá el seed para poblar la base y probar el flujo real.
- Consultá el glosario y este README cuando tengas dudas.

---

## ¿Cómo empiezo?

1. Instalá las dependencias:
   ```
   npm install
   ```
2. Corré las migraciones y el seed:
   ```
   npx prisma migrate dev --name init
   npx prisma db seed
   ```
3. Levantá la web:
   ```
   cd apps/web
   npm run dev
   ```
4. Abrí en el navegador:
   ```
   http://localhost:3000/acceso/qr_demo123
   ```

---

## ¿Dónde pido ayuda?
- Consultá este README y el glosario.
- Buscá ejemplos en los archivos de código.
- Si algo no funciona, revisá la consola y los logs.
- ¡No dudes en preguntar o buscar ayuda online!

---

¡Gracias por confiar en QRing Pro y por apostar a aprender y crecer con tu proyecto!

# Base de Conocimiento y Aprendizaje QRing Pro

## Definiciones Clave
- **Monorepo:** Un solo repositorio que contiene varias aplicaciones y/o paquetes relacionados, facilitando la gestión y el versionado conjunto.
- **Ruta dinámica ([param]):** En Next.js, una carpeta entre corchetes (por ejemplo, [idUnico]) define una URL dinámica, permitiendo que la página reciba parámetros variables desde la URL.
- **IDUNICO:** Identificador único generado para cada dirección/compra, usado para asociar timbres, usuarios y generar el QR.
- **Timbre:** Unidad configurable asociada a una dirección, puede tener piso, dpto, teléfonos y modos de contacto.
- **CInfo:** Componente visual de ayuda contextual, con fondo celeste y lamparita, usado solo en Comunidad/Admin.

## Herramientas y Tecnologías
- **Next.js:** Framework de React para aplicaciones web modernas, soporta rutas dinámicas, SSR y SSG.
- **React:** Librería principal para construir interfaces de usuario.
- **Prisma:** ORM para gestionar la base de datos de forma tipada y sencilla.
- **SQLite:** Base de datos ligera, ideal para desarrollo local. Para producción se recomienda PostgreSQL o MySQL.
- **Vercel:** Plataforma de despliegue serverless, ideal para Next.js.
- **TurboRepo:** Herramienta para gestionar monorepos y acelerar builds.
- **react-icons:** Librería de íconos para React.
- **qrcode.react:** Componente para generar códigos QR en React.

## Componentes Clave
- **CardContainer:** Contenedor central con bordes grises, sombra y fondo blanco, usado en todas las vistas principales.
- **Tabs pill:** Botones de navegación (Piso/Dpto) con formato redondeado y visual moderno.
- **Footer/NavBar:** Barra de navegación inferior con iconos de Inicio, Invitaciones, Ayuda y Configuración.
- **CInfo:** Ayuda contextual, solo visible en Comunidad/Admin.

## Flujo de Usuario
1. **Compra y generación de QR:** El cliente compra un QRing, se genera un IDUNICO y un QR con la URL pública.
2. **Configuración de timbres:** El admin configura los timbres y puede invitar usuarios.
3. **Acceso público:** El visitante escanea el QR y accede a la web pública para tocar timbre.
4. **Comunidad/Admin:** El admin puede ver el QR, gestionar timbres y ver ayuda contextual.

## Buenas Prácticas
- Mantener el README y README_COMPLETO.md actualizados con cada avance importante.
- Documentar decisiones de arquitectura y flujos en el .md para facilitar el aprendizaje y la colaboración.
- Usar commits claros y frecuentes para respaldar el trabajo.

---

¡Sigue aprendiendo y mejorando QRing Pro! Si tienes dudas, consulta este archivo o pregunta a la comunidad (¡o a tu primo GPT!). 
>>>>>>> b601f9ffd0ea8c42c32e4f3c6ec4e54597eef1aa

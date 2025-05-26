# QRing Pro

QRing Pro es una plataforma para el control de accesos y la gestión de visitantes en edificios, barrios y oficinas. Permite administrar timbres inteligentes, usuarios y accesos desde una app móvil y una web, facilitando la comunicación y la seguridad.

---

## 🚀 Tecnologías principales
- **Next.js** (web)
- **React** (interfaces)
- **TypeScript** (tipado seguro)
- **Prisma** (base de datos)
- **SQLite** (desarrollo local)
- **TurboRepo** (monorepo)

---

## 📁 Estructura básica

```
apps/
  web/
    app/
      acceso/   # Página pública por QR
      admin/    # Panel de administración
      api/      # Endpoints API
      tienda/   # (Futuro) Tienda online
      web/      # (Futuro) Landings
    public/     # Imágenes y assets
    globals.css # Estilos globales
    layout.tsx  # Layout general
packages/
  ui/           # Componentes reutilizables
  utils/        # Funciones utilitarias
prisma/
  schema.prisma # Modelo de datos
  seed.ts       # Seed de ejemplo
  migrations/   # Migraciones DB
```

---

## 🛠️ ¿Cómo lo pruebo?

1. Instalá dependencias:
   ```
   npm install
   ```
2. Migrá y seed:
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

## 📖 Glosario rápido
- **Monorepo:** Un solo repo con varios proyectos (web, mobile, librerías)
- **ORM:** Traduce entre base de datos y código (Prisma)
- **Endpoint:** Ruta de la API que devuelve/recibe datos
- **CRUD:** Crear, Leer, Actualizar, Borrar datos

---

Para más detalles, mirá el archivo `README_COMPLETO.md`.
 
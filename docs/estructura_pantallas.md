# Estructura de Pantallas y Componentes QRing Pro (Checklist de Limpieza)

## 1. Página Pública de Acceso
- **Ruta:** `/acceso/[idUnico]/page.tsx`
- **Componentes:**
  - `QRCodeDisplay`
  - Botones de acción (Tienda, Usuarios)
  - CInfo inferior

## 2. Tienda
- **Ruta:** `/tienda/page.tsx`
- **Componentes:**
  - Header
  - Icono edificio
  - Stepper de cantidad
  - CInfo
  - Botones Cancelar/Agregar al Carrito

## 3. Carrito
- **Ruta:** `/tienda/page.tsx` (mismo archivo, estado interno)
- **Componentes:**
  - Icono carrito
  - Resumen de compra
  - Inputs de datos de contacto
  - Botones Volver/Simular Pago

## 4. Modal de Compra Exitosa
- **Componente interno en `/tienda/page.tsx`**
- **Componentes:**
  - Título, icono de éxito
  - Datos importantes
  - Botones Cerrar/Ir a la Configuración
  - CInfo

## 5. Wizard de Configuración
- **Componente:** `WizardOnboarding.tsx`
- **Subcomponentes:**
  - Paso 1: Dirección y estructura (inputs, stepper)
  - Paso 2: Grilla de timbres (`ConfigTimbres.tsx`)
  - Paso 3: Finalizar
  - CInfo y modales de ayuda

## 6. Página de Inicio (Dashboard privado)
- **Ruta:** `/inicio/page.tsx` (a crear o revisar)
- **Componentes:**
  - Resumen de dirección y timbres configurados
  - Accesos rápidos
  - CInfo

## 7. Panel de Administración
- **Ruta:** `/admin/[idUnico]/page.tsx`
- **Componentes:**
  - Listado de comunidades/edificios
  - Gestión de roles y usuarios
  - Estadísticas

---

### 🔥 Limpieza futura
- Eliminar componentes, páginas y archivos que no estén en esta estructura.
- Mantener solo lo necesario para el flujo real y los paneles de administración. 
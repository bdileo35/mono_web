# Contexto y avances del Wizard QRing

## Resumen del flujo
El wizard de onboarding/admin de QRing guía al usuario (admin) en 4 pasos principales:

1. **Dirección y estructura**: Formulario para ingresar la dirección y definir la estructura básica del edificio (pisos, departamentos, PB).
2. **Edición visual**: Grilla editable para ajustar la estructura generada (nombres, cantidad de dptos por piso, etc.).
3. **Configuración de timbres**: Selector visual tipo portero eléctrico para asignar y configurar timbres a cada dpto.
4. **Invitaciones**: Panel para gestionar invitaciones a usuarios/departamentos.

---

## Cambios y mejoras aplicadas

### Paso 1 (Dirección y estructura)
- Eliminado el espacio superior entre el CardContainer y el header.
- Eliminado el texto redundante "Paso 1 de 4" de la parte superior (ahora solo está en el botón).
- Compactados y optimizados los espacios internos y márgenes.
- Unificadas y oscurecidas todas las fuentes grises para mejor legibilidad (#222, #444).
- "Número" y "Torre" ahora están en la misma línea.
- El input de PB aparece solo si está tildado el check, con aclaración de cantidad de departamentos.
- Se muestra una vista previa de la estructura generada, ordenando los pisos de mayor a menor y PB al final.
- El usuario puede definir la cantidad de departamentos en PB.
- El botón "Guardar y continuar" genera el array de pisos y dptos correctamente para el paso siguiente.

### Paso 2 (Edición visual)
- Recibe la estructura como array y permite editar la grilla de pisos y departamentos.
- (Pendiente) Mejoras visuales para que se parezca más a un portero real.

### Paso 3 (Configuración de timbres)
- (Pendiente) Rediseño visual tipo portero eléctrico real, con disposición de pisos y dptos.
- (Pendiente) Modal para configurar cada timbre.

### Paso 4 (Invitaciones)
- Panel simple para agregar y mostrar invitaciones.

### General
- Eliminada la redundancia de "del edificio" en los títulos.
- Eliminada la duplicidad de "paso x de 4" (solo en el botón del paso 1).
- Mejorada la legibilidad y la compacidad general de la UI.

---

## Pendientes principales
- Rediseño visual de la grilla de timbres (paso 3) para que se parezca a un portero eléctrico real (pisos de abajo hacia arriba, PB abajo, botones claros, etc.).
- Agregar mensajes de ayuda (tipo CInfo) en cada paso del wizard.
- Mejorar la edición avanzada de la estructura en el paso 2 (agregar/quitar/renombrar dptos y pisos de forma visual).
- Mejorar la experiencia mobile (responsive, paddings, etc.).
- Revisión final de textos, UX y validaciones.

---

**Última actualización:** [fecha y hora del commit/cambio] 
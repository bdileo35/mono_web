// Script para forzar el wizard al Paso 3 y redirigir a inicio
// Ejecutar en la consola del navegador

console.log('🔄 Forzando wizard al Paso 3...');

// 1. Cargar datos actuales
const datosGuardados = localStorage.getItem('wizardData');
if (datosGuardados) {
  const data = JSON.parse(datosGuardados);
  console.log('✅ Datos actuales:', data);
  
  // 2. Actualizar al Paso 3
  const datosActualizados = {
    ...data,
    paso: 3
  };
  
  // 3. Guardar en localStorage
  localStorage.setItem('wizardData', JSON.stringify(datosActualizados));
  console.log('✅ Datos actualizados al Paso 3:', datosActualizados);
  
  // 4. Redirigir a inicio
  console.log('🔄 Redirigiendo a /inicio...');
  window.location.href = '/inicio';
  
} else {
  console.error('❌ No hay datos guardados en localStorage');
}

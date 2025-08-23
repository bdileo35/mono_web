// Script para ejecutar en la consola del navegador
console.log('🧹 Limpiando localStorage...');

// Limpiar todos los datos del wizard
localStorage.removeItem('wizardData');
localStorage.removeItem('ventaIdUnico');
localStorage.removeItem('showSolicitudModal');

// Limpiar cualquier otro dato relacionado
const keysToRemove = [];
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key && (key.includes('wizard') || key.includes('venta') || key.includes('timbre'))) {
    keysToRemove.push(key);
  }
}

keysToRemove.forEach(key => {
  localStorage.removeItem(key);
  console.log(`🗑️ Eliminado: ${key}`);
});

console.log('✅ localStorage limpiado exitosamente!');
console.log('🔄 Recarga la página para ver los cambios');



const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function limpiarBaseDeDatos() {
  try {
    console.log('🧹 Iniciando limpieza de base de datos...');
    
    // 1. Eliminar todos los timbres
    console.log('🗑️ Eliminando timbres...');
    const timbresEliminados = await prisma.timbre.deleteMany({});
    console.log(`✅ ${timbresEliminados.count} timbres eliminados`);
    
    // 2. Eliminar toda la estructura
    console.log('🗑️ Eliminando estructura...');
    const estructuraEliminada = await prisma.estructura.deleteMany({});
    console.log(`✅ ${estructuraEliminada.count} registros de estructura eliminados`);
    
    // 3. Eliminar todas las ventas
    console.log('🗑️ Eliminando ventas...');
    const ventasEliminadas = await prisma.venta.deleteMany({});
    console.log(`✅ ${ventasEliminadas.count} ventas eliminadas`);
    
    // 4. Eliminar todas las direcciones
    console.log('🗑️ Eliminando direcciones...');
    const direccionesEliminadas = await prisma.direccion.deleteMany({});
    console.log(`✅ ${direccionesEliminadas.count} direcciones eliminadas`);
    
    console.log('🎉 ¡Base de datos limpiada exitosamente!');
    console.log('📊 Estado final:');
    console.log('   - Timbres: 0');
    console.log('   - Estructura: 0');
    console.log('   - Ventas: 0');
    console.log('   - Direcciones: 0');
    
  } catch (error) {
    console.error('❌ Error durante la limpieza:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar limpieza
limpiarBaseDeDatos();
